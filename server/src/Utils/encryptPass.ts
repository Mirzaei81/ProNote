import bcrypt from "bcrypt"

export async  function encryptPass(password:string){
    let  salt =  process.env.MYSALT||10
    let passHashed = await bcrypt.hash(password,salt)
    return passHashed
}

export async  function Matching(password:string,passHashed:string){
    let Matching= await bcrypt.compare(password,passHashed)
    return Matching
}