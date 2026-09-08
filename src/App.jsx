import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import HomeScreen from './screens/HomeScreen';
import IrrigationScreen from './screens/IrrigationScreen';
import AdvisoryScreen from './screens/AdvisoryScreen';
import AlertsScreen from './screens/AlertsScreen';
import FarmOverviewScreen from './screens/FarmOverviewScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { initialZones, initialFieldConditions, initialAlerts, farmerProfile } from './data/mockData';

export default function App() {
  // Navigation & Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('irrigation'); // Start on irrigation

  // Zones state
  const [zones, setZones] = useState(initialZones);
  const [npkActive, setNpkActive] = useState(false);

  // Field Conditions & Alerts
  const [fieldConditions, setFieldConditions] = useState(initialFieldConditions);
  const [alerts, setAlerts] = useState(initialAlerts);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Live timer tick for active manual valves (calculates running duration string)
  useEffect(() => {
    const timer = setInterval(() => {
      setZones(prevZones => prevZones.map(zone => {
        if (zone.isManualOn && zone.manualStartedAt) {
          const elapsedSec = Math.floor((Date.now() - zone.manualStartedAt) / 1000);
          let text = '';
          if (elapsedSec < 60) {
            text = `${elapsedSec}s ago`;
          } else {
            const mins = Math.floor(elapsedSec / 60);
            text = `${mins} min ago`;
          }
          return { ...zone, runningDurationText: text };
        }
        return zone;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // MANUAL VALVE TOGGLE HANDLER (Simulates hardware response)
  const handleToggleZone = (zoneId) => {
    setZones(prevZones => prevZones.map(zone => {
      if (zone.id === zoneId) {
        const nextState = !zone.isManualOn;
        if (nextState) {
          showToast(`${zone.name} irrigation started`, 'success');
          return {
            ...zone,
            isManualOn: true,
            manualStartedAt: Date.now(),
            runningDurationText: 'just now'
          };
        } else {
          showToast(`${zone.name} irrigation stopped`, 'warning');
          return {
            ...zone,
            isManualOn: false,
            manualStartedAt: null,
            runningDurationText: null
          };
        }
      }
      return zone;
    }));
  };

  // NPK FERTIGATION TOGGLE
  const handleToggleNpk = () => {
    const nextState = !npkActive;
    setNpkActive(nextState);
    if (nextState) {
      showToast('NPK Solution injection started (Ratio 19:19:19)', 'success');
    } else {
      showToast('NPK Solution injection stopped', 'warning');
    }
  };

  // EMERGENCY MASTER SHUTOFF
  const handleEmergencyStop = () => {
    setZones(prev => prev.map(z => ({
      ...z,
      isManualOn: false,
      manualStartedAt: null,
      runningDurationText: null
    })));
    setNpkActive(false);
    showToast('EMERGENCY SHUTOFF: All irrigation manifolds and NPK injectors closed!', 'error');
  };

  // RESOLVE ALERT
  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  };

  const unreadAlertCount = alerts.filter(a => !a.resolved).length;

  // Render Login Screen if user logged out
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <LoginScreen 
          onLogin={() => {
            setIsLoggedIn(true);
            setCurrentScreen('home');
          }} 
          onShowToast={showToast} 
        />
      </div>
    );
  }

  // Active Screen Content Renderer
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={setCurrentScreen}
            zones={zones}
            fieldConditions={fieldConditions}
            onShowToast={showToast}
            unreadAlertCount={unreadAlertCount}
          />
        );
      case 'irrigation':
        return (
          <IrrigationScreen 
            zones={zones}
            onToggleZone={handleToggleZone}
            npkActive={npkActive}
            onToggleNpk={handleToggleNpk}
            onEmergencyStop={handleEmergencyStop}
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
            fieldConditions={fieldConditions}
          />
        );
      case 'advisory-ai':
        return (
          <AdvisoryScreen 
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'alerts':
        return (
          <AlertsScreen 
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        );
      case 'farm-overview':
        return (
          <FarmOverviewScreen 
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            profile={farmerProfile}
            onLogout={() => {
              setIsLoggedIn(false);
              showToast('Logged out of Kisan Account', 'warning');
            }}
            onShowToast={showToast}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Universal Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Full-Width Top Header */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        unreadAlertCount={unreadAlertCount}
        farmerAvatar={farmerProfile.avatarUrl}
        farmerName={farmerProfile.name}
        kisanId={farmerProfile.kisanId}
      />

      {/* Main Body: Left Sidebar on Tablet/Desktop (>= md), Content Area on Right */}
      <div className="flex-1 flex flex-row w-full">
        {/* Left Sidebar (Visible on md+, hidden on mobile) */}
        <div className="hidden md:block">
          <Sidebar 
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            unreadAlerts={unreadAlertCount}
          />
        </div>

        {/* Main Content Area: Responsive container taking available width */}
        <main className="flex-1 min-w-0 bg-[#F4F6F9] p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Bottom Navigation Dock on Mobile Screens (< md) */}
      <div className="md:hidden">
        <BottomNav 
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          unreadAlerts={unreadAlertCount}
        />
      </div>
    </div>
  );
}
