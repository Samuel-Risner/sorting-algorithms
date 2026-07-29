export function removeChildren(parent: HTMLElement): void {
    while (parent.firstChild !== null) {
        parent.removeChild(parent.firstChild);
    }
}