import { QueryAttrs } from "../types/queryAttrs";

export const queryBuilder = ({...queryAttrs}: QueryAttrs) => {  
    const queryItems: string[] = [];
  
    for (const key in queryAttrs) {  
      if (!queryAttrs[key]) {
        continue;
      }

      queryItems.push(`${key}=${queryAttrs[key]}`);
  
    } 
    return queryItems.length ? `?${queryItems.join('&')}` : '';
  }