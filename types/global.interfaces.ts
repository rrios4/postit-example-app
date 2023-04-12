// Type for all post
export type PostType = {
    title: string;
    id: string;
    createdAt: string,
    user: {
        name: string,
        image: string
    }
    Comment?: {
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}

// Type for user auth posts
export type AuthPosts = {
    email: string;
    id: string;
    image: string;
    name: string;
    Post: {
        createdAt: string;
        id: string;
        title: string;
        Comment?: {
            createdAt: string;
            id: string;
            postId: string;
            title: string;
            userId: string;''
        }
    }[]
}[]