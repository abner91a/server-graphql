// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { BookfeaturesService } from './bookfeatures.service';
// import { Bookfeature } from './entities/bookfeature.entity';


// @Resolver(() => Bookfeature)
// export class BookfeaturesResolver {
//   constructor(private readonly bookfeaturesService: BookfeaturesService) {}


//   @Query(() => [Bookfeature], { name: 'bookfeatures' })
//   findAll() {
//     return this.bookfeaturesService.findAll();
//   }

// //   @Query(() => Bookfeature, { name: 'bookfeature' })
// //   findOne(@Args('id', { type: () => Int }) id: number) {
// //     return this.bookfeaturesService.findOne(id);
// //   }

// }
