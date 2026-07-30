import type Sortable from "./dataVisualization/sortable";

export type T_Algorithm = (s: Sortable, pause: () => Promise<void>) => Promise<void>