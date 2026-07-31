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
    console.info("select pivot");
    await pause();
    
    // move pivot element to end
    if (pivotIndex != end) {
        sortable.select(end);
        console.info("select end");
        await pause();

        sortable.switch(pivotIndex, end);
        console.info("switch pivot and end");
        await pause();
    
        sortable.unselect(pivotIndex);
        console.info("unselect previous end");
        await pause();
    }
    
    // after this index all elements will be smaller than the pivot element
    let switchIndex = start;
    
    // sort each element (except for the pivot element)
    console.info(`bring elements ${start} to ${end-1} into position`);

    for (let i = start; i < end; i++) {
        sortable.select(i);
        await pause();
        
        if (sortable.at(i) < pivotValue) {
            if (i !== switchIndex) { // condition only for visual
                sortable.select(switchIndex);
                await pause();
    
                sortable.switch(i, switchIndex);
                await pause();
    
                sortable.unselect(switchIndex);
            }

            switchIndex++;
        }

        sortable.unselect(i);
        await pause();
    }

    sortable.select(switchIndex);
    console.info("select insertion index for pivot");
    await pause();

    sortable.switch(end, switchIndex);
    console.info("bring pivot element into position");
    await pause();

    sortable.unselect(end);
    sortable.unselect(switchIndex);
    console.info("unselect previous");
    await pause();

    await quickSortRecursive(sortable, start, switchIndex-1, pause);
    await quickSortRecursive(sortable, switchIndex+1, end, pause);
}

export default async function quickSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    await pause();
    await quickSortRecursive(sortable, 0, sortable.len()-1, pause);
    console.info("Finished quick sort!");
}