export interface Change {
  text: string;
}

export interface ReleaseNotes {
  title: string;
  bugFixes: Array<Change>;
  improvements: Array<Change>;
  features: Array<Change>;
}