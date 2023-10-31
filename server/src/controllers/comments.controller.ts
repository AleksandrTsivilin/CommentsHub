'use strict';
import { ApiError } from "../exceptions/apiError";
import { Controller, RequestWithUserData } from "../types/Controller";
import { Comment } from "../models/comment.model";
import { validationResult } from 'express-validator/src/validation-result.js';
import { commentsService } from "../services/comments.service";
import { getPaginationOptions } from "../helpers/getPaginationOptions";
import { getQueryOptions } from "../helpers/getQueryOptions";
import { fileHandler } from "../services/fileService";
import { getSortOptions } from "../helpers/getSortOptions";
import { broadCast } from "../server";
import { User } from "../models/user.model";
import { userService } from "../services/user.service";
import { validateXHTML } from "../helpers/htmlValidator";


class CommentsController {
    private static instance: CommentsController | null = null;

    // eslint-disable-next-line no-empty-function
    private constructor() {}

    static getInstance() {
      if (!CommentsController.instance) {
          CommentsController.instance = new CommentsController();
      }

      return CommentsController.instance;
    }

    get: Controller = async (req, res, next) => {
        try {
          const paginationOptions = getPaginationOptions(req);
          const queryOptions = getQueryOptions(req);
          const sortOptions = getSortOptions(req);
          const comments = await commentsService.get(
            {...paginationOptions, ...queryOptions, ...sortOptions}
          );
          return res.status(200).send(comments);
        } catch (e: any) {
            next(e);
        }
      

    }

    getById: Controller = async (req, res, next) => {
        try {
          const id = Number(req.params.id);

          if (!id) {
            throw ApiError.notFound('comment not found'); 
          }

          const comment = await commentsService.getById(id);
          res.status(200).send(comment);
        } catch (e: any) {
            next(e);
        }
    }
    
    create: Controller = async (req, res, next) => {
      const {captcha, ...commentData } = req.body;
      const {userId}: RequestWithUserData = req; 
      try {        
        if (!userId) {
          throw ApiError.internal();
        }
        const user = await userService.getById(userId);

        if (!validateXHTML(commentData.text)) {
          throw ApiError.badRequest('Text invalid');
        }    
        
        let filePath;
        if (req.files) {
          filePath = await fileHandler(req.files);
        } 

        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
          const errorsInfo = errors.array().map(err => err.msg).join('; ');
          throw ApiError.badRequest(`Data invalid: ${errorsInfo}`);
        }

        const comment = await commentsService.create({...commentData, fileUrl: filePath, userId});   
      
        broadCast({...comment?.dataValues, user});     
        return res.status(201).send(comment);   

      } catch (e: any) {
          next(e);
      }
    }
}

export const commentsController = CommentsController.getInstance();