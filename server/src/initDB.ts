import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './models/user.model';
import { Comment } from './models/comment.model'
import { ApiError } from './exceptions/apiError';

dotenv.config();

export const connectDB = async () => {
    const {
      DB_NAME = '',
      DB_USERNAME = '',
      DB_PASSWORD,
      DB_HOST,
  } = process.env;
  const DB_URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;
  try {
    const sequelize = new Sequelize(DB_URI, {
      dialect: 'postgres',
      models: [User, Comment],
      dialectOptions: {
        ssl: true,
      },
    });
    
    await sequelize.authenticate();
    } catch (error) {
      throw ApiError.internal();
  }
}