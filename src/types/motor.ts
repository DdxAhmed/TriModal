export interface KeyEquation {
  label: string;
  latex: string;
  description: string;
}

export interface FailureMode {
  title: string;
  description: string;
  relatedEquations: string[];
  image3d?: string;
}

export interface SensorPlanItem {
  sensor: string;
  purpose: string;
  howItWorks: string;
  relatedEquation?: string;
}

export interface MotorType {
  category: 'DC' | 'AC';
  family: string;          // e.g. "Brushed", "Brushless", "Induction", "Synchronous"
  slug: string;            // url-safe id, e.g. "series-wound-dc"
  name: string;
  overview: string;
  keyEquations: KeyEquation[];
  failureModes: FailureMode[];
  sensorPlan: SensorPlanItem[];
  summary: string[];
}
