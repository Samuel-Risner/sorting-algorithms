import type Sortable from "../dataVisualization/sortable";

function selectPivot(end: number): number {
    return end;
}

async function quickSortRecursive(sortable: Sortable, start: number, end: number, pause: () => Promise<void>): Promise<void> {
    if (start >= end)
        return;

    // select pivot element
    const pivotIndex = selectPivot(end);
    const pivotValue = sortable.at(pivotIndex);
    sortable.select(pivotIndex);
    await pause();
    
    // move pivot element to end
    sortable.select(end);
    await pause();
    sortable.switch(pivotIndex, end);
    
    if (pivotIndex != end)
        sortable.unselect(pivotIndex);
    
    // after this index all elements will be smaller than the pivot element
    let switchIndex = start;
    
    // sort each element (except for the pivot element)
    for (let i = start; i < end; i++) {
        sortable.select(i);
        await pause();
        
        if (sortable.at(i) < pivotValue) {
            sortable.select(switchIndex);
            await pause();

            sortable.switch(i, switchIndex);
            await pause();

            sortable.unselect(switchIndex);
            switchIndex++;
        }

        sortable.unselect(i);
    }

    await pause();

    sortable.select(switchIndex);

    await pause();

    sortable.switch(end, switchIndex);

    await pause();

    sortable.unselect(end);
    sortable.unselect(switchIndex);

    await pause();

    await quickSortRecursive(sortable, start, switchIndex-1, pause);
    await pause();
    await quickSortRecursive(sortable, switchIndex+1, end, pause);
}

export default async function quickSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    await quickSortRecursive(sortable, 0, sortable.len()-1, pause);

    console.log("Finished quick sort!");
}