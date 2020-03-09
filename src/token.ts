export interface Token {
    numberOfLine: number;
    numberOfCol: number;
    token: TypeOfToken;
    value?: string | number;
}

export type TypeOfToken = 'OPEN_BRACE' | 'CLOSE_BRACE' | 'QUOTE' | 'COLON' | 'TEXT' | 'OPEN_ARRAY' | 'CLOSE_ARRAY' | 'COMMA' | 'NUMBER';
