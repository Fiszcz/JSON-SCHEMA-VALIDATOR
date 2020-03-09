import {lexer} from "./src/lexer";
import {readFileSync} from 'fs';
import {grammarParser} from "./src/grammarParser";

const jsonSchemaFile = process.argv.slice(2)[0];

const contentOfFile = readFileSync(jsonSchemaFile);

const tokens = lexer(contentOfFile.toString('UTF-8'));

grammarParser(tokens);
