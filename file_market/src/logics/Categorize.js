const code = ['cpp', 'py', 'c', 'h', 'html', 'js', 'css'];
const image = ['jpg', 'jpeg', 'png'];
const video = ['mp4', 'avi', 'mkv'];
const doc = ['hwp', 'docx', 'ppt', 'pptx', 'pdf'];

export function Categorize(fileList) {
    const extensions = {
        code: 0,
        image: 0,
        video: 0,
        doc: 0,
        etc: 0
    }
    fileList.forEach((file) => {
        const extension = file.title.split(".").at(-1);
        if (code.includes(extension)) {
            extensions['code']++;
        } else if (image.includes(extension)) {
            extensions['image']++;
        } else if (video.includes(extension)) {
            extensions['video']++;
        } else if (doc.includes(extension)) {
            extensions['doc']++;
        } else {
            extensions['etc']++;
        }
    });
    return extensions;
}