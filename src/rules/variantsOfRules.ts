export const optional = (rule: any) => {
    return {
        variant: 'optional',
        rule,
    }
};

export const multiple = (rule: any) => {
    return {
        variant: 'multiple',
        rule,
    }
};

export const OR = (rules: any[]) => {
    return {
        variant: 'OR',
        rules: rules.map(rule => Array.isArray(rule) ? rule : [rule]),
    }
};
