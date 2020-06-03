import { Field, Int, ObjectType,ID } from "type-graphql";

@ObjectType()
export class Post {
    @Field(type => ID)
    id:string;
    @Field({nullable:true})
    title:string;
    
    @Field({ nullable: true })
    description:string
}