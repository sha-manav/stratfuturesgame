export type PageId =
  | 'landing'
  | 'opening'
  | 'protagonists'
  | 'crisis-buildup'
  | 'decision'
  | 'consequence'
  | 'ending';

export interface PageDef {
  id: PageId;
  index: number;
  showHUD: boolean;
  title: string;
}

export const pages: PageDef[] = [
  { id: 'landing', index: 0, showHUD: false, title: 'Landing' },
  { id: 'opening', index: 1, showHUD: false, title: 'Chapter 1: The Long Drift' },
  { id: 'protagonists', index: 2, showHUD: false, title: 'The Players' },
  { id: 'crisis-buildup', index: 3, showHUD: true, title: 'Crisis Buildup' },
  { id: 'decision', index: 4, showHUD: true, title: 'Decision Point' },
  { id: 'consequence', index: 5, showHUD: true, title: 'Consequences' },
  { id: 'ending', index: 6, showHUD: false, title: 'Epilogue' },
];

export const getPageDef = (index: number): PageDef | undefined =>
  pages.find((p) => p.index === index);

export const getPageByIndex = (index: number): PageDef => {
  const p = pages.find((pg) => pg.index === index);
  if (!p) throw new Error(`No page at index ${index}`);
  return p;
};

export const TOTAL_PAGES = pages.length;
