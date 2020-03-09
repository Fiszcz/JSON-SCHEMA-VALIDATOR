import {Token} from "../token";
import {error} from "../utils/error";

export const JSDoc = (tokens: Token[]) => {

    const firstElement = tokens.shift();
    const lastElement = tokens.pop();

    if (firstElement?.token !== 'OPEN_BRACE') {
        return error('Brakuje otwarcia pliku JSON: "{"', firstElement!);
    }
    if (lastElement?.token !== 'CLOSE_BRACE') {
        return error('Brakuje zamkniecia pliku JSON: "}"', lastElement!);
    }



};
