export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly intro: string;
  readonly items: readonly string[];
}
