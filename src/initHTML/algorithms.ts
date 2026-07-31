import type Data from "../data";
import type { T_Algorithm } from "../types";
import bubbleSort from "../algorithms/bubbleSort";
import { SETTINGS } from "../settings";
import quickSort from "../algorithms/quickSort"; 
import selectionSort from "../algorithms/selectionSort";
import insertionSort from "../algorithms/insertionSort";

export default function initAlgorithmHTML(parent: HTMLElement, data: Data): void {
    const algorithms: [T_Algorithm, string][] = [
        [bubbleSort, "Bubble Sort"],
        [quickSort, "Quick Sort"],
        // [mergeSort, "Merge Sort"],
        [selectionSort, "Selection Sort"],
        [insertionSort, "Insertion Sort"],
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