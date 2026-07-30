import type Sortable from "../dataVisualization/sortable";
import pause from "../helpers/pause";

function selectPivot(end: number): number {
    return end;
}

async function quickSortRecursive(sortable: Sortable, start: number, end: number, delayMS: number): Promise<void> {
    if (start >= end)
        return;

    // select pivot element
    const pivotIndex = selectPivot(end);
    const pivotValue = sortable.at(pivotIndex);
    sortable.select(pivotIndex);
    await pause(delayMS);
    
    // move pivot element to end
    sortable.select(end);
    await pause(delayMS);
    sortable.switch(pivotIndex, end);
    
    if (pivotIndex != end)
        sortable.unselect(pivotIndex);
    
    // after this index all elements will be smaller than the pivot element
    let switchIndex = start;
    
    // sort each element (except for the pivot element)
    for (let i = start; i < end; i++) {
        sortable.select(i);
        await pause(delayMS);
        
        if (sortable.at(i) < pivotValue) {
            sortable.select(switchIndex);
            await pause(delayMS);

            sortable.switch(i, switchIndex);
            await pause(delayMS);

            sortable.unselect(switchIndex);
            switchIndex++;
        }

        sortable.unselect(i);
    }

    await pause(delayMS);

    sortable.select(switchIndex);

    await pause(delayMS);

    sortable.switch(end, switchIndex);

    await pause(delayMS);

    sortable.unselect(end);
    sortable.unselect(switchIndex);

    await pause(delayMS);

    await quickSortRecursive(sortable, start, switchIndex-1, delayMS);
    await pause(delayMS);
    await quickSortRecursive(sortable, switchIndex+1, end, delayMS);
}

export default async function quickSort(sortable: Sortable, delayMS: number): Promise<void> {
    await quickSortRecursive(sortable, 0, sortable.len()-1, delayMS);

    console.log("Finished quick sort!");
}