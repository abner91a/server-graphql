import { registerEnumType } from "@nestjs/graphql";


export enum ValidUser_type {
    user  = 1,
    admin  = 2,

}

registerEnumType(ValidUser_type, {   name: 'ValidUser_type' ,description: 'Esto son los roles permitido para la app sujeto a cambio :)'  })