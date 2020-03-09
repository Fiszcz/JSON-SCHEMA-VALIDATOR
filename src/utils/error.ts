import chalk from "chalk";
import {Token} from "../token";
import {getPlaceInCodeRepresentation} from "./print";

export const error = (errorText: string, token: Token) => {
    console.error(chalk.red(errorText + '  ' + getPlaceInCodeRepresentation(token.numberOfLine, token.numberOfCol)));
    return false;
};
