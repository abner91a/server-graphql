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
import { CategoryModule } from './schema/category/category.module';
import { UploadModule } from './api/upload/upload.module';
import { BookModule } from './schema/book/book.module';
import GraphQLJSON, { GraphQLJSONObject  } from 'graphql-type-json';
import { BookfeaturesModule } from './schema/bookfeatures/bookfeatures.module';
import { BookpartsModule } from './schema/bookparts/bookparts.module';


@Module({
  imports: [

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public')
    // }),
    ConfigModule.forRoot({  isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // resolvers: { JSON: GraphQLJSON, JSONObject: GraphQLJSONObject },
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
    CategoryModule,
    UploadModule,
    BookModule,
    BookfeaturesModule,
    BookpartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
