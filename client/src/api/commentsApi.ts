import { AxiosResponse } from "axios";
import { CommentInfo } from "../types/commentInfo";
import client from ".";
import { QueryAttrs } from "../types/queryAttrs";
import { queryBuilder } from "../helpers/queryBuilder";


interface ResponseData {
  count: number,
  rows: CommentInfo[]
}


export const getComments = async ({...queryAttrs}: QueryAttrs): Promise<AxiosResponse<ResponseData>> => {
  const queryString = queryBuilder({...queryAttrs});
  
  return await client.get<ResponseData>(`${queryString}`);
};

export const create = async (data: FormData): Promise<AxiosResponse<CommentInfo>> => {
  return await client.post<CommentInfo>('/', data);
};

export const getById = async (id: number): Promise<AxiosResponse<CommentInfo>> => {
  return await client.get<CommentInfo>(`/${id}`);
}
