import type { Request } from "express"

export const getQueryOptions = (req: Request) => {
    return {where: {parentId: null}}
}