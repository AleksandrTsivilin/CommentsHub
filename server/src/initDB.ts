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
      DB_PORT
  } = process.env;

  let dialectOptions;

  if (process.env.NODE_ENV !== 'docker') {
    dialectOptions = {
      ssl: true
    }
  }

  const DB_URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  try {
    const sequelize = new Sequelize(DB_URI, {
      dialect: 'postgres',
      models: [User, Comment],
      dialectOptions
    });
    
    await sequelize.authenticate();
    } catch (error) {
      throw ApiError.internal();
  }
}