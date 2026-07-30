import Sortable from "./dataVisualization/sortable";
import type Visualizer from "./dataVisualization/visualizer";
import { SETTINGS } from "./settings";
import type { T_Algorithm } from "./types";

export default class Data {

    public visualizer: Visualizer;
    public sortable: Sortable;
    public pause: () => Promise<void>;
    public algorithm: T_Algorithm;

    constructor(visualizer: Visualizer) {
        this.visualizer = visualizer;
        this.sortable = visualizer.getMainSortable();
        this.pause = async () => {};
        this.algorithm = SETTINGS.DEFAULT_ALGORITHM;
    }
}