import type Sortable from "../dataVisualization/sortable";

async function merge (sortable: Sortable, start1: number, end1: number, start2: number, end2: number, pause: () => Promise<void>): Promise<void> {
    console.info(`merge from ${start1} to ${end2}`);

    for (let insertionIndex = start1; start1 <= end1 && start2 <= end2; insertionIndex++) {
        sortable.select(start1);
        sortable.select(start2);
        await pause();
        
        if (sortable.at(start2) < sortable.at(start1)) {
            sortable.move(start2, insertionIndex);
            await pause();

            start1++;
            end1++;
            start2++;
            
            sortable.unselect(insertionIndex);
            sortable.unselect(start2-1);

        } else {
            sortable.unselect(start1);
            sortable.unselect(start2);

            start1++;
        }
    }

    sortable.unselect(start1);

    console.info("finished merging");
}

async function mergeSortRecursive(sortable: Sortable, start: number, end: number, pause: () => Promise<void>): Promise<void> {
    if (end-start < 1)
        return;

    const middle = start + Math.floor((end-start)/2);

    sortable.select(middle);
    console.info("select middle");
    await pause();

    sortable.unselect(middle);
    console.info("unselect middle");
    await pause();

    await mergeSortRecursive(sortable, start, middle, pause);
    await mergeSortRecursive(sortable, middle+1, end, pause);

    await merge(sortable, start, middle, middle+1, end, pause);
    await pause();
}

export default async function mergeSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    await pause();
    await mergeSortRecursive(sortable, 0, sortable.len()-1, pause);
    console.info("Finished merge sort!");
}