import { ApiError } from "../exceptions/apiError";

export const  validateXHTML = (message: string) => {
    const tagRegex = /<[^>]*>/g;
  
    const openTags: string[] = [];
    try {
        message.replace(tagRegex, (match: string) => {
            if (match.startsWith('</')) {
                const openingTag = openTags.pop();
                if (!openingTag || openingTag !== match.slice(2, -1)) {
                    throw ApiError.badRequest(`text invalid: mismatch tags ${openingTag}-${match.slice(2, -1)}`);
                }
            } else if (match.endsWith('/>')) {
            } else {
                openTags.push(match.slice(1, -1).split(' ')[0]);
            }
            return ''
        });
        return openTags.length === 0;
    } catch (e) {
        return false;
    }  
}