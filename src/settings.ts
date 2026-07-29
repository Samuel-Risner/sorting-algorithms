import bubbleSort from "./algorithms/bubble_sort";

export const SETTINGS = {
    DELAY: {
        OPTIONS_MS: [100, 500],
        OPTIONS_SEC: [1, 5],
        DEFAULT_MS: 500 // should be one of the above delay values
    },
    INPUT: {
        DEFAULT: [1, 9] as [number, number],
        PRESETS: [
            [0, 9],
            [0, 50],
            [0, 100],
            [1, 9],
            [1, 50],
            [1, 100]
        ] as [number, number][]
    },
    DEFAULT_ALGORITHM: bubbleSort
};