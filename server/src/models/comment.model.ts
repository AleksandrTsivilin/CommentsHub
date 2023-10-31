'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,  
  ForeignKey,  
  HasMany,  
  Model,  
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
   
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
        text: string;
        
    @AllowNull(true)
    @Column({
        type: DataType.STRING,
    })
       fileUrl: string[];
        
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
        userId: number;
    
    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
        targetKey: 'id',
    })
        user: User | null;
        
    @AllowNull(true)
    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
    })
        parentId: number;

    @BelongsTo(() => Comment) 
      parent: Comment 

    @HasMany(() => Comment)
      children: Comment[] | null

}
