export function FormatBytes(intSize, decimals=2) {
    if (intSize === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(intSize) / Math.log(k));

    return parseFloat((intSize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function FormatNumber(intNumber) {
    const number = intNumber.toString(10);
    return number;
}