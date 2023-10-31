'use strict';

import { Comment } from '../models/comment.model';
import { ApiError } from '../exceptions/apiError';
import { errorHandler } from '../exceptions/errorHandler';
import { User } from '../models/user.model';


class UserService {
    private static instance: UserService | null = null;

    // eslint-disable-next-line no-empty-function
    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
        UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    async getById (id: number) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw ApiError.notFound('User is not found')
            }
            const { hashPassword, createdAt, updatedAt, ...normalizedUser} = user;
            return normalizedUser;
        } catch (e: any) {
        errorHandler(e);
        }
    }
}

export const userService = UserService.getInstance();
