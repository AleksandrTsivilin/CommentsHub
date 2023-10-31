import { User } from "./user"

export interface CommentInfo {
    id: number,
    user: User,
    text: string,
    children?: CommentInfo[]
    homePage?: string,
    fileUrl?: any,
    createdAt: Date,
    parent?: CommentInfo
}