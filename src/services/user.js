import  prisma  from "@/utils/prisma";
import { hashPassword } from "./auth";
import { id } from "date-fns/locale";

export async function createUser(name, email, password){
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
        id : user.id,
        name : user.name,
        email : user.email
    }

}

export async function getUserByEmail(email, withPassword = false){
  const user = await prisma.user.findUnique({
    where : {email},
    select : {
      id : true,
      name : true,
      email : true,
password : withPassword
    }
  })

  if(!user) {
    return null
  }

  return {
    id : user.id,
    name : user.name,
    email : user.email,
    password : withPassword? user.password : undefined


  }
}

export async function getUserBySessionId(sessionId){
  const user = await prisma.session.findUnique({
    where : {
      id : sessionId
    },
    select : {
      userId : true,
      expiresAt : true
    }
  })
  if(!user) {
    return null
  }
  return user.userId
}

export async function getUserById(userId){
  const user = await prisma.user.findUnique({
    where : {
      id : userId
    },
    select : {
      email : true,
      name : true
    }
  })
  if(!user) {
    return null
  }
  return user.email
}

export async function getFilesByUserId(userid) {
  const files = await prisma.file.findMany({
    where : {
      userId : userid
    },
    select : {
      id : true,
      name : true,
      createAt : true,
      size : true,
      path : true,

    }
  })
 
  return files
}