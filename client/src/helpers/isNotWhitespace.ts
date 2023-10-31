import * as Yup from 'yup';


export const isNotWhitespace = (name: string) => { 
    const errorMessage = `${name} cannot be just whitespace`;
    return Yup.string().test('custom-validation', errorMessage, (value='') => {
        const cleanedValue = value.replace(/<[^>]*>/g, '');
        return !/^\s*$/.test(cleanedValue);
    });
}
