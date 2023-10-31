import type { Request } from 'express';
import { PageOptions } from '../constants';

export const getPaginationOptions = (req: Request): {offset: number, limit?: number} => {
    const { page, limit } = req.query;

    const initialLimit = Number(limit) || PageOptions.PAGE_LIMIT;
    const initialPage = Number(page) || 1;

    const offset = initialPage * initialLimit - initialLimit; 
    return {offset, limit: initialLimit}
  
  };