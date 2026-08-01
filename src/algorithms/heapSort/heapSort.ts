import type Sortable from "../../dataVisualization/sortable";
import { buildMaxHeap, maxHeapify } from "./maxHeapify";

export default async function heapSort(sortable: Sortable, pause: () => Promise<void>): Promise<void> {
    await pause();
    
    console.info("building max heap");
    await pause();

    buildMaxHeap(sortable);

    console.info("finished building max heap");
    await pause();

    console.info("sorting");
    await pause();

    for (let i = sortable.len()-1; i > 0; i--) {
        sortable.select(0);
        sortable.select(i);
        await pause();

        sortable.switch(0, i);
        await pause();

        sortable.unselect(0);
        sortable.unselect(i);
        await pause();

        maxHeapify(sortable, 0, i);
    }

    console.info("Finished heap sort!");
}