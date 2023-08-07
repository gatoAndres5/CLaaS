// experiment.model.ts
export interface Experiment {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
    addedOn: Date;
    lastModified: Date;
    slides: File|null;
  }
  