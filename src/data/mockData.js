export const initialZones = [
  {
    id: 'zone-1',
    number: 1,
    name: 'Zone 1 — Field A',
    shortName: 'Field A',
    crop: 'Tomato Bed',
    icon: 'water_drop',
    isManualOn: false,
    manualStartedAt: null, // timestamp
    moisture: 31,
    threshold: 35,
    autoIrrigating: true,
    autoReason: 'Soil moisture is below the preferred level.',
    autoRunTimeMinutes: 12,
  },
  {
    id: 'zone-2',
    number: 2,
    name: 'Zone 2 — Field B',
    shortName: 'Field B',
    crop: 'Chilli Plot',
    icon: 'water_drop',
    isManualOn: false,
    manualStartedAt: null,
    moisture: 42,
    threshold: 35,
    autoIrrigating: false,
    autoReason: 'Optimal moisture balance maintained.',
    autoRunTimeMinutes: 0,
  },
  {
    id: 'zone-3',
    number: 3,
    name: 'Zone 3 — Greenhouse',
    shortName: 'Greenhouse',
    crop: 'Bell Peppers',
    icon: 'water_drop',
    isManualOn: false,
    manualStartedAt: null,
    moisture: 28,
    threshold: 35,
    autoIrrigating: true,
    autoReason: 'Soil moisture is low.',
    autoRunTimeMinutes: 8,
  },
  {
    id: 'zone-4',
    number: 4,
    name: 'Zone 4 — Nursery',
    shortName: 'Nursery',
    crop: 'Seedling Trays',
    icon: 'water_drop',
    isManualOn: false,
    manualStartedAt: null,
    moisture: 56,
    threshold: 40,
    autoIrrigating: false,
    autoReason: 'Target nursery saturation reached.',
    autoRunTimeMinutes: 0,
  }
];

export const initialFieldConditions = {
  soilMoisture: 31,
  temperature: 31,
  humidity: 68,
  waterFlow: 12.4,
  waterStorage: 72,
  sensorSignal: 98,
  canopyTemp: 31,
  bioVigor: 94
};

export const initialAlerts = [
  {
    id: 'alert-1',
    category: 'critical',
    title: 'Zone B (Tomato Bed)',
    description: 'Soil moisture dropped below 35% threshold.',
    time: '5m ago',
    icon: 'water_drop',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    resolved: false
  },
  {
    id: 'alert-2',
    category: 'warning',
    title: 'Heatwave Notice',
    description: 'Expected 38°C at 2:00 PM; schedule evening irrigation.',
    time: '25m ago',
    icon: 'wb_sunny',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    resolved: false
  },
  {
    id: 'alert-3',
    category: 'notice',
    title: 'Sensor #04 (North Plot)',
    description: 'Battery level at 15%; replace within 3 days.',
    time: '1h ago',
    icon: 'battery_alert',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100',
    resolved: false
  }
];

export const farmerProfile = {
  name: 'Ravi Kumar',
  role: 'Verified Progressive Farmer',
  kisanId: 'KS-8842',
  location: 'Gudlavalleru, Krishna District, Andhra Pradesh',
  phone: '+91 98480 23145',
  email: 'ravi.kumar.farm@gmail.com',
  languages: ['English', 'Telugu', 'Hindi'],
  activeLanguage: 'English',
  farmName: 'Green Valley Farm',
  farmPlot: 'Plot 01 • Gudlavalleru Central',
  totalArea: '2.5 Acres',
  soilType: 'Loamy Sand',
  currentCrop: 'Tomato (Vegetative Stage Day 42)',
  verifiedDate: 'Active Cycle 2025-26',
  avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1W7TFn_OmnHuAktV3x-Y3yg7AX4iW83vL5aKjTwW8RwruDOCWERWPhevHq4MQflfAcLwC5bNc9QKQWrzP8cCrIyB4C7RncGtUDQH6iru0YWaBAwbp3CuMOx_sPjVohiup94zj7Mz99m90azw18xin_G9s2SP9Lz-YoManbt5UdzQSU_phlqprILq0p0_M8ITFkQ8yj88GZSr18j99ROlTTy6H7ViGk9x_zkGjHuPSvTEClYraSna87DkP01'
};
