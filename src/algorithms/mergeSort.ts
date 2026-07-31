import type Sortable from "../dataVisualization/sortable";

async function merge (sortable: Sortable, start1: number, end1: number, start2: number, end2: number, pause: () => Promise<void>): Promise<void> {
    for (let insertionIndex = start1; start1 <= end1 && start2 <= end2; insertionIndex++) {
        sortable.select(start1);
        sortable.select(start2);
        await pause();
        
        if (sortable.at(start2) < sortable.at(start1)) {
            sortable.move(start2, insertionIndex);
            await pause();

            sortable.unselect(start1);
            sortable.unselect(start2);
            await pause();

            start1++;
            end1++;
            start2++;

        } else {
            sortable.unselect(start1);
            await pause();

            start1++;
        }
    }
}

async function mergeSortRecursive(sortable: Sortable, start: number, end: number, pause: () => Promise<void>): Promise<void> {
    console.log("end-start", end-start);
    if (end-start < 1)
        return;

    const middle = start + Math.floor((end-start)/2);
    console.log("middle", middle);

    sortable.select(middle);
    await pause();
    sortable.unselect(middle);
    await pause();

    await mergeSortRecursive(sortable, start, middle, pause);
    await mergeSortRecursive(sortable, middle+1, end, pause);

    await merge(sortable, start, middle, middle+1, end, pause);
}

export default async function mergeSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    // sortable.move(4, 1);
    await pause();
    await mergeSortRecursive(sortable, 0, sortable.len()-1, pause);
    console.log("Finished merge sort!");
}