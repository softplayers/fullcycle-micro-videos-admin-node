export default {
    displayName: {
        name: 'nestjs',
        color: 'magentaBright',
    },
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "@swc/jest"
    },
    "coverageDirectory": "../coverage",
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    collectCoverageFrom: ['**/*.(t|j)s'],
    testEnvironment: 'node',
    moduleNameMapper: {
        '@fc/micro\\-videos/(.*)$':
            '<rootDir>/../../../node_modules/@fc/micro-videos/dist/$1',
        //'#seedwork/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/domain/index.js',
        // '#seedwork/(.*)$':
        // '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/$1',
        //'#category/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/domain/index.js',
        // '#category/(.*)$':
        // '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/$1',
    },
    // setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
    /* coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
        },
    }, */
};