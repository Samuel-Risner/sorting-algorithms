import type Sortable from "../dataVisualization/sortable";
import pause from "../helpers/pause";

export default async function selectionSort(sortable: Sortable, delayMS: number): Promise<void> {
    let len: number = sortable.len();
    let minValue: number;
    let minIndex: number;

    for (let i = 0; i < len-1; i++) {
        minValue = sortable.at(i);
        minIndex = i;
        sortable.select(i);
        await pause(delayMS);

        for (let j = i+1; j < len; j++) {
            sortable.select(j);
            await pause(delayMS);

            if (sortable.at(j) < minValue) {
                sortable.unselect(minIndex);
                await pause(delayMS);

                minValue = sortable.at(j);
                minIndex = j;
            } else {
                sortable.unselect(j);
                await pause(delayMS);
            }
        }

        sortable.switch(minIndex, i);
        await pause(delayMS);
        sortable.unselect(i);
        await pause(delayMS);
    }

    console.log("Finished selection sort!");
}