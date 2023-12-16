module.exports = {
    extends: [
        'standard',
    ],
    globals:
    {
        ElectricField: "readonly",
        Point: "readonly",
        View: "readonly",
        Charge: "readonly",
        Particle: "readonly",
    },
    rules:
    {
        semi: ['error', 'always',],
        'brace-style': ['error', 'allman',],
        indent:
        [
            'error', 4,
            {
                outerIIFEBody: 1,
                FunctionExpression: { body: 1, parameters: 2, },
                SwitchCase: 1,
            },
        ],
        'no-unused-vars': ['off', { vars: 'local', },],
        'no-multi-spaces': ['off',],
        quotes: ["off",],
        "space-before-function-paren": ["off",],
        "comma-dangle":
            [
                "error",
                {
                    arrays: "always",
                    objects: "always",
                    imports: "always",
                    exports: "always",
                    functions: "never",
                },
            ],
        "keyword-spacing":
            [
                "error",
                {
                    overrides:
                    {
                        catch: { after: false, },
                    },
                },
            ],
    },
};
