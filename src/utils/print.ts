export const getPlaceInCodeRepresentation = (numberOfLine: number, numberOfCol: number) => {
    return `[${numberOfLine + 1}, ${numberOfCol + 1}] - [line, col]`;
};
