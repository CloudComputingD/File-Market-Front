export function Categorize(fileList) {
    const extensions = {
        image: 0,
        txt: 0,
        application: 0,
        etc: 0,
    }
    fileList.forEach((file) => {
        const extension = file.extension;
        console.log(extension);
        if (extension.includes('image')) {
            extensions['image']++;
        } else if (extension.includes("txt")) {
            extensions['txt']++;
        } else if (extension.includes('application')) {
            extensions['application']++;
        } else {
            extensions['etc']++;
        }
    });
    return [extensions['image'], extensions['txt'], extensions['application'], extensions['etc']];
}