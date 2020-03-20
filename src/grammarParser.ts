import {Token} from "./token";
import chalk from "chalk";
import {error} from "./utils/error";
import {CLOSE_ARRAY, CLOSE_BRACE, COLON, COMMA, NUMBER, OPEN_ARRAY, OPEN_BRACE, QUOTE, TEXT} from "./lexer";
import {JSDoc} from "./rules/rules";
import {isFunction} from "./utils/isFunction";
import {getPlaceInCodeRepresentation} from "./utils/print";

export const grammarParser = (tokens: Token[]) => {

    console.log(chalk.green('Start grammar validation'));

    grammarAnalyzer(tokens);

    console.log(chalk.green('End grammar validation'));
    console.log(chalk.green('✓ - everything is valid'));

};

export const grammarAnalyzer = (tokens: Token[]) => {
    const enterRules = JSDoc();

    analyze(tokens, 0, enterRules, false);
};

let levelOfRules = 0;
const analyze = (arrayOfTokens: Token[], position: number, rules: any[], optional: boolean) => {
    let analyzedTokens = 0;
    for (let rule of rules) {
        if (isFunction(rule)) {
            console.log('|  '.repeat(levelOfRules) + chalk.yellowBright(rule.name));
            levelOfRules += 1;
            const analyzedTokensByRule = analyze(arrayOfTokens, position + analyzedTokens, rule(), optional);
            levelOfRules -= 1;
            if (optional && analyzedTokensByRule === false) {
                console.log('|  '.repeat(levelOfRules) + chalk.redBright(rule.name));
                return false;
            }
            analyzedTokens += analyzedTokensByRule as number;
            console.log('|  '.repeat(levelOfRules) + chalk.greenBright(rule.name) + ' -> ' + arrayOfTokens[position + analyzedTokens].token + ' ' + getPlaceInCodeRepresentation(arrayOfTokens[position + analyzedTokens].numberOfLine, arrayOfTokens[position + analyzedTokens].numberOfCol));
        } else if (typeof rule === 'object' && rule.variant === 'optional') {
            const analyzedTokensByRule = analyze(arrayOfTokens, position + analyzedTokens, rule.rule, true);
            if (analyzedTokensByRule === false)
                continue;
            analyzedTokens += analyzedTokensByRule as number;
        } else if (typeof rule === 'object' && rule.variant === 'multiple') {
            let analyzedTokensByRule = true;
            while (analyzedTokensByRule) {
                const analyzedTokensByRule = analyze(arrayOfTokens, position + analyzedTokens, rule.rule, true);
                if (analyzedTokensByRule === false)
                    break;
                analyzedTokens += analyzedTokensByRule as number;
            }
        } else if (typeof rule === 'object' && rule.variant === 'OR') {
            let analyzedTokensByRule: boolean | number = 0;
            for (let ruleOfOR of rule.rules) {
                analyzedTokensByRule = analyze(arrayOfTokens, position + analyzedTokens, ruleOfOR, true);
                if (analyzedTokensByRule)
                    break;
            }
            if (analyzedTokensByRule)
                analyzedTokens += analyzedTokensByRule as number;
            else {
                if (optional) return false;
                else {
                    error('Invalid schema, after ' + arrayOfTokens[position + analyzedTokens - 1].token + ' token we need some value', arrayOfTokens[position + analyzedTokens - 1]);
                    process.exit();
                }
            }
        } else if ([OPEN_BRACE, CLOSE_BRACE, COLON, TEXT, NUMBER, COMMA, QUOTE, OPEN_ARRAY, CLOSE_ARRAY].includes(rule)) {
            if (rule !== arrayOfTokens[position + analyzedTokens].token) {
                if (optional) return false;
                else {
                    error('Expected ' + rule, arrayOfTokens[position + analyzedTokens]);
                    process.exit();
                }
            } else analyzedTokens += 1;
        } else if (rule !== arrayOfTokens[position + analyzedTokens].value) {
            if (optional) return false;
            else {
                error('Expected TEXT token with value: ' + rule + ' , instead ' + arrayOfTokens[position + analyzedTokens].value, arrayOfTokens[position + analyzedTokens]);
                process.exit();
            }
        } else analyzedTokens += 1;
    }
    return analyzedTokens;
};
