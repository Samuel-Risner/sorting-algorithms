import type Data from "../data";
import type { T_Algorithm } from "../types";
import bubbleSort from "../algorithms/bubble_sort";
import { SETTINGS } from "../settings";
import quick_sort from "../algorithms/quick_sort";

function createBtn(parent: HTMLElement, text: string, data: Data, algorithm: T_Algorithm): void {
    const btn = document.createElement("button");
    parent.appendChild(btn);
    btn.textContent = text;
    btn.className = "btn-primary";

    if (algorithm === SETTINGS.DEFAULT_ALGORITHM) {
        btn.disabled = true;
    }

    btn.addEventListener("click", () => data.algorithm = algorithm );
}

export default function initAlgorithmHTML(parent: HTMLElement, data: Data): void {
    createBtn(parent, "Bubble Sort", data, bubbleSort);
    createBtn(parent, "Quick Sort", data, quick_sort);

}