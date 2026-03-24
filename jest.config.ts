import type { Config } from "jest";

const config : Config = {
    rootDir: "./",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(gif | ttf | eot | otf | svg | png)$": "<rootDir>/test/mocks/fileMock.js",
    },
    transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library/jest-dom)/)',
  ],
}

export default config;