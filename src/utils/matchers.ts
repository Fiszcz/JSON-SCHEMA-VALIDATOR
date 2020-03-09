const JSONnumberREGEX = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;

export const isJSONnumber = (number: string) => {
    return JSONnumberREGEX.test(number);
};

const theBeginningOfJSONnumberREGEX = /-|[0-9]/;

export const isBeginningOfJSONnumber = (sign: string) => {
    return theBeginningOfJSONnumberREGEX.test(sign);
};

const numberFragmentREGEX = /[0-9]|-|\+|e/;

export const isFragmentOfNumber = (sign: string) => {
    return numberFragmentREGEX.test(sign);
};
