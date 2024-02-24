export interface Author {
    id: number;
    email: string;
    username: string;
    name: string | null;
    authUID: string;
    avatarPath: string | null;
}

export interface Comment {
    id: number;
    text: string;
    postId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
}