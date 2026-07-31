import type Sortable from "../dataVisualization/sortable";

export default async function insertionSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    let len: number = sortable.len();
    let j: number;
    let v: number;

    await pause();

    for (let i = 1; i < len; i++) {
        j = i;
        v = sortable.at(j);

        sortable.select(j);
        await pause();

        sortable.select(j-1);
        await pause();
        
        while (j > 0 && sortable.at(j-1) > v) {
            sortable.switch(j, j-1);
            await pause();

            sortable.unselect(j);
            if (j == 1)
                sortable.unselect(j-1);
            await pause();

            j--;

            if (j != i && j > 0) {
                sortable.select(j-1);
                await pause();
            }
        }

        sortable.unselect(j);

        if (j > 0) {
            sortable.unselect(j-1);
            await pause();
        }
    }

    console.info("Finished insertion sort!");
}