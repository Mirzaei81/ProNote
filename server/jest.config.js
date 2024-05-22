module.exports = {
    rootDir: process.cwd(),
    moduleFileExtensions: ['ts', 'tsx','js'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
      },
}