import { CommentInfo } from "./commentInfo";



export type CreateCommentAttrs = Omit<CommentInfo, 'id' | 'userName' | 'email'>