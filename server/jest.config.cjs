const fs =require("fs")
const config = JSON.parse(fs.readFileSync(`./.swcrc`, 'utf-8'))

module.exports = {
    rootDir: "./dist/src/tests",
    moduleFileExtensions: ['ts', 'tsx','js'],
    openHandlesTimeout:5000,
    setupFiles: ["dotenv/config"],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest',{...config}],
      },
}