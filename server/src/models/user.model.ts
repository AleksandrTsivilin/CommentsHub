'use strict';

import {
  AllowNull,
  Column,
  DataType,  
  HasMany,  
  Model,  
  Table,
  Unique,
} from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
   
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        validate: {
            len: [1, 50],
        },
    })
        userName: string; 
        
    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING,
        validate: {
            len: [1, 50],
            isEmail: true, 
        },
    })
        email: string; 
        
        
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
        hashPassword: string; 

    @HasMany(() => Comment, {
        onDelete: 'CASCADE',
        })
        comments: Comment[] | null;
    
}

