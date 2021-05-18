export function isObjectEmpty(object) {
    for (const property in object) {
        return false;
    }
    return true;
}
