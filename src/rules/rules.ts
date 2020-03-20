import {CLOSE_ARRAY, CLOSE_BRACE, COLON, COMMA, NUMBER, OPEN_ARRAY, OPEN_BRACE, QUOTE, TEXT} from "../lexer";
import {multiple, optional, OR} from "./variantsOfRules";

export const JSDoc = () => [OPEN_BRACE, OR([id, defs, schema]), multiple([COMMA, OR([JSch, id, defs, schema])]), CLOSE_BRACE];

const id = () => [QUOTE, "$id", QUOTE, COLON, string];
const defs = () => [QUOTE, 'definitions', QUOTE, COLON, OPEN_BRACE, kSch, multiple([COMMA, kSch]), CLOSE_BRACE];
const kSch = () => [string, COLON, OPEN_BRACE, JSch, CLOSE_BRACE];
const JSch = () => [res, multiple([COMMA, res])];
const res = () => [OR([type, title, description, strRes, numRes, objRes, enumRes, refSch])];
const type = () => [QUOTE, 'type', QUOTE, COLON, OR([[typename, multiple([COMMA, typename])], typename])];
const typename = () => [QUOTE, OR(['string', 'integer', 'number', 'boolean', 'null', 'array', 'object']), QUOTE];
const title = () => [QUOTE, 'title', QUOTE, COLON, string];
const description = () => [QUOTE, 'description', QUOTE, COLON, string];

const objRes = () => [OR([prop, req])];
const prop = () => [QUOTE, 'properties', QUOTE, COLON, OPEN_BRACE, kSch, multiple([COMMA, kSch]), CLOSE_BRACE];
const req = () => [QUOTE, 'required', QUOTE, COLON, OPEN_ARRAY, string, multiple([COMMA, string]), CLOSE_ARRAY];

const numRes = () => [OR([min, max])];
const min = () => [QUOTE, 'minimum', QUOTE, COLON, NUMBER];
const max = () => [QUOTE, 'maximum', QUOTE, COLON, NUMBER];

const strRes = () => [OR([minLen, maxLen])];
const minLen = () => [QUOTE, 'minLength', QUOTE, COLON, NUMBER];
const maxLen = () => [QUOTE, 'maxLength', QUOTE, COLON, NUMBER];

const enumRes = () => [QUOTE, 'enum', QUOTE, COLON, OPEN_ARRAY, Jval, multiple([COMMA, Jval]), CLOSE_ARRAY];

const Jval = () => [OR([string, NUMBER, array, object, bool, nullVal])];
const string = () => [QUOTE, TEXT, QUOTE];
const array = () => [OPEN_ARRAY, Jval, multiple([COMMA, Jval]), CLOSE_ARRAY];
const object = () => [OPEN_BRACE, optional([string, COLON, Jval, multiple([COMMA, string, COLON, Jval])]), CLOSE_BRACE];
const bool = () => [OR(['true', 'false'])];
const nullVal = () => [QUOTE, 'null', QUOTE];

const refSch = () => [QUOTE, '$ref', QUOTE, COLON, string];

const schema = () => [QUOTE, '$schema', QUOTE, COLON, string];
