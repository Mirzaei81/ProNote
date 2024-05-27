export type TreeNode<T = any> = T | Array<TreeNode<T>> | { [key: string]: TreeNode<T> };
export function findNullKeysRecursive(obj:TreeNode) {
    const nullKeys:string[] = [];
    function checkProperties(currentObj:TreeNode, currentPath = '') {
        for (const key in currentObj) {
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