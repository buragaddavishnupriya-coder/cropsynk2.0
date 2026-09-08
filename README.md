# CropSync 2.0 — Precision Bio-IoT Farm Platform

CropSync 2.0 is an intelligent, responsive precision agriculture platform bridging in-field IoT hardware, sensor telemetry, autonomous valve regulation, and AI crop disease diagnostics.

![CropSync 2.0](https://lh3.googleusercontent.com/aida-public/AB6AXuCp_ePU1sOhitL7dw5dOPL5pm9Sst4GKdHobpHUXSX1TZw7IrflasxaUGOky128u838va3mT9TWL-X28l3oAMXvH1sJFSbUwbLwxulZ21RQnAAVuPnOREVKeiUY-GGDWfIVmkxXiaFnlgRiRZYbJokOAtCc5-Rc98ZwRHtehL5W9uM60I7OXqPrplDCi7ySLCFpaSUCv6R65ecJlRa3ZjLX5Jc8DhCtgwtb2mkMglCXPMWvfbMO6IUWNA)

---

## 🌾 Features & Architecture

### 1. 💧 Intelligent Irrigation Control (3 Modes)
- **Manual Control (Direct Override):**
  - Live override cards for **Zone 1 (Field A)**, **Zone 2 (Field B)**, **Zone 3 (Greenhouse)**, and **Zone 4 (Nursery)**.
  - Tactile switches with `🟢 Running` status indicators, live duration counters, and toast notifications.
  - Isolated **NPK Solution Valve** (`🧪`) with proportional bio-fertigation injection control.
- **Timer Control (Schedule Duration):**
  - Multi-select zone checkboxes.
  - Large circular visual timer interface with digital readout, Hours/Minutes/Seconds steppers, and quick presets (`10m`, `20m`, `30m`, `1h`).
  - Animated circular SVG countdown ring with `Pause / Resume` and `Stop Timer` controls.
- **Automated Control (Autonomous Telemetry):**
  - Live monitoring status (`🟢 Automation Active`, active valve count).
  - Shows only currently active valves (Zone 1 & Zone 3) with real-time moisture vs. target threshold comparisons and autonomous reasoning.
  - Collapsible inactive zones list.
  - **Decision Card (`🧠 Why is CropSync irrigating?`):** Translates AI decisions into clear, farmer-friendly explanations.
  - 4 telemetry cards: Soil Moisture (31%), Canopy Temp (31°C), Humidity (68%), Water Flow (12.4 L/min).
  - Interactive simulation triggers for demo evaluation.
- **🚨 Emergency Master Shutoff:** Prominent `"STOP ALL IRRIGATION"` button that instantly halts all manifolds and injectors.

### 2. 🧠 AI Crop Advisor
- In-field leaf photography scanner with neural target bounding overlay.
- Real-time diagnostic sheet identifying **Tomato Early Blight (*Alternaria solani*)** at 94% confidence.
- Multi-tier recommendations: Bio-fungicides, chemical controls, and irrigation adjustments.

### 3. 🔔 Real-time Field Alerts
- Critical moisture drop warnings, climate/heatwave notices, and hardware battery alerts.
- One-click actions: *"Trigger Drip Cycle"*, *"Snooze"*, and *"Acknowledge"*.

### 4. 🚜 Farm Overview & Cadastre
- Landholding specs (2.5 Acres, Loamy Sand soil horizon, Vegetative Stage Day 42).
- 2x2 vital sensor grid (Moisture, Temp, Water Storage, Active Drips).
- Interactive *"Log Morning Field Walk"* modal saving observations to cloud.

### 5. 👤 Farmer Profile
- Progressive Farmer identity (*Ravi Kumar*, Kisan ID `#KS-8842`).
- One-click phone copy, bilingual Telugu/English interface toggle, and landholding summary.

---

## 📱 Responsive Design
- **Mobile (< 768px):** Mobile-first farming application with top blue rounded header, large touch-friendly controls, and bottom navigation dock.
- **Tablet & Desktop (≥ 768px):** Full-viewport web dashboard featuring a 240px left navigation sidebar, multi-column grids, and expanded telemetry cards.

---

## 🛠️ Quick Start

```bash
# Clone repository
git clone https://github.com/buragaddavishnupriya-coder/cropsynk2.0.git
cd cropsynk2.0

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## ⚙️ Technology Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Tactile Agritech design system)
- **Typography:** Space Grotesk, Plus Jakarta Sans, JetBrains Mono
- **Icons:** Google Material Symbols Outlined
