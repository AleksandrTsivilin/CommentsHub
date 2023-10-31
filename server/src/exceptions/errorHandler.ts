import { ApiError } from "./apiError";

export const errorHandler = (error: any) => {
    switch (true) {
        case error instanceof ApiError:
            throw new ApiError(error.status, error.message);

        default: 
            throw ApiError.internal();
    }
}