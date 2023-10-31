import { ErrorHandlerMiddleware } from "../types/Controller";

import { ApiError } from "../exceptions/apiError";


export const  errorHandler: ErrorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof ApiError){
        return res.status(err.status).send(JSON.stringify({message: err.message}))
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    });
}
