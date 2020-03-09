import {Token, TypeOfToken} from "./token";
import {getPlaceInCodeRepresentation} from "./utils/print";
import {isBeginningOfJSONnumber, isFragmentOfNumber, isJSONnumber} from "./utils/matchers";
import chalk from "chalk";

export const lexer = (contentOfFile: string) => {
    const tokens: Token[] = [];

    let numberOfLine = 0;
    let numberOfCol;

    console.log(chalk.green('Start process of lexing analysis'));

    const linesOfCode = contentOfFile.split('\n');
    for (const lineOfCode of linesOfCode) {
        for (numberOfCol = 0; numberOfCol < lineOfCode.length; numberOfCol++) {
            const sign = lineOfCode[numberOfCol];
            switch (sign) {
                case '{':
                    tokens.push(createToken('OPEN_BRACE', numberOfLine, numberOfCol));
                    break;
                case '}':
                    tokens.push(createToken('CLOSE_BRACE', numberOfLine, numberOfCol));
                    break;
                case '[':
                    tokens.push(createToken('OPEN_ARRAY', numberOfLine, numberOfCol));
                    break;
                case ']':
                    tokens.push(createToken('CLOSE_ARRAY', numberOfLine, numberOfCol));
                    break;
                case '"':
                    tokens.push(createToken('QUOTE', numberOfLine, numberOfCol));
                    let textFromBeginningOfText: string = '';
                    let indexOfEndOfText = -1;
                    if (numberOfCol + 1 < lineOfCode.length) {
                        textFromBeginningOfText = lineOfCode.slice(numberOfCol + 1);
                        indexOfEndOfText = textFromBeginningOfText.indexOf('"');
                    }
                    if (indexOfEndOfText === -1) {
                        console.error(chalk.red(`Invalid text - you didn't close quote for text. ${getPlaceInCodeRepresentation(numberOfLine, numberOfCol)}`));
                        process.exit();
                    }
                    tokens.push(createToken('TEXT', numberOfLine, numberOfCol + 1, textFromBeginningOfText.slice(0, indexOfEndOfText)));
                    tokens.push(createToken('QUOTE', numberOfLine, numberOfCol + indexOfEndOfText));
                    numberOfCol += indexOfEndOfText + 1;
                    break;
                case ':':
                    tokens.push(createToken("COLON", numberOfLine, numberOfCol));
                    break;
                case ',':
                    tokens.push(createToken("COMMA", numberOfLine, numberOfCol));
                    break;
                default: {
                    if (isBeginningOfJSONnumber(sign)) {
                        const textFromBeginningOfNumber = lineOfCode.slice(numberOfCol);

                        let indexOfSign = 0;
                        for (; indexOfSign < textFromBeginningOfNumber.length; indexOfSign++) {
                            if (!isFragmentOfNumber(textFromBeginningOfNumber[indexOfSign])) {
                                break;
                            }
                        }

                        const number = textFromBeginningOfNumber.slice(0, indexOfSign);
                        if (isJSONnumber(number)) {
                            tokens.push(createToken("NUMBER", numberOfLine, numberOfCol, Number(number)));
                            numberOfCol += indexOfSign;
                            break;
                        } else {
                            console.error(chalk.red(`Number: "${number}" is not proper number representation. ${getPlaceInCodeRepresentation(numberOfLine, numberOfCol)}`));
                            process.exit();
                        }
                    }
                }
            }
        }

        numberOfLine++;
    }

    console.log(chalk.green('End process of lexing analysis\n'));

    return tokens;
};

const createToken = (tokenType: TypeOfToken, numberOfLine: number, numberOfCol: number, value?: string | number): Token => {
    console.log(chalk.blue(`[${tokenType}]`) + ' - ' + chalk.magenta(`[${numberOfLine}, ${numberOfCol}]` + chalk.white((value ? '   ' + value : ''))));

    return {
        numberOfLine,
        numberOfCol,
        token: tokenType,
        value,
    }
};
