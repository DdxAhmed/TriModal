# ⚡ TriModal Edge Predictive Maintenance Suite

An advanced, bare-metal multi-physics anomaly detection and prognostics system running locally on low-cost **ESP32** microcontrollers. This repository hosts the interactive technical documentation, blog, and system-level visualizer for the TriModal project.

---

## 🛠️ System Architecture

The TriModal system bypasses expensive industrial PC installations by implementing a high-performance **multi-physics sensor fusion** pipeline directly on the edge:

1. **Kinetic & Mechanical (MPU6050 Accelerometer):** Monitors radial/axial mechanical vibrations to capture rotor imbalances or shaft misalignments.
2. **Acoustic & Ultrasonic (INMP441 MEMS Microphone):** Listens to high-frequency structural clicks emitted during early bearing degradation or dry lubrication.
3. **Stray Electromagnetic Flux (A3144 Hall Effect Array):** Captures stator winding micro-shorts and magnetic reluctance changes non-invasively through the motor casing.

---

## 🧠 Edge AI & Multitasking Design

* **Streaming Incremental K-Means:** Processes high-frequency signals locally inside active SRAM with an $O(1)$ memory footprint, eliminating the latency and bandwidth requirements of cloud processing.
* **FreeRTOS Dual-Core Scheduling:**
  * **Core 0 (Safety-Critical):** Dedicated to high-speed sampling, Fast Fourier Transforms (FFT), and local TinyML inference with an interrupt trip latency under 5 milliseconds.
  * **Core 1 (Communication):** Manages WebSockets, streams real-time telemetry, and runs the local dashboard server without blocking Core 0 operations.

---

## 💻 Tech Stack & Web Interface

The web interface is built to serve as a high-fidelity technical blog and dashboard explaining the project details in-depth:

* **Framework:** React + Vite + TypeScript
* **Styling:** Tailwind CSS (Modern dark-mode matrix theme)
* **Routing:** Wouter (Client-side route redirection ready for Cloudflare Pages)
* **Data Visualization:** Recharts (Interactive degradation timeline charts)
* **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DdxAhmed/TriModal.git
   cd TriModal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production (compiled output is placed in `dist/`):
   ```bash
   npm run build
   ```

---

## 🌐 Deployment on Cloudflare Pages

This project is configured out-of-the-box for deployment on **Cloudflare Pages**:
* A pre-configured `public/_redirects` file is included to handle client-side routing fallbacks correctly (`/* /index.html 200`).
* Set the build command to `npm run build` and the output directory to `dist` in the Cloudflare dashboard.
