'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'comments', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        
        homePage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        
        fileUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users', 
            key: 'id',      
          },
          onDelete: 'CASCADE',
        },
        
        parentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'comments', 
            key: 'id',      
          },
          onDelete: 'SET NULL',
        },



        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        }      
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
