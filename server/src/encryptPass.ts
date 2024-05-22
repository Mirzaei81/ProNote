import bcrypt from "bcrypt"

export default async  function encryptPass(password:string){
    let  salt =  await bcrypt.genSalt(10)
    let passHashed = await bcrypt.hash(password,salt)
}