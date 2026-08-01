import initAlgorithmHTML from "./initHTML/algorithms";
import Data from "./data";
import initDataInputHTML from "./initHTML/dataInput";
import Visualizer from "./dataVisualization/visualizer";
import initDelayHTML from "./initHTML/delay";
import "./index.css";
import pause from "./helpers/pause";

const EL_mainVisual = document.getElementById("main_visual");
const BTN_step = document.getElementById("btn_step") as HTMLButtonElement | null;

const EL_config = document.getElementById("config");

const BTN_lightmode = document.getElementById("btn_lightmode") as HTMLButtonElement | null;
const BTN_darkmode = document.getElementById("btn_darkmode") as HTMLButtonElement | null;

const BTN_inputDefault = document.getElementById("btn_input_default") as HTMLButtonElement | null;
const BTN_inputPreset = document.getElementById("btn_input_preset") as HTMLButtonElement | null;
const BTN_inputCustom = document.getElementById("btn_input_custom") as HTMLButtonElement | null;

const EL_inputDefaultContainer = document.getElementById("container_input_default");
const EL_inputPresetContainer = document.getElementById("container_input_preset");
const EL_inputCustomContainer = document.getElementById("container_input_custom");
const EL_inputCustomTextArea = document.getElementById("textarea_input_custom") as HTMLTextAreaElement | null;
const BTN_applyCustomInput = document.getElementById("btn_apply_custom_input") as HTMLButtonElement | null;

const EL_selectAlgorithm = document.getElementById("select_algorithm");

const EL_delay = document.getElementById("delay");

const BTN_shuffle = document.getElementById("btn_shuffle");
const BTN_start = document.getElementById("btn_start");
const BTN_startDelay = document.getElementById("btn_start_delay");

if (
    EL_mainVisual === null ||
    BTN_step === null ||

    EL_config === null ||

    BTN_lightmode === null ||
    BTN_darkmode === null ||

    BTN_inputDefault === null ||
    BTN_inputPreset === null ||
    BTN_inputCustom === null ||
    
    EL_inputDefaultContainer === null ||
    EL_inputPresetContainer === null ||
    EL_inputCustomContainer === null ||
    EL_inputCustomTextArea === null ||
    BTN_applyCustomInput === null ||

    EL_selectAlgorithm === null ||

    EL_delay === null ||

    BTN_shuffle ===  null ||
    BTN_start === null ||
    BTN_startDelay === null
)
    throw new Error("Could not retrieve element from DOM");

// color scheme
// (button visibility is done by css)

BTN_lightmode.addEventListener("click", () => {
    document.documentElement.classList.add("dark");
    localStorage.colorscheme = "dark";
});

BTN_darkmode.addEventListener("click", () => {
    document.documentElement.classList.remove("dark");
    localStorage.colorscheme = "light";
});

if (localStorage.colorscheme === "dark") {
    document.documentElement.classList.add("dark");
} else if (localStorage.colorscheme === "light") {
    document.documentElement.classList.remove("dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
}


const data = new Data(new Visualizer(EL_mainVisual));

initDataInputHTML(
    BTN_inputDefault, EL_inputDefaultContainer,
    BTN_inputPreset, EL_inputPresetContainer,
    BTN_inputCustom, EL_inputCustomContainer, EL_inputCustomTextArea, BTN_applyCustomInput,
    data
)

initAlgorithmHTML(EL_selectAlgorithm, data);

initDelayHTML(EL_delay, data, BTN_step);

BTN_shuffle.addEventListener("click", () => data.visualizer.shuffleMainVisual() );

BTN_start.addEventListener("click", async () => {
    console.log(data);
    
    EL_config.hidden = true;
    if (data.step)
        BTN_step.hidden = false;
    await data.algorithm(data.sortable, data.pause);
    EL_config.hidden = false;
    BTN_step.hidden = true;
});

BTN_startDelay.addEventListener("click", async () => {
    EL_config.hidden = true;
    if (data.step)
        BTN_step.hidden = false;
    await pause(5000);
    await data.algorithm(data.sortable, data.pause);
    EL_config.hidden = false;
    BTN_step.hidden = true;
});