
export interface Post {
    id:string,
    title:string,
    description:string
}

export class Post implements Post {
    constructor(public id:string,public title:string,public description:string) {}
}
