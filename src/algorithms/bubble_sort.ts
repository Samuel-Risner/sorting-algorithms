import type Sortable from "../dataVisualization/sortable";
import pause from "../helpers/pause";

export default async function bubbleSort(sortable: Sortable, delayMS: number): Promise<void> {
    let len: number = sortable.len();
    let finished: boolean = true;

    for (let i = 0; i < len-1; i++) {
        finished = true;

        for (let j = 1; j < len-i; j++) {
            sortable.select(j);
            sortable.select(j-1);

            if (sortable.at(j) < sortable.at(j-1)) {
                sortable.switch(j, j-1);
                finished = false;
            }

            await pause(delayMS);

            sortable.unselect(j);
            sortable.unselect(j-1);

        }

        if (finished)
            break;
    }

    console.log("Finished bubble sort!");
}