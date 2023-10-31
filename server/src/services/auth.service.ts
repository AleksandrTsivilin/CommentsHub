'use strict';

import { User } from '../models/user.model';
import { ApiError } from '../exceptions/apiError';
import { errorHandler } from '../exceptions/errorHandler';
import { generateToken } from './token.service';
import bcrypt from 'bcrypt';


class AuthService {
  private static instance: AuthService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  async register ({...userData} ) {
    try {
        const candidate = await User.findOne({where: { email: userData.email }});
        
        if (candidate) {
            throw ApiError.badRequest('The email address is already associated with an existing account');
        }
        const hashedPassword = await this.getHashPassword(userData.password);
        const registeredUser = await User.create({userName: userData.userName, email: userData.email, hashPassword: hashedPassword});
        const { hashPassword, updatedAt, createdAt, ...registeredUserNormalized } = registeredUser.dataValues;

        return generateToken(registeredUserNormalized);

    } catch (e: any) {
        errorHandler(e);
    }
  }

  async login ({ ...userData }) {
    try {
      const foundedUser = await User.findOne({where: {email: userData.email}});
      if (!foundedUser) {
        throw ApiError.notFound('Either email or password is not correct');
      }
      const isEqualPassword = await bcrypt.compare(userData.password, foundedUser.dataValues.hashPassword);

      if (!isEqualPassword) {
        throw ApiError.notFound('Either email or password is not correct');
      }

      const { hashPassword, updatedAt, createdAt, ...foundedUserNormalized } = foundedUser.dataValues;

      return generateToken(foundedUserNormalized);

    } catch (e: any) {
      errorHandler(e);
    }
  }

  private async getHashPassword (password: string) {
    const salt = 3;
    return bcrypt.hash(password, salt);
  }

}

export const authService = AuthService.getInstance();