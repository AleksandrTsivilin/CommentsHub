type LocalStorageKeys = 'TOKEN' | 'CONNECTION_ID'

export const localStorageHelper = {
    
    getItem: (key: LocalStorageKeys) => {
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        }
    },

    setItem: (key: LocalStorageKeys, value: any) => {
        const preparedValue = JSON.stringify(value);
        localStorage.setItem(key, preparedValue);
    }    
}