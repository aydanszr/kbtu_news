import { Post } from './post';

export class Profile {
    username: string;
    desc: string = "Ничего.";
    posts: Post[];
    liked: Post[];
}
