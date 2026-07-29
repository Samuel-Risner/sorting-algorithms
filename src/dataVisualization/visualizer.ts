import makeArr from "../helpers/makeArr";
import { removeChildren } from "../helpers/removeChildren";
import { SETTINGS } from "../settings";
import Sortable from "./sortable";

export default class Visualizer {

    private mainContainer: HTMLElement;
    private mainSortable: Sortable;

    constructor(parent: HTMLElement) {
        this.mainContainer = document.createElement("div");
        parent.appendChild(this.mainContainer);

        this.mainSortable = new Sortable(this.mainContainer, makeArr(SETTINGS.INPUT.DEFAULT));
    }

    public createNewMainVisual(data: number[]): Sortable {
        removeChildren(this.mainContainer);
        this.mainSortable = new Sortable(this.mainContainer, data);

        return this.mainSortable;
    }

    public shuffleMainVisual(): void {
        this.mainSortable.shuffle();
    }

    public getMainSortable(): Sortable {
        return this.mainSortable;
    }

}