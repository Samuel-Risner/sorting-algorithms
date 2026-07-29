import type Sortable from "./dataVisualization/sortable";

export type T_Algorithm = (s: Sortable, delayMS: number) => Promise<void>