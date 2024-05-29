export function findNullKeysRecursive(obj) {
    const nullKeys = [];
    function checkProperties(currentObj, currentPath = '') {
        for(const key in currentObj){
            if (currentObj.hasOwnProperty(key)) {
                const fullPath = currentPath ? `${currentPath}.${key}` : key;
                const value = currentObj[key];
                if (value === null || value === undefined) {
                    nullKeys.push(fullPath);
                } else if (typeof value === 'object') {
                    // Recurse into nested objects
                    checkProperties(value);
                }
            }
        }
    }
    checkProperties(obj);
    return nullKeys;
}

//# sourceMappingURL=checkForNull.js.map