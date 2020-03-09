import {Token} from "./token";
import chalk from "chalk";

export const grammarParser = (tokens: Token[]) => {

    console.log(chalk.green('Start grammar validation'));

    const result = JSDoc(tokens);
    
    if (result) {
        console.log(chalk.green('End grammar validation'));
        console.log(chalk.green('✓ - everything is valid'));
    } else {
        console.error(chalk.red('Invalid grammar!'));
    }

};
