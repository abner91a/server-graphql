import { BadRequestException } from "@nestjs/common/exceptions";



import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy,VerifiedCallback } from 'passport-jwt';

import JWT from 'jsonwebtoken';
import { JwtService } from "@nestjs/jwt";


export const fileNamer = ( req: any, file: Express.Multer.File, callback: Function ) => {
    // req: Express.Request
    // console.log({ file })
    if ( !file ) return callback( new Error('File is empty'), false );
    

    //Todo Revisar la query


    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${req.params.id}.${ fileExtension }`;


    callback(null, fileName );

}
