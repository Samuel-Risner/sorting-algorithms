import type Data from "../data";
import pause from "../helpers/pause";
import { SETTINGS } from "../settings";

export default function initDelayHTML(parent: HTMLElement, data: Data): void {
    let foundDefault: boolean = false;
    let curBtn: HTMLButtonElement | null = null;

    for (const delayMS of SETTINGS.DELAY.OPTIONS_MS) {
        const btn = document.createElement("button");
        parent.appendChild(btn);
        btn.textContent = `${delayMS}ms`;
        btn.className = "btn-primary";

        if (!foundDefault && delayMS === SETTINGS.DELAY.DEFAULT_MS) {
            btn.disabled = true;
            curBtn = btn;
            foundDefault = true;
        }

        btn.addEventListener("click", () => {
            if (curBtn !== null)
                curBtn.disabled = false;

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

        if (!foundDefault && delaySEC*1000 === SETTINGS.DELAY.DEFAULT_MS) {
            btn.disabled = true;
            curBtn = btn;
            foundDefault = true;
        }

        btn.addEventListener("click", () => {
            if (curBtn !== null)
                curBtn.disabled = false;

            btn.disabled = true;
            curBtn = btn;
            data.pause = async () => await pause(delaySEC*1000);
        });
    }

    if (!foundDefault)
        console.warn("Could not find default delay, check settings.ts");
}