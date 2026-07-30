import type Data from "../data";
import pause from "../helpers/pause";
import { SETTINGS } from "../settings";

export default function initDelayHTML(parent: HTMLElement, data: Data, btn_step: HTMLButtonElement): void {
    let curBtn: HTMLButtonElement;

    const a = document.createElement("button");
    parent.appendChild(a);
    a.textContent = "Step";
    a.className = "btn-primary";

    a.addEventListener("click", () => {
        curBtn.disabled = false;
        a.disabled = true;
        curBtn = a;
        data.step = true;
        data.pause = async () => await new Promise(resolve => btn_step.addEventListener("click", () => resolve(), { once: true }) );
    });

    curBtn = a;
    data.step = true;

    for (const delayMS of SETTINGS.DELAY.OPTIONS_MS) {
        const btn = document.createElement("button");
        parent.appendChild(btn);
        btn.textContent = `${delayMS}ms`;
        btn.className = "btn-primary";

        if (delayMS === SETTINGS.DELAY.DEFAULT_MS) {
            btn.disabled = true;
            curBtn = btn;
            data.step = false;
        }

        btn.addEventListener("click", () => {
            curBtn.disabled = false;
            data.step = false;

            btn.disabled = true;
            curBtn = btn;
            data.pause = async () => await pause(delayMS);
        });
    }

    for (const delaySEC of SETTINGS.DELAY.OPTIONS_SEC) {
        const btn = document.createElement("button");
        parent.appendChild(btn);
        btn.textContent = `${delaySEC}sec`;
        btn.className = "btn-primary";

        if (delaySEC*1000 === SETTINGS.DELAY.DEFAULT_MS) {
            btn.disabled = true;
            curBtn = btn;
            data.step = false;
        }

        btn.addEventListener("click", () => {
            curBtn.disabled = false;
            data.step = false;

            btn.disabled = true;
            curBtn = btn;
            data.pause = async () => await pause(delaySEC*1000);
        });
    }
}