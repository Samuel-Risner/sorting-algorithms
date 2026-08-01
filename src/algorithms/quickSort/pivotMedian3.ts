import type Sortable from "../../dataVisualization/sortable";

export default function pivotMedian3(sortable: Sortable, start: number, end: number): number {
    if (end-start < 2)
        return end;

    let middle = start + Math.floor((end-start)/2);

    if ((sortable.at(middle) > sortable.at(start) && sortable.at(middle) < sortable.at(end)) || sortable.at(middle) < sortable.at(start) && sortable.at(middle) > sortable.at(end))
        return middle;

    if ((sortable.at(start) > sortable.at(middle) && sortable.at(start) < sortable.at(end)) || (sortable.at(start) < sortable.at(middle) && sortable.at(start) > sortable.at(end)))
        return start;

    return end;
}