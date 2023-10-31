export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string){
        super();
        this.status = status
        this.message = message
    }

    static notFound(message: string){
        return new ApiError(404, message)
    }

    static unauthorize() {
        return new ApiError(401, 'User in unauthorized');
    }
    
    static badRequest(message: string){
        return new ApiError(400, message)
    }

    static internal(){
        return new ApiError(500, 'Site is not available. Try again late.')
    }

    static forbidden(message: string){
        return new ApiError(403, message)
    }
}