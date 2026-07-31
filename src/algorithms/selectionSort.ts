import type Sortable from "../dataVisualization/sortable";

export default async function selectionSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    let len: number = sortable.len();
    let minValue: number;
    let minIndex: number;

    await pause();

    for (let i = 0; i < len-1; i++) {
        minValue = sortable.at(i);
        minIndex = i;
        sortable.select(i);
        await pause();

        for (let j = i+1; j < len; j++) {
            sortable.select(j);
            await pause();

            if (sortable.at(j) < minValue) {
                sortable.unselect(minIndex);
                await pause();

                minValue = sortable.at(j);
                minIndex = j;
            } else {
                sortable.unselect(j);
                await pause();
            }
        }

        sortable.switch(minIndex, i);
        await pause();
        sortable.unselect(i);
        await pause();
    }

    console.info("Finished selection sort!");
}