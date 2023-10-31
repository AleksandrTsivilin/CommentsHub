'use strict';

import { Comment } from '../models/comment.model';
import { ApiError } from '../exceptions/apiError';
import { errorHandler } from '../exceptions/errorHandler';
import { User } from '../models/user.model';
import { normalize } from 'path';


class CommentsService {
    private static instance: CommentsService | null = null;

    // eslint-disable-next-line no-empty-function
    private constructor() {}

    static getInstance(): CommentsService {
        if (!CommentsService.instance) {
        CommentsService.instance = new CommentsService();
        }

        return CommentsService.instance;
    }

    async create ({...commentData} ) {
        try {
            const comment =  await Comment.create({...commentData});
            const {updatedAt, ...normalizedComment} = comment;
            return normalizedComment;
        } catch (e: any) {
            errorHandler(e);
        }
    }

    async get ({...options}) {
        try {
            return await Comment.findAndCountAll(
                {...options, include: [{model: User, as: 'user'}]}                
            )

        } catch (e: any) {
            errorHandler(e);
        }
    }
  
    async getById (id: number) {
        try {
            return await this.getCommentHierarchy(id);
        } catch (e: any) {
        errorHandler(e);
        }
    }

    private async getCommentHierarchy (id: number)  {
        const comment = await Comment.findByPk(id, {
          include: [
            {
              model: Comment,
              as: 'children',
              include: [{
                    model: User,
                    as: 'user'
                }
              ]
            },{
                model: Comment,
                as: 'parent',
                include: [{
                    model: User,
                    as: 'user'
                }]
            }, {
                model: User,
                as: 'user'
            }
          ],
        });
      
        if (!comment) {
          return null;
        }
        if (comment.children && comment.children.length > 0) {
            const childComments = [];
            for (const child of comment.dataValues.children) {
                const childComment = await this.getCommentHierarchy(child.id);
                childComments.push(childComment);
            }
            comment.dataValues.children = childComments;
        }
      
        return comment;
    };
}

export const commentsService = CommentsService.getInstance();
