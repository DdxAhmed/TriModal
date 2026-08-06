import { ReactNode } from 'react';
import { Cpu, Signal, Activity, ShieldCheck, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { KaTeXFormula } from '@/components/katex-formula';

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
    title: 'Predictive Maintenance & Condition Monitoring of Electric Motors',
    excerpt: 'A comprehensive study on fundamental operating principles, physical structures, and characteristic failure modes of DC and AC electric motors, presenting an integrated multi-sensor edge predictive maintenance scheme.',
    date: 'August 2026',
    readTime: '20 min read',
    category: 'RESEARCH PAPER',
    author: 'Ahmed Salmona, Souad Mostafa, Haneen Yasser, Maryam Mahmoud',
    content: (
      <div className="space-y-10 font-sans leading-relaxed text-muted-foreground">
        {/* Authors Header Box */}
        <div className="bg-card/60 border border-primary/30 p-6 rounded-xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 text-primary font-mono text-xs mb-3">
            <UserCheck className="w-4 h-4" />
            <span>RESEARCH_AUTHORS // DEEP_DIAGNOSTICS_TEAM</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm font-bold text-foreground">
            <div className="p-3 bg-black/40 border border-border/40 rounded-lg text-center">Ahmed Salmona</div>
            <div className="p-3 bg-black/40 border border-border/40 rounded-lg text-center">Souad Mostafa</div>
            <div className="p-3 bg-black/40 border border-border/40 rounded-lg text-center">Haneen Yasser</div>
            <div className="p-3 bg-black/40 border border-border/40 rounded-lg text-center">Maryam Mahmoud</div>
          </div>
        </div>

        {/* Abstract / Introduction */}
        <div>
          <h2 className="text-3xl font-bold font-mono text-foreground mb-4 glow-text">Introduction</h2>
          <p className="text-lg text-foreground/90 font-sans leading-relaxed border-l-4 pl-4 border-primary mb-6">
            Electric motors serve as the core driving units across modern industrial systems, manufacturing lines, and automated processes. Maintaining their operational reliability is vital to preventing unscheduled downtime, reducing catastrophic equipment failures, and optimizing overall operational efficiency.
          </p>
          <p className="mb-4">
            This paper provides a comprehensive study on the fundamental operating principles, physical structures, and characteristic failure modes of both DC and AC electric motor architectures. Furthermore, it outlines an integrated, multi-sensor predictive maintenance scheme—combining optical, acoustic, electrical, magnetic, thermal, and vibration diagnostics—to continuously monitor operational health, enable early fault detection, and transition from reactive maintenance to intelligent predictive strategies.
          </p>
        </div>

        <hr className="border-border/30" />

        {/* SECTION: DC MOTORS OVERVIEW */}
        <div>
          <h2 className="text-3xl font-bold font-mono text-foreground mb-4 glow-text">1. DC Motors Architecture & Breakdown Mechanics</h2>
          <p className="mb-6">
            DC motors split into two big families: <strong>brushed</strong> (mechanical commutation) and <strong>brushless</strong> (electronic commutation). Each behaves differently electrically and mechanically, which dictates baseline sensor signatures and fault progression profiles.
          </p>

          {/* 1.1 BRUSHED DC MOTORS */}
          <div className="mb-8 bg-card/30 border border-border/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-primary font-mono mb-3">1.1 Brushed DC Motors Mechanical Principles</h3>
            <p className="text-sm leading-relaxed">
              All brushed motors share the same core mechanism: a stationary stator (field) creates a magnetic field, and a rotating armature (rotor) carries current-carrying windings. A commutator—a segmented copper ring on the rotor shaft combined with spring-loaded carbon brushes—physically reverses current direction in the rotor windings every half-rotation, maintaining consistent unidirectional torque as the rotor turns.
            </p>
            <p className="text-sm leading-relaxed mt-2 text-destructive/90 font-semibold">
              This mechanical switching interface is the single largest source of mechanical wear, copper etching, carbon dust build-up, and high-frequency electrical arcing noise in brushed machines.
            </p>
          </div>

          {/* 1.2 SERIES-WOUND DC MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-cyan pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">1.2 Series-Wound DC Motor</h3>
              <p className="text-xs font-mono text-cyan mt-1">
                (Armature and field windings connected in series: same current — massive starting torque)
              </p>
            </div>

            <p>
              In a series-wound motor, the stator field windings are connected directly in series with the rotor armature windings. As a result, field flux is generated directly by the armature current, generating a starting torque proportional to the square of the current:
            </p>

            <div className="bg-black/60 border border-border/40 p-4 rounded-lg my-4 flex justify-center">
              <KaTeXFormula latex="T \propto I^2" displayMode={true} />
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Breakdown Mechanics</h4>
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-destructive/5 border-destructive/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-destructive mb-2">1. Overspeed Due to Sudden Load Loss (Runaway Hazard)</h5>
                  <p className="text-sm mb-3">
                    Motor speed is inversely proportional to field flux:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="N \propto \frac{1}{\Phi} \quad \text{where} \quad \Phi \propto I" displayMode={true} />
                  </div>
                  <p className="text-sm mt-3">
                    If load suddenly decouples, current I drops, collapsing magnetic flux <KaTeXFormula latex="\Phi" displayMode={false} />. Speed N accelerates exponentially, generating destructive centrifugal force:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="F_c = m\omega^2r" displayMode={true} />
                  </div>
                  <p className="text-sm">
                    This force violently ejects rotor windings and mechanically shatters the motor rotor.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-foreground mb-2">2. Carbon Brush & Commutator Surface Wear</h5>
                  <p className="text-sm mb-2">
                    Large series current flowing across carbon brushes generates intense electrical arcing, etching copper commutator segments. Contact resistance R increases, causing severe Joule thermal dissipation:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="P = I^2 R" displayMode={true} />
                  </div>
                  <p className="text-sm">
                    This melts coil varnish and accelerates insulation breakdown.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-foreground mb-2">3. Short Circuits in Series Windings</h5>
                  <p className="text-sm mb-2">
                    Heavy industrial vibrations destroy winding varnish layer. Stator turns bypass the circuit, sharply dropping motor resistance:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="I = \frac{V}{R} \quad (R\downarrow \;\Rightarrow\; I\uparrow)" displayMode={true} />
                  </div>
                  <p className="text-sm">
                    The resulting massive current spike burns out remaining electrical components.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Multi-Sensor Prediction Plan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">1. Optical Tachometer</span>
                <span>Monitors shaft RPM & computes acceleration <KaTeXFormula latex="\alpha = \frac{d\omega}{dt}" displayMode={false} /> to trigger sub-ms cutoffs before runaway.</span>
              </div>
              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">2. INMP441 Mic + UV/IR Photodiode</span>
                <span>Cross-validates acoustic arcing FFT energy (up to 22kHz) with optical spark pulse counts.</span>
              </div>
              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">3. A3144 Hall + Current Shunt</span>
                <span>Measures stray flux asymmetry and galavanic-isolated current spikes during winding shorts.</span>
              </div>
              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">4. MPU6050 + MLX90614</span>
                <span>Computes RMS vibration <KaTeXFormula latex="a_{\text{RMS}}" displayMode={false} /> and brush housing thermal rise rate <KaTeXFormula latex="\frac{dT}{dt}" displayMode={false} />.</span>
              </div>
            </div>
          </div>

          <hr className="border-border/30 my-10" />

          {/* 1.3 SHUNT-WOUND DC MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">1.3 Shunt-Wound DC Motor</h3>
              <p className="text-xs font-mono text-primary mt-1">
                (Armature and field windings in parallel: constant field current, self-regulating speed)
              </p>
            </div>

            <p>
              In a shunt-wound motor, field windings are connected in parallel with armature windings. High field resistance (<KaTeXFormula latex="R_{sh}" displayMode={false} />) draws a small, constant field current, providing nearly constant speed regulation across varying mechanical loads.
            </p>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Breakdown Mechanics</h4>
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-destructive/5 border-destructive/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-destructive mb-2">1. Shunt Field Open Circuit & Explosive Runaway</h5>
                  <p className="text-sm mb-2">
                    Delicate shunt field wire snaps from vibration or thermal fatigue. Field flux drops to zero (<KaTeXFormula latex="\Phi \to 0" displayMode={false} />), forcing speed into runaway (<KaTeXFormula latex="N \propto 1/\Phi" displayMode={false} />) while armature inrush surges:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="I_a = \frac{V - E_b}{R_a}" displayMode={true} />
                  </div>
                  <p className="text-sm">
                    Centrifugal force <KaTeXFormula latex="F_c = m\omega^2r" displayMode={false} /> physically shatters the rotor core.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-foreground mb-2">2. Heavy-Load Starting Stall</h5>
                  <p className="text-sm mb-2">
                    Starting torque scales only linearly (<KaTeXFormula latex="T \propto I_a" displayMode={false} />). Starting under extreme loads causes rotor lock, reducing back-EMF <KaTeXFormula latex="E_b = 0" displayMode={false} />. Armature current spikes to <KaTeXFormula latex="I_a = V/R_a" displayMode={false} />, producing burnout heat <KaTeXFormula latex="P = I_a^2 R_a" displayMode={false} />.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-foreground mb-2">3. Voltage Fluctuation & Field-Armature Imbalance</h5>
                  <p className="text-sm">
                    Voltage sags reduce field current <KaTeXFormula latex="I_f = V/R_{sh}" displayMode={false} />, triggering speed oscillations and heavy neutral-plane brush sparking.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4">
                  <h5 className="font-bold text-foreground mb-2">4. Cumulative Thermal Aging (Montsinger\'s Rule)</h5>
                  <p className="text-sm">
                    Sustained overload generates continuous resistive heat. Every 10°C rise above rated temperature reduces insulation life by 50%.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Prediction Plan Highlights</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Dedicated Field Current Sensor (ACS712):</strong> Monitors <KaTeXFormula latex="I_f = V/R_{sh}" displayMode={false} /> continuously; triggers immediate cutoff on field current loss before runaway occurs.</li>
              <li><strong>Armature Inrush Profile:</strong> Logs <KaTeXFormula latex="\int I_a^2 dt" displayMode={false} /> during direct-on-line starts to evaluate cumulative thermal fatigue.</li>
              <li><strong>Acoustic-Optical Cross Validation:</strong> Fuses MEMS microphone FFT energy and UV/IR spark counts with armature load current.</li>
            </ul>
          </div>

          <hr className="border-border/30 my-10" />

          {/* 1.4 COMPOUND-WOUND DC MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-amber pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">1.4 Compound-Wound DC Motor</h3>
              <p className="text-xs font-mono text-amber mt-1">
                (Combines series field and shunt field on same poles: blends high starting torque with speed regulation)
              </p>
            </div>

            <p>
              Compound motors incorporate both high-resistance shunt windings and low-resistance series windings. In standard cumulative configuration, the fluxes reinforce each other under load, delivering high starting torque without uncontrolled no-load runaway.
            </p>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Prediction Plan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-border/40 p-4 rounded-lg">
                <h5 className="font-bold text-foreground mb-2 font-mono">Partial Field Loss & Current Ratio</h5>
                <p className="text-xs mb-3">
                  Shunt field breakage produces partial speed runaway under light load. Sensing requires tracking dual current ratio:
                </p>
                <div className="text-center my-2">
                  <KaTeXFormula latex="\text{Ratio} = \frac{I_{sh}}{I_a}" displayMode={true} />
                </div>
              </div>

              <div className="bg-black/40 border border-border/40 p-4 rounded-lg">
                <h5 className="font-bold text-foreground mb-2 font-mono">Adaptive Speed Deviation</h5>
                <p className="text-xs mb-3">
                  Evaluates shaft speed against compounding droop curve to isolate field loss from normal load variations:
                </p>
                <div className="text-center my-2">
                  <KaTeXFormula latex="\Delta N = N_{\text{actual}} - N_{\text{expected}}(I_a)" displayMode={true} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-card/40 border border-border/40 rounded-lg text-sm">
              <strong>Direct Pole-Face Air-Gap Flux Sensing:</strong> An A3144 Hall-effect sensor mounted directly on the pole face measures <KaTeXFormula latex="B_{\text{actual}} \propto (\Phi_{sh} \pm \Phi_{se})" displayMode={false} />, identifying internal coil short circuits before mechanical damage occurs.
            </div>
          </div>

          <hr className="border-border/30 my-10" />

          {/* 1.5 PERMANENT-MAGNET DC MOTOR (PMDC) */}
          <div className="space-y-6">
            <div className="border-l-4 border-cyan pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">1.5 Permanent-Magnet DC Motor (PMDC)</h3>
              <p className="text-xs font-mono text-cyan mt-1">
                (Field excitation provided by permanent magnets: compact, single current path, vulnerable to flux fade)
              </p>
            </div>

            <p>
              PMDC motors replace field coils with fixed permanent magnets. Torque and back-EMF equations depend directly on magnet flux <KaTeXFormula latex="\Phi" displayMode={false} />:
            </p>
            <div className="bg-black/60 border border-border/40 p-4 rounded-lg my-4 flex justify-center gap-8">
              <KaTeXFormula latex="T = K_t \Phi I_a" displayMode={true} />
              <KaTeXFormula latex="E_b = K_e \Phi \omega" displayMode={true} />
            </div>

            <Card className="bg-destructive/5 border-destructive/30 my-4">
              <CardContent className="pt-4">
                <h5 className="font-bold text-destructive mb-2 font-mono">Irreversible Magnetic Demagnetization Loop</h5>
                <p className="text-sm mb-3">
                  High armature current produces opposing demagnetizing MMF <KaTeXFormula latex="H_d = \beta(T_m) I_a" displayMode={false} />. Combined with magnet temperature <KaTeXFormula latex="T_m" displayMode={false} />, permanent magnets lose flux (<KaTeXFormula latex="\Phi \downarrow" displayMode={false} />).
                </p>
                <p className="text-sm font-mono text-foreground">
                  To maintain torque, motor draws higher current <KaTeXFormula latex="I_a = \frac{T}{K_t \Phi}" displayMode={false} />, producing higher resistive heat <KaTeXFormula latex="P = I_a^2 R_a" displayMode={false} />, accelerating demagnetization in an irreversible feedback loop.
                </p>
              </CardContent>
            </Card>
          </div>

          <hr className="border-border/30 my-10" />

          {/* 1.6 BRUSHLESS DC MOTOR (BLDC) */}
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">1.6 Brushless DC Motor (BLDC)</h3>
              <p className="text-xs font-mono text-primary mt-1">
                (Electronic commutation via 3-phase inverter: eliminates brush friction, shifts failure modes to timing & electronics)
              </p>
            </div>

            <p>
              BLDC motors feature permanent magnet rotors and 3-phase stator windings switched by inverter bridges based on position feedback. Eliminating mechanical brushes shifts failure modes to commutation timing drift, phase current imbalance, and high-frequency PWM eddy magnet heating.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono my-4">
              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">Commutation Timing Error</span>
                <KaTeXFormula latex="T = K_t \Phi I \cos(\theta_{\text{error}})" displayMode={true} />
                <span className="text-xs text-muted-foreground mt-2 block">Position sensor drift degrades torque output and induces severe vibration ripple.</span>
              </div>

              <div className="p-4 bg-card/40 border border-border/40 rounded-lg">
                <span className="text-primary font-bold block mb-1">Three-Phase Symmetry Residual</span>
                <KaTeXFormula latex="I_{\text{residual}} = I_A(t) + I_B(t) + I_C(t) = 0" displayMode={true} />
                <span className="text-xs text-muted-foreground mt-2 block">Phase winding shorts cause non-zero residual current sum.</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-border/30" />

        {/* SECTION: INTEGRATED MULTI-SENSOR PREDICTIVE MAINTENANCE MATRIX */}
        <div>
          <h2 className="text-3xl font-bold font-mono text-foreground mb-4 glow-text">2. Integrated Multi-Sensor Diagnostic Architecture</h2>
          <p className="mb-6">
            To provide sub-millisecond trip protection while generating long-term health prognostics, the diagnostic system fuses six distinct physical sensing channels:
          </p>

          <div className="overflow-x-auto border border-border/30 rounded-xl my-6">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-muted text-foreground uppercase border-b border-border/30">
                <tr>
                  <th className="p-3">Physical Modality</th>
                  <th className="p-3">Sensor Model</th>
                  <th className="p-3">Target Signature</th>
                  <th className="p-3">Governing Equation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-cyan">Optical Speed</td>
                  <td className="p-3">IR Tachometer</td>
                  <td className="p-3">RPM & Speed Acceleration</td>
                  <td className="p-3"><KaTeXFormula latex="\alpha = d\omega/dt" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-cyan">Acoustic Arcing</td>
                  <td className="p-3">INMP441 MEMS Mic</td>
                  <td className="p-3">Ultrasound FFT High-Subband</td>
                  <td className="p-3"><KaTeXFormula latex="E_{\text{high-band}} > \text{Threshold}" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-cyan">Optical Sparking</td>
                  <td className="p-3">UV/IR Photodiode</td>
                  <td className="p-3">Commutator Flash Pulse Count</td>
                  <td className="p-3"><KaTeXFormula latex="\text{Spark Rate} > N_{\text{limit}}" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-primary">Electrical Current</td>
                  <td className="p-3">ACS712 / ACS758</td>
                  <td className="p-3">Inrush Profile & Field/Armature Ratio</td>
                  <td className="p-3"><KaTeXFormula latex="\text{Ratio} = I_{sh}/I_a, \int I_a^2 dt" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-primary">Magnetic Air-Gap</td>
                  <td className="p-3">A3144 Hall Effect</td>
                  <td className="p-3">Stray Flux Asymmetry & Demag Fade</td>
                  <td className="p-3"><KaTeXFormula latex="\Delta B = B_{\text{baseline}} - B_{\text{actual}}" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-amber">Vibration & Kinetic</td>
                  <td className="p-3">MPU6050 Accelerometer</td>
                  <td className="p-3">Tri-Axis RMS Acceleration & Unbalance</td>
                  <td className="p-3"><KaTeXFormula latex="a_{\text{RMS}} = \sqrt{\frac{1}{N}\sum a_i^2}" displayMode={false} /></td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3 font-bold text-amber">Thermal Infrared</td>
                  <td className="p-3">MLX90614 Non-Contact IR</td>
                  <td className="p-3">Housing & Magnet Rise Rate</td>
                  <td className="p-3"><KaTeXFormula latex="dT/dt" displayMode={false} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-border/30 my-10" />

        {/* SECTION 2: AC MOTORS */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold font-mono text-foreground mb-4 glow-text-blue">2. AC Motors Architecture & Diagnostic Framework</h2>
            <p className="text-lg text-foreground/90 font-sans leading-relaxed border-l-4 pl-4 border-blue-500 mb-6">
              AC motors split into two major architectural families: <strong>Induction (Asynchronous) motors</strong> and <strong>Synchronous motors</strong>. Unlike DC machines where field and armature circuits are structurally separate, AC motors rely on alternating line currents to establish a rotating magnetic field (RMF) in the stator.
            </p>
            <p className="mb-4">
              Because AC motors operate directly on polyphase AC mains or Variable Frequency Drives (VFDs), mechanical commutator wear and brush arcing are completely absent in standard squirrel-cage and PMSM units; instead, operational dynamics are defined by supply line frequency, slip speed, phase current balance, and continuous magnetizing currents. Failure modes shift away from mechanical sliding contacts toward stator insulation degradation, rotor bar fatigue and fracture, bearing shaft voltage discharge, and dynamic air-gap eccentricities.
            </p>
          </div>

          {/* 2.1 SQUIRREL-CAGE INDUCTION MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">2.1 Squirrel-Cage Induction Motor</h3>
              <p className="text-xs font-mono text-blue-400 mt-1">
                (Stator carries 3-phase AC windings creating RMF; rotor carries short-circuited conductive bars in a cage structure)
              </p>
            </div>

            <p>
              This motor is the absolute workhorse of modern industrial automation. It operates on the principle of electromagnetic induction: three-phase AC currents in the stator produce a rotating magnetic field (RMF) spinning at synchronous speed <KaTeXFormula latex="N_s" displayMode={false} />:
            </p>
            <div className="my-4 text-center bg-black/40 p-4 border border-blue-500/20 rounded-lg">
              <KaTeXFormula latex="N_s = \frac{120 f_s}{P}, \quad s = \frac{N_s - N_r}{N_s}" displayMode={true} />
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Breakdown Mechanics</h4>
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-destructive/10 border-destructive/40">
                <CardContent className="pt-4 space-y-2">
                  <h5 className="font-bold text-destructive text-base">1. Broken Rotor Bar & End-Ring Joint Fracture</h5>
                  <p className="text-sm">
                    Direct-on-line (DOL) starts induce starting currents up to 6–8 times rated capacity (<KaTeXFormula latex="I_{\text{inrush}} = 6\text{--}8 \times I_{\text{rated}}" displayMode={false} />), generating extreme thermal expansion differential:
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="\Delta L = L_0 \cdot \alpha \cdot \Delta T \implies f_{\text{sideband}} = (1 \pm 2s) f_s" displayMode={true} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bar fracture creates a localized dead spot in torque production, giving rise to upper and lower sideband frequencies in the stator current spectrum around the fundamental line frequency.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4 space-y-2">
                  <h5 className="font-bold text-foreground text-base">2. Stator Winding Insulation Breakdown & Inter-Turn Fault Cascade</h5>
                  <p className="text-sm">
                    High voltage transients (<KaTeXFormula latex="dV/dt" displayMode={false} />) from PWM VFD drivers degrade slot varnish. A turn-to-turn short loop draws high circulating currents (<KaTeXFormula latex="I_{\text{short}}" displayMode={false} />), escalating rapidly into phase-to-phase or phase-to-ground faults (<KaTeXFormula latex="I_A + I_B + I_C \neq 0" displayMode={false} />).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/30">
                <CardContent className="pt-4 space-y-2">
                  <h5 className="font-bold text-foreground text-base">3. Dynamic Air-Gap Eccentricity & Bearing Fluting (EDM)</h5>
                  <p className="text-sm mb-2">
                    Bearing wear shifts rotor alignment, generating Unbalanced Magnetic Pull (UMP):
                  </p>
                  <div className="my-2 text-center">
                    <KaTeXFormula latex="F_{\text{UMP}} \propto \left(\frac{1}{\delta_{\text{min}}^2} - \frac{1}{\delta_{\text{max}}^2}\right)" displayMode={true} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Furthermore, high common-mode voltages from VFDs cause micro-arc discharges through bearing grease film, creating characteristic fluting ridges on raceways.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <hr className="border-border/30" />

          {/* 2.2 WOUND-ROTOR (SLIP-RING) INDUCTION MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">2.2 Wound-Rotor (Slip-Ring) Induction Motor</h3>
              <p className="text-xs font-mono text-emerald-400 mt-1">
                (Polyphase insulated rotor windings connected via slip rings and carbon brushes to external starting resistors)
              </p>
            </div>

            <p>
              Designed for heavy-duty starting under high inertia (rock crushers, mine hoists). Injecting external resistance into the rotor circuit shifts maximum breakdown torque point to zero speed (<KaTeXFormula latex="s = 1.0" displayMode={false} />):
            </p>
            <div className="my-4 text-center bg-black/40 p-4 border border-emerald-500/20 rounded-lg">
              <KaTeXFormula latex="T \propto \frac{s V^2 R_r}{R_r^2 + (s X_r)^2}, \quad \text{where } R_r = R_{\text{rotor}} + R_{\text{ext}}" displayMode={true} />
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Diagnostic Profile</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Slip Ring Arcing & Brush Open-Circuit</span>
                <p className="text-xs text-muted-foreground">
                  Friction and carbon dust build-up cause phase open circuits (<KaTeXFormula latex="I_{r,A} = 0" displayMode={false} />), forcing single-phasing operation with &gt;50% drop in maximum available torque.
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Resistor Thermal Overload</span>
                <p className="text-xs text-muted-foreground">
                  Stuck contactors keep external resistors energized, causing thermal runaway and asymmetric rotor resistance (<KaTeXFormula latex="R_{\text{ext}, A} \neq R_{\text{ext}, B}" displayMode={false} />).
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Rotor Winding Voltage Breakdown</span>
                <p className="text-xs text-muted-foreground">
                  Standstill high open-circuit voltage (<KaTeXFormula latex="V_r = s \cdot E_{\text{rotor}}" displayMode={false} />) combined with centrifugal throw (<KaTeXFormula latex="F_c = m\omega^2r" displayMode={false} />) breaks inter-turn coil insulation.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-border/30" />

          {/* 2.3 ELECTRICALLY EXCITED SYNCHRONOUS MOTOR */}
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">2.3 Electrically Excited (Wound-Field) Synchronous Motor</h3>
              <p className="text-xs font-mono text-purple-400 mt-1">
                (DC-excited rotor field locks synchronously with stator RMF at exactly zero slip)
              </p>
            </div>

            <p>
              Operates at constant synchronous speed (<KaTeXFormula latex="s = 0 \implies N_r = N_s" displayMode={false} />) while allowing power factor correction by adjusting DC excitation field current (<KaTeXFormula latex="I_f" displayMode={false} />):
            </p>
            <div className="my-4 text-center bg-black/40 p-4 border border-purple-500/20 rounded-lg">
              <KaTeXFormula latex="P_{\text{developed}} = \frac{3 V_s E_f}{X_d} \sin(\delta), \quad \text{where } E_f \propto I_f" displayMode={true} />
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Failure Modes & Excitation Losses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-purple-500/10 border-purple-500/30">
                <CardContent className="pt-4 space-y-2">
                  <h5 className="font-bold text-purple-300 text-base">1. Field Loss (Loss of Excitation) & Asynchronous Pull-Out</h5>
                  <p className="text-sm">
                    If DC field current drops (<KaTeXFormula latex="I_f \to 0" displayMode={false} />), developed torque collapses (<KaTeXFormula latex="P_{\text{max}} \to 0" displayMode={false} />). The motor snaps out of synchronism (<KaTeXFormula latex="s > 0" displayMode={false} />), inducing destructive high-voltage spikes across field coils.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/30">
                <CardContent className="pt-4 space-y-2">
                  <h5 className="font-bold text-purple-300 text-base">2. Field Pole Short & Thermal Shaft Bowing</h5>
                  <p className="text-sm">
                    An inter-turn short in a rotor pole coil reduces local flux (<KaTeXFormula latex="\Phi_1 < \Phi_2" displayMode={false} />), creating Unbalanced Magnetic Pull (UMP) at 1x RPM and asymmetric thermal shaft distortion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <hr className="border-border/30" />

          {/* 2.4 PERMANENT MAGNET SYNCHRONOUS MOTOR (PMSM) */}
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-2xl font-bold text-foreground font-mono">2.4 Permanent Magnet Synchronous Motor (PMSM)</h3>
              <p className="text-xs font-mono text-amber-400 mt-1">
                (High energy density NdFeB rotor magnets lock synchronously with inverter sinusoidal drive)
              </p>
            </div>

            <p>
              PMSMs represent the state of the art in robotics and EV powertrains, eliminating rotor copper losses (<KaTeXFormula latex="I^2R = 0" displayMode={false} />). Electromagnetic torque in d-q coordinates:
            </p>
            <div className="my-4 text-center bg-black/40 p-4 border border-amber-500/20 rounded-lg">
              <KaTeXFormula latex="T_e = \frac{3}{2} P \left[ \Psi_m I_q + (L_d - L_q) I_d I_q \right]" displayMode={true} />
            </div>

            <h4 className="text-lg font-bold text-foreground mt-6 mb-3 font-mono">Critical Breakdown Mechanics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-2">
                <span className="font-bold text-amber-400 block text-sm">Irreversible Demagnetization</span>
                <p className="text-xs text-muted-foreground">
                  Rotor temperatures exceeding knee point (<KaTeXFormula latex="T > T_{\text{knee}}" displayMode={false} />) cause permanent remanence loss (<KaTeXFormula latex="B_r \downarrow" displayMode={false} />), triggering higher current draw and destructive thermal runaway.
                </p>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-2">
                <span className="font-bold text-amber-400 block text-sm">Stator PWM Inverter Short</span>
                <p className="text-xs text-muted-foreground">
                  High <KaTeXFormula latex="dV/dt" displayMode={false} /> wavefronts break insulation. Spinning rotor magnets continuously induce high short-circuit currents (<KaTeXFormula latex="I_{\text{short}} = \omega_e \Psi_m / Z" displayMode={false} />) through transformer action even when drive is off.
                </p>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-2">
                <span className="font-bold text-amber-400 block text-sm">Inverter-Induced EDM Fluting</span>
                <p className="text-xs text-muted-foreground">
                  High switching frequency common-mode voltage discharges across bearing grease film, creating microscopic pitting and bearing race destruction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-border/30" />

        {/* SECTION: CONCLUSION */}
        <div>
          <h2 className="text-3xl font-bold font-mono text-foreground mb-4 glow-text">3. Conclusion & Research Takeaways</h2>
          <p className="mb-4">
            Traditional motor protection relying strictly on thermal overload relays or circuit breakers is inherently reactive: by the time current spikes high enough to trip a breaker, mechanical degradation and winding insulation damage have already occurred.
          </p>
          <p className="mb-4">
            By fusing optical speed acceleration, ultrasonic acoustic spectra, UV/IR spark counts, direct air-gap magnetic flux density, tri-axial vibration FFT, and non-contact IR thermography on edge microcontrollers, predictive maintenance systems achieve:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs my-6">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary">
              <span className="font-bold block mb-1 text-sm text-foreground">Sub-5ms Trip Latency</span>
              <span>Hardware interrupts cut power during explosive speed runaway or stall lock before rotor destruction.</span>
            </div>
            <div className="p-4 bg-cyan/10 border border-cyan/30 rounded-lg text-cyan">
              <span className="font-bold block mb-1 text-sm text-foreground">Zero False Positives</span>
              <span>Dual-channel acoustic and optical sensor fusion eliminates false alarms caused by ambient industrial noise.</span>
            </div>
            <div className="p-4 bg-amber/10 border border-amber/30 rounded-lg text-amber">
              <span className="font-bold block mb-1 text-sm text-foreground">Montsinger Life Tracking</span>
              <span>Long-term thermal integration (<KaTeXFormula latex="dT/dt" displayMode={false} />) predicts winding insulation end-of-life weeks in advance.</span>
            </div>
          </div>
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
              &nbsp;&nbsp;1,<br />
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
