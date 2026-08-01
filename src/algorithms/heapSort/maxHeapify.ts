import type Sortable from "../../dataVisualization/sortable";

export function maxHeapify(sortable: Sortable, index: number, len: number): void {
    const left = 2*index + 1;
    const right = 2*index + 2;
    let largest = index;

    if (left < len && sortable.at(left) > sortable.at(largest))
        largest = left;

    if (right < len && sortable.at(right) > sortable.at(largest))
        largest = right;

    if (largest != index) {
        sortable.switch(index, largest);
        maxHeapify(sortable, largest, len);
    }
}

export function buildMaxHeap(sortable: Sortable): void {
    for (let i = Math.floor(sortable.len() / 2); i >= 0; i--) {
        maxHeapify(sortable, i, sortable.len());
    }
}