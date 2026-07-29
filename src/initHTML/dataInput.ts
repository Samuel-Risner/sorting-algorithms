import type Data from "../data";
import makeArr from "../helpers/makeArr";
import { SETTINGS } from "../settings";

function getTextAreaArr(textAreaEl: HTMLTextAreaElement): number[] {
    const c: string = textAreaEl.value;
    const arr: number[] = [];
    let numStr: string = "";

    for (const s of c) {
        if ("0123456789".includes(s)) {
            numStr += s;
        } else {
            if (numStr.length > 0) {
                arr.push(Number.parseInt(numStr));
                numStr = "";
            }
        }
    }

    if (numStr.length > 0)
        arr.push(Number.parseInt(numStr));

    return arr;
}

export default function initDataInputHTML(
    defaultBtn: HTMLButtonElement, defaultContainer: HTMLElement,
    presetBtn: HTMLButtonElement, presetContainer: HTMLElement,
    customBtn: HTMLButtonElement, customContainer: HTMLElement, customTextArea: HTMLTextAreaElement, applyCustom: HTMLButtonElement,
    data: Data
): void {
    let curBtn: HTMLButtonElement;

    // default

    defaultBtn.addEventListener("click", () => {
        defaultBtn.disabled = true;
        presetBtn.disabled = false;
        customBtn.disabled = false;

        defaultContainer.hidden = false;
        presetContainer.hidden = true;
        customContainer.hidden = true;        
    });

    const a = document.createElement("button");
    defaultContainer.appendChild(a);
    a.textContent = SETTINGS.INPUT.DEFAULT.join("-");
    a.disabled = true;
    a.className = "btn-sub";
    
    a.addEventListener("click", () => {
        data.sortable = data.visualizer.createNewMainVisual(makeArr(SETTINGS.INPUT.DEFAULT));

        curBtn.disabled = false;
        a.disabled = true;
        curBtn = a;
    });
    
    curBtn = a;

    // preset

    presetBtn.addEventListener("click", () => {
        defaultBtn.disabled = false;
        presetBtn.disabled = true;
        customBtn.disabled = false;

        defaultContainer.hidden = true;
        presetContainer.hidden = false;
        customContainer.hidden = true;
    });

    for (const d of SETTINGS.INPUT.PRESETS) {
        const btn = document.createElement("button");
        presetContainer.appendChild(btn);
        btn.textContent = d.join("-");
        btn.className = "btn-sub";

        btn.addEventListener("click", () => {
            data.sortable = data.visualizer.createNewMainVisual(makeArr(d));

            curBtn.disabled = false;
            btn.disabled = true;
            curBtn = btn;
        });
    }

    // custom

    customBtn.addEventListener("click", () => {
        defaultBtn.disabled = false;
        presetBtn.disabled = false;
        customBtn.disabled = true;

        defaultContainer.hidden = true;
        presetContainer.hidden = true;
        customContainer.hidden = false;
    });

    customTextArea.textContent = makeArr(SETTINGS.INPUT.DEFAULT).join(" ");

    applyCustom.addEventListener("click", () => {
        data.sortable = data.visualizer.createNewMainVisual(getTextAreaArr(customTextArea));

        curBtn.disabled = false;
        curBtn = applyCustom;
    });
}