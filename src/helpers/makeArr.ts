export default function makeArr(fromTo: [number, number]): number[] {
    const arr: number[] = [];

    for (let i = fromTo[0]; i <= fromTo[1]; i++) {
        arr.push(i);
    }

    return arr;
}