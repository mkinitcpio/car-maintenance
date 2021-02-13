export interface Change {
  text: string;
}

export interface ReleaseNotes {
  releases: string[];
  releaseNotes: {
    bugFixes: Array<Change>;
    improvements: Array<Change>;
    features: Array<Change>;
  }
}