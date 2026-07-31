import valueToHeight from "../helpers/valueToHeight";

export default class Sortable {

    private container: HTMLDivElement;
    private elements: HTMLButtonElement[];
    private data: number[];

    constructor(parent: HTMLElement, data: number[]) {
        this.container = document.createElement("div");
        parent.appendChild(this.container);
        this.container.className = "flex flex-row gap-2 items-end";

        this.data = data;

        this.elements = [];

        data.forEach((value, index) => {
            const e = document.createElement("button");
            this.elements.push(e);
            this.container.appendChild(e);
            
            e.disabled = true;
            e.className = "flex";
            e.style.order = `${index}`;
            e.style.height = valueToHeight(value);
            e.style.width = "20px";
            e.className = "visual";
        })
    }

    public select(index: number): void {
        this.elements[index].disabled = false;
    }

    public unselect(index: number): void {
        this.elements[index].disabled = true;
    }

    public switch(index1: number, index2: number) {
        const tempEl: HTMLButtonElement = this.elements[index1];
        this.elements[index1] = this.elements[index2];
        this.elements[index2] = tempEl;

        const tempData: number = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = tempData;

        this.elements[index1].style.order = `${index1}`;
        this.elements[index2].style.order = `${index2}`;
    }

    private output(): void {
        let o = "";

        for (const d of this.data) {
            o += `${d} `;
        }

        console.log(o);
    }

    public shuffle() {
        let r1: number;
        let r2: number;

        for (let i = 0; i < 100 * this.elements.length; i++) {
            r1 = Math.floor(Math.random() * this.elements.length);
            r2 = Math.floor(Math.random() * this.elements.length);

            this.switch(r1, r2);
        }

        this.output();
    }

    public at(index: number): number {
        return this.data[index];
    }

    public len(): number {
        return this.data.length;
    }

    public move(from: number, to: number): void {
        if (from === to)
            return;

        const [e] = this.elements.splice(from, 1);
        const [d] = this.data.splice(from, 1);

        this.elements.splice(to, 0, e);
        this.data.splice(to, 0, d);

        for (let i = Math.min(from, to); i < this.elements.length; i++) {
            this.elements[i].style.order = `${i}`;
        }
    }
}