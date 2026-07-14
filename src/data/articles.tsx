import { ReactNode } from 'react';
import { Cpu, Zap, Signal, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  coverImage?: string;
  content: ReactNode;
}

export const articles: ArticleData[] = [
  {
    id: 'edge-prognostics-main',
    title: 'Silent Guardians of the Factory: How Edge Computing and AI are Revolutionizing Predictive Maintenance',
    excerpt: 'An in-depth technical study on transitioning from traditional reactive protection systems to predicting electric motor faults days before they happen, using multi-physics sensor fusion on low-cost microcontrollers.',
    date: 'July 10, 2026',
    readTime: '12 min read',
    category: 'RESEARCH PAPER',
    author: 'Technical Development Team',
    content: (
      <div className="space-y-8 font-sans leading-relaxed text-muted-foreground">
        <p className="text-xl text-foreground/90 font-sans leading-relaxed border-l-4 pl-4 border-primary/70">
          In the era of Industry 4.0, the efficiency of production lines is no longer measured solely by how fast machines run, but by our ability to keep them running without unplanned downtime. This research aims to unpack the mechanics of predictive maintenance and present technical implementations running locally on embedded hardware.
        </p>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">1️⃣ The Economic Problem: Billions Burned in Unplanned Downtimes</h3>
          <p className="mb-4">
            Electric motors are the backbone of modern manufacturing. Pumps, fans, conveyors, and compressors all rely on motors to keep production running. According to market research, unplanned downtime costs major manufacturers millions of dollars per hour.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">US ANNUAL LOSS</span>
                <span className="text-4xl font-bold text-destructive font-mono glow-text-destructive">$50B+</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  Annual losses due to unplanned manufacturing downtime in the US (Aberdeen Research).
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">GLOBAL DOWNTIME COST</span>
                <span className="text-4xl font-bold text-destructive font-mono glow-text-destructive">$1.5T</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  Annual cost of downtime for the global Fortune 500 companies (Siemens).
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">REVENUE DEDUCTION</span>
                <span className="text-4xl font-bold text-destructive font-mono glow-text-destructive">11%</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  Average percentage of total revenue lost by major companies due to unplanned downtime.
                </p>
              </CardContent>
            </Card>
          </div>
          <p>
            These losses occur because traditional protective systems (like fuses, circuit breakers, and overload relays) are designed to protect electrical cables, not the machines themselves, from mechanical degradation.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">2️⃣ The Blindspots of Traditional Protection: Why Fuses and Relays Fail</h3>
          <p className="mb-4">
            Traditional protection devices respond late to thermal changes or severe current spikes. When a motor operates with damaged bearings, internal friction rises gradually, destroying the winding insulation long before the electric current peaks enough to trigger the circuit breaker.
          </p>
          <div className="bg-destructive/5 border border-destructive/30 p-6 my-6 rounded-lg flex gap-4 items-start">
            <AlertTriangle className="text-destructive w-6 h-6 shrink-0 mt-1" />
            <div>
              <h4 className="text-destructive font-bold mb-2">The Limits of Joule Heating Formulas</h4>
              <p className="text-sm leading-relaxed">
                Traditional thermal relays base their calculation on the current-squared relation: <code dir="ltr" className="font-mono bg-destructive/10 px-1 py-0.5 rounded text-foreground">P = I²R</code>. Since mechanical degradation takes weeks to raise current draw by a noticeable margin, traditional relays trip only AFTER physical damage has already occurred.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">3️⃣ The Brain: ESP32 Dual-Core Architecture</h3>
          <p className="mb-4">
            To bypass the high installation costs of typical predictive maintenance platforms (which require expensive industrial PCs), we utilize the low-cost, high-performance ESP32 microcontroller.
          </p>
          <p className="mb-4">
            Running the Xtensa LX6 dual-core processor at 240MHz with FreeRTOS, we distribute the workload as follows:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="border border-border/40 bg-black/40 p-6 rounded-lg">
              <Cpu className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Core 0: Real-Time Processing & Safety</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated to collecting high-frequency sensor samples, computing Fast Fourier Transforms (FFT), and running the TinyML K-Means inference. Hardware ISR interrupts guarantee a trip command latency under 5 milliseconds.
              </p>
            </div>
            <div className="border border-border/40 bg-black/40 p-6 rounded-lg">
              <Zap className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Core 1: Wireless Streaming & Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Manages WebSockets and streams telemetry data to cloud dashboards and HMI apps, ensuring network congestion never slows down safety-critical processing.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">4️⃣ Conclusion & Return on Investment</h3>
          <p>
            By deploying multi-physics sensor fusion and Edge AI algorithms directly on-device, factories can save thousands in unplanned repair costs. This prototype proves that cost-effective open-source hardware can match the performance of expensive, proprietary industrial systems.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'hardware-schematics',
    title: 'Hardware Wiring Guide: Integrating MPU6050, INMP441, and A3144 with ESP32',
    excerpt: 'A practical guide for connecting a 6-axis accelerometer, a digital MEMS microphone, and a Hall effect magnetic sensor to an ESP32 microcontroller while minimizing supply noise.',
    date: 'July 12, 2026',
    readTime: '8 min read',
    category: 'HARDWARE GUIDE',
    author: 'Ahmed Abdelrahman, Lead Hardware Eng.',
    content: (
      <div className="space-y-8 font-sans leading-relaxed text-muted-foreground">
        <p className="text-xl text-foreground/90 font-sans leading-relaxed">
          To build a reliable predictive maintenance system, clean sensor signals are crucial. In this guide, we lay out the schematics for connecting the three physical sensors with the ESP32 while avoiding electromagnetic interference common in industrial environments.
        </p>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">1️⃣ Bill of Materials (BOM)</h3>
          <div className="overflow-x-auto border border-border/30 rounded-lg my-6">
            <table className="w-full text-sm font-sans text-left">
              <thead className="bg-muted text-foreground uppercase border-b border-border/30 text-xs">
                <tr>
                  <th className="p-4">Component</th>
                  <th className="p-4">Function in Project</th>
                  <th className="p-4">Communication Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-muted-foreground">
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">ESP32 DevKit V1</td>
                  <td className="p-4">Main microcontroller, runs edge inference and WebSocket server</td>
                  <td className="p-4 text-primary font-mono">-</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">MPU6050 Accelerometer</td>
                  <td className="p-4">Measures mechanical vibration and acceleration along motor axes</td>
                  <td className="p-4 text-primary font-mono">I2C (400kHz)</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">INMP441 MEMS Microphone</td>
                  <td className="p-4">Captures high-frequency acoustic waves emitted by faulty bearings</td>
                  <td className="p-4 text-primary font-mono">I2S (Digital Audio)</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">A3144 Hall Effect Sensor</td>
                  <td className="p-4">Monitors stray magnetic flux leaking from the motor stator</td>
                  <td className="p-4 text-primary font-mono">Analog Output / ADC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">2️⃣ Software Pin Mapping</h3>
          <p className="mb-4">
            Since we interface multiple digital sensors operating at different frequencies, the GPIO pins are chosen carefully to avoid bus conflicts:
          </p>

          <div className="bg-black/80 border border-border p-6 rounded-md font-mono text-xs md:text-sm text-primary-foreground space-y-4 my-6" dir="ltr">
            <div>
              <span className="text-primary">// 1. MPU6050 (I2C Bus Configuration)</span><br />
              #define I2C_SDA_PIN   21  <span className="text-muted-foreground">// ESP32 GPIO 21</span><br />
              #define I2C_SCL_PIN   22  <span className="text-muted-foreground">// ESP32 GPIO 22</span>
            </div>

            <div>
              <span className="text-primary">// 2. INMP441 (I2S Digital Audio Bus)</span><br />
              #define I2S_SCK_PIN   14  <span className="text-muted-foreground">// Serial Clock - GPIO 14</span><br />
              #define I2S_WS_PIN    15  <span className="text-muted-foreground">// Word Select / LRCK - GPIO 15</span><br />
              #define I2S_SD_PIN    32  <span className="text-muted-foreground">// Serial Data - GPIO 32</span>
            </div>

            <div>
              <span className="text-primary">// 3. A3144 Hall Effect (Analog ADC Channel)</span><br />
              #define HALL_ADC_PIN  34  <span className="text-muted-foreground">// ADC1 Channel 6 - GPIO 34 (Input Only)</span>
            </div>

            <div>
              <span className="text-primary">// 4. Solid State Relay (Relay Actuator Control)</span><br />
              #define TRIP_RELAY_PIN  4  <span className="text-muted-foreground">// Relay Trip Command - GPIO 4</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">3️⃣ Noise Reduction Best Practices</h3>
          <ul className="space-y-4 list-disc list-inside">
            <li>
              <strong>Decoupling Capacitors:</strong> Place a <code dir="ltr" className="font-mono bg-muted px-1 rounded text-primary">0.1µF</code> ceramic capacitor near the VCC and GND pins of the INMP441 and MPU6050 to filter out power supply ripples.
            </li>
            <li>
              <strong>I2C Pull-Up Resistors:</strong> The I2C bus requires two <code dir="ltr" className="font-mono bg-muted px-1 rounded text-primary">4.7kΩ</code> pull-up resistors on the SDA and SCL lines to ensure signal integrity at Fast Mode (400kHz).
            </li>
            <li>
              <strong>Signal Separation:</strong> Keep all sensor signal wires away from high-voltage AC motor cables (220V/380V) to prevent induced electromagnetic crosstalk.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'tinyml-algorithms',
    title: 'TinyML Algorithms: Running K-Means and FFT on Resource-Constrained ESP32',
    excerpt: 'How to transform time-domain signal data to the frequency-domain using fast mathematical libraries and deploy online incremental clustering to detect anomalies locally.',
    date: 'July 13, 2026',
    readTime: '10 min read',
    category: 'TINYML ALGORITHMS',
    author: 'Youssef El-Kady, Embedded Software Eng.',
    content: (
      <div className="space-y-8 font-sans leading-relaxed text-muted-foreground">
        <p className="text-xl text-foreground/90 font-sans leading-relaxed">
          The primary challenge of processing vibration and sound in industrial setups is data volume. Streaming raw 16kHz audio consumes excessive bandwidth. The solution is local feature extraction on the edge using efficient DSP routines.
        </p>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">1️⃣ Digital Signal Processing (DSP) Pipeline</h3>
          <p className="mb-4">
            Raw audio and vibration frames go through three steps before feeding into the machine learning model:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="border border-border/30 bg-muted/10 p-5 rounded">
              <Signal className="text-primary w-8 h-8 mb-3" />
              <h5 className="font-bold text-foreground mb-2">1. Windowing</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Apply a Hanning window on the 512-sample audio buffers to reduce spectral leakage at the frame edges.
              </p>
            </div>

            <div className="border border-border/30 bg-muted/10 p-5 rounded">
              <Activity className="text-primary w-8 h-8 mb-3" />
              <h5 className="font-bold text-foreground mb-2">2. Fast Fourier Transform (FFT)</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transform time-domain data to the frequency-domain using a compiled Radix-4 C implementation to extract power spectrum peaks.
              </p>
            </div>

            <div className="border border-border/30 bg-muted/10 p-5 rounded">
              <Cpu className="text-primary w-8 h-8 mb-3" />
              <h5 className="font-bold text-foreground mb-2">3. Feature Extraction</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compute statistical features (RMS, spectral peaks, Crest Factor, Kurtosis) and pass them as a low-dimensional feature vector.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">2️⃣ Streaming Incremental K-Means</h3>
          <p className="mb-4">
            Rather than running heavy deep neural networks that consume Flash and RAM, the system utilizes an incremental K-Means clustering algorithm. It calculates the Euclidean distance between the live feature vector and the baseline clusters learned during calibration.
          </p>
          
          <div className="bg-black/80 border border-border p-6 rounded-md font-mono text-xs md:text-sm text-primary-foreground space-y-4 my-6" dir="ltr">
            <div>
              <span className="text-primary">// C++ snippet for Running Local Anomaly Detection</span><br />
              float calculate_anomaly_score(float* features, float* centroids, int num_clusters, int feature_dim) &#123;<br />
              &nbsp;&nbsp;float min_distance = 999999.0f;<br /><br />
              &nbsp;&nbsp;for (int i = 0; i &lt; num_clusters; i++) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;float distance = 0.0f;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;for (int j = 0; j &lt; feature_dim; j++) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;float diff = features[j] - centroids[i * feature_dim + j];<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance += diff * diff;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;distance = sqrt(distance);<br />
              &nbsp;&nbsp;&nbsp;&nbsp;if (distance &lt; min_distance) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_distance = distance;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;return min_distance; <span className="text-muted-foreground">// Distance acts as anomaly score</span><br />
              &#125;
            </div>
          </div>
          
          <p>
            This technique has a small RAM footprint of <code dir="ltr" className="font-mono bg-muted px-1 rounded text-primary">O(K * D)</code> where K is cluster count and D is feature dimension, requiring less than 2KB of RAM.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'freertos-multicore',
    title: 'Multitasking Software: Pinned Tasks and Queues with FreeRTOS',
    excerpt: 'Leveraging the dual-core architecture of the ESP32 to ensure safety-critical diagnostic loops remain completely unblocked by network communication latency.',
    date: 'July 14, 2026',
    readTime: '9 min read',
    category: 'FREERTOS SCHEDULING',
    author: 'Soliman El-Fares, Systems Architect',
    content: (
      <div className="space-y-8 font-sans leading-relaxed text-muted-foreground">
        <p className="text-xl text-foreground/90 font-sans leading-relaxed">
          In real-world industrial systems, blocking execution is not an option. If the processor blocks waiting for network packets or WebSocket handshakes over a spotty Wi-Fi connection, it might miss a critical mechanical fault. FreeRTOS multitasking solves this.
        </p>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">1️⃣ Dual-Core Task Configuration</h3>
          <p className="mb-4">
            The ESP32 features two independent processor cores. We pin specific tasks to designated cores and define priorities using FreeRTOS task APIs:
          </p>

          <div className="bg-black/80 border border-border p-6 rounded-md font-mono text-xs md:text-sm text-primary-foreground space-y-4 my-6" dir="ltr">
            <div>
              <span className="text-primary">// FreeRTOS task creation pinned to specific cores</span><br />
              xTaskCreatePinnedToCore(<br />
              &nbsp;&nbsp;SamplingAndAI_Task,<br />
              &nbsp;&nbsp;"Sampling_AI",<br />
              &nbsp;&nbsp;8192,             <span className="text-muted-foreground">// Stack size (bytes)</span><br />
              &nbsp;&nbsp;NULL,<br />
              &nbsp;&nbsp;10,               <span className="text-muted-foreground">// High priority</span><br />
              &nbsp;&nbsp;&amp;hSamplingTask,<br />
              &nbsp;&nbsp;0                 <span className="text-muted-foreground">// Pinned to Core 0 (Safety-critical)</span><br />
              );<br /><br />
              
              xTaskCreatePinnedToCore(<br />
              &nbsp;&nbsp;NetworkStreaming_Task,<br />
              &nbsp;&nbsp;"Net_Websocket",<br />
              &nbsp;&nbsp;4096,             <span className="text-muted-foreground">// Stack size</span><br />
              &nbsp;&nbsp;NULL,<br />
              &nbsp;&nbsp;1,                <span className="text-muted-foreground">// Low priority</span><br />
              &nbsp;&nbsp;&amp;hNetworkTask,<br />
              &nbsp;&nbsp;1                 <span className="text-muted-foreground">// Pinned to Core 1 (Network-bound)</span><br />
              );
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">2️⃣ Safe Thread Communication: FreeRTOS Queues</h3>
          <p className="mb-4">
            To avoid race conditions, tasks communicate via a thread-safe FreeRTOS queue. Once Core 0 completes feature extraction and anomaly scoring, it pushes the results to the queue and immediately returns to sampling.
          </p>
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg flex gap-4 items-start">
            <ShieldCheck className="text-primary w-6 h-6 shrink-0 mt-1" />
            <div>
              <h4 className="text-primary font-bold mb-2">100% Safety Guarantee</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Even if the Wi-Fi connection drops and the communication task on Core 1 hangs trying to reconnect, the safety-critical task on Core 0 continues running, protecting the motor without interruption.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];
