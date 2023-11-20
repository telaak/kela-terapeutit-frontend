export type Therapy = {
  muoto: string;
  lajit: string[];
};

export type Terapeutti = {
  name: string;
  locations: string[];
  phoneNumbers: string[];
  email: string | null;
  homepage: string | null;
  languages: string[];
  orientations: string[];
  therapies: Therapy[];
  lastActive: Date;
  isActive: boolean;
};
