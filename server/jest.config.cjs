const fs =require("fs")
const config = JSON.parse(fs.readFileSync(`./.swcrc`, 'utf-8'))

module.exports = {
    rootDir: process.cwd(),
    moduleFileExtensions: ['ts', 'tsx','js'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest',{...config}],
      },
}