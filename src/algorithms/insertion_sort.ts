import type Sortable from "../dataVisualization/sortable";
import pause from "../helpers/pause";

export default async function insertionSort(sortable: Sortable, delayMS: number): Promise<void> {
    let len: number = sortable.len();
    let j: number;
    let v: number;

    for (let i = 1; i < len; i++) {
        j = i;
        v = sortable.at(j);

        sortable.select(j);
        await pause(delayMS);

        sortable.select(j-1);
        await pause(delayMS);
        
        while (j > 0 && sortable.at(j-1) > v) {
            sortable.switch(j, j-1);
            await pause(delayMS);

            sortable.unselect(j);
            if (j == 1)
                sortable.unselect(j-1);
            await pause(delayMS);

            j--;

            if (j != i && j > 0) {
                sortable.select(j-1);
                await pause(delayMS);
            }
        }

        sortable.unselect(j);

        if (j > 0) {
            sortable.unselect(j-1);
            await pause(delayMS);
        }
    }

    console.log("Finished insertion sort!");
}