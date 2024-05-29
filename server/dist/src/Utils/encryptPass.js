import bcrypt from "bcrypt";
export async function encryptPass(password) {
    let salt = process.env.MYSALT || 10;
    let passHashed = await bcrypt.hash(password, salt);
    return passHashed;
}
export async function Matching(password, passHashed) {
    let Matching = await bcrypt.compare(password, passHashed);
    return Matching;
}

//# sourceMappingURL=encryptPass.js.map