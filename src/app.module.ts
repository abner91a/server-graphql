import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriver, } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './schema/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({  isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // introspection: false ,
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
      // ...armor.protect(),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'Lanzamiento'

    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
