import { Request } from "express";

export const getSortOptions = (req: Request) => {
    const {sortBy, orderBy} = req.query;

    if (sortBy === 'date' ) {
        return {
            order: orderBy ?  [['createdAt', 'DESC']] : [['createdAt', 'ASC']]
        }
    }
    
    if (sortBy === 'username') {
        return { 
            order: orderBy ? [['user', 'userName', 'DESC']] : [['user', 'userName', 'ASC']] 
        }
    }
    
    if (sortBy === 'email') {
        return { 
            order: orderBy ? [['user', sortBy, 'DESC']] : [['user', sortBy, 'ASC']] 
        }
    }
    
    return {order: [['createdAt', 'DESC']]}
    
}