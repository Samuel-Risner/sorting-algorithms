import type Data from "../data";
import type { T_Algorithm } from "../types";
import bubbleSort from "../algorithms/bubbleSort";
import { SETTINGS } from "../settings";
import quickSort from "../algorithms/quickSort/quickSort"; 
import selectionSort from "../algorithms/selectionSort";
import insertionSort from "../algorithms/insertionSort";
import mergeSort from "../algorithms/mergeSort";
import type Sortable from "../dataVisualization/sortable";
import pivotFirst from "../algorithms/quickSort/pivotFirst";
import pivotLast from "../algorithms/quickSort/pivotLast";
import pivotMedian3 from "../algorithms/quickSort/pivotMedian3";

export default function initAlgorithmHTML(parent: HTMLElement, data: Data): void {
    const algorithms: [T_Algorithm, string][] = [
        [bubbleSort, "Bubble Sort"],
        [async (sortable: Sortable, pause: () => Promise<void>) => quickSort(sortable, pause, pivotFirst), "Quick Sort (pivot first)"],
        [async (sortable: Sortable, pause: () => Promise<void>) => quickSort(sortable, pause, pivotLast), "Quick Sort (pivot last)"],
        [async (sortable: Sortable, pause: () => Promise<void>) => quickSort(sortable, pause, pivotMedian3), "Quick Sort (pivot median of 3)"],
        [selectionSort, "Selection Sort"],
        [insertionSort, "Insertion Sort"],
        [mergeSort, "Merge Sort"],
    ];

    let curBtn: HTMLButtonElement;

    for (const d of algorithms) {
        const btn = document.createElement("button");
        parent.appendChild(btn);
        btn.textContent = d[1];
        btn.className = "btn-primary";

        if (d[0] === SETTINGS.DEFAULT_ALGORITHM) {
            btn.disabled = true;
            curBtn = btn;
        }

        btn.addEventListener("click", () => {
            data.algorithm = d[0];
            curBtn.disabled = false;
            btn.disabled = true;
            curBtn = btn;
        });
    }

}