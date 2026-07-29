import bubbleSort from "./algorithms/bubble_sort";

export const SETTINGS = {
    DELAY: {
        OPTIONS_MS: [0, 100, 500],
        OPTIONS_SEC: [1, 5],
        DEFAULT_MS: 500 // should be one of the above delay values
    },

    INPUT: {
        // first value should be smaller than second one
        DEFAULT: [1, 9] as [number, number], // does not have to be included in the values below
        PRESETS: [
            [1, 9],
            [1, 25],
            [1, 50],
            [1, 100]
        ] as [number, number][]
    },
    
    DEFAULT_ALGORITHM: bubbleSort
};