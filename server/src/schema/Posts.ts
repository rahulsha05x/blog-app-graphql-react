import { Field, Int, ObjectType,ID } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
export default class Posts {
    @Field()
    posts:[Post]

}