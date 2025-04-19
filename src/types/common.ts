export interface CONFIG { 
  selectedRunner: SELECTED_RUNNER,
  osc: {
    enabled: boolean,
    targetPort: number,
    remapped: Record<string, { path: string, type: OSC_TYPE }[]>
  }
}

export type additionalData = Record<string, string | number | boolean | null>;

export interface Song { 
  artist: string | null,
  title: string | null,
  absolutepath: string,
  coverArt: string | null,
  additionalData: additionalData
}

export enum SELECTED_RUNNER {
  NONE,
  DJUCED,
  Mixxx,
  VirtualDJ,
  Traktor
}

export enum OSC_TYPE {
  INT,
  FLOAT,
  STRING,
  BLOB
}