import { registerEnumType } from "@nestjs/graphql";


export enum ValidRoles {

    admin = 'admin',
    editor = 'editor',
    user = 'user',


}

registerEnumType(ValidRoles, {   name: 'ValidRoles' ,description: 'Esto son los roles permitido para la app sujeto a cambio :)'  })