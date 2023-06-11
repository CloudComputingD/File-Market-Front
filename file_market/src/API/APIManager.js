import axios from "axios";
import { APIURL } from "./APIurl";

// Signup : Sign Up API
export async function API_Signup(email, name, password) {
    const url = APIURL.USER_CONTROLLER.POST.signup;
    try {
        var response = await axios.post(url, {
            email: email,
            name: name,
            password: password
        });
        return {
            success: true,
            message: "Signup Success"
        }
    } catch(ex) {
        return {
            success: false,
            message: "Signup Fail"
        }
    }
    
}

// login : Sign In API [/login]
export async function API_Signin(email, password) {
    const url = APIURL.USER_CONTROLLER.POST.login;
    try {
        var response = await axios.post(url, {
            email: email,
            password: password
        });
        
        return {
            success: true,
            data: [response.headers.authorization, response.headers["authorization-refresh"]]
        };
    } catch(ex) {
        return {
            success: false
        }
    }
}

// info : Get User Info
export async function API_GetUserInfo(email) {
    const url = APIURL.USER_CONTROLLER.GET.info;
    var response = await axios.get(url, {
        params: {
            email: email
        }
    });
    return response.data;
}

// userlist : Get All Files of User as a List
export async function API_UserFileList(userId) {
    const url = APIURL.FILE.GET.userlist.replace("{userId}", userId);
    var response = await axios.get(url, {
        headers: {
            userId: userId
        }
    });
    return response.data;
}

// fileinfo : Get File Info using File ID
export async function API_GetFileInfo(fileId) {
    const url = APIURL.FILE.GET.fileinfo.replace("{fileId}", fileId);
    var response = await axios.get(url, {
        headers: {
            fileId: fileId
        }
    });
    return response.data;
}

// setfavorite : Set Favorite File
export async function API_SetFileFavorite(fileId, userId) {
    const url = APIURL.FILE.POST.setfavorite.replace('{fileId}', fileId);
    var response = await axios.post(url, {
        headers: {
            userId: userId
        }
    });
    return response.data;
}

// upload : Upload a File to S3
export async function API_UploadFile(userId, file, folderId) {
    const url = APIURL.FILE.POST.upload;
    var response = await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "multipart/form-data",
            userId: userId,
            folderId: folderId
        },
        data: file
    });
    return response;
}

// download : Download File from S3
export async function API_DownloadFile(userId, fileName) {
    const url = APIURL.FILE.GET.download.replace("{fileName}", fileName);
    var response = await axios({
        method: "GET",
        url: url,
        responseType: "blob",
        headers: {
            userId: userId
        }
    });
    return response;
}

// rename : Rename File
export async function API_FileRename(fileId, userId, name) {
    const url = APIURL.FILE.POST.rename.replace("{fileId}", fileId);
    var response = await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "multipart/form-data",
            userId: userId
        },
        data: {
            newName: name
        }
    });
    return response;
}

// movetrash : Move a File to Bin
export async function API_DeleteFile(userId, fileId) {
    const url = APIURL.FILE.POST.movetrash.replace("{fileId}", fileId);
    var response = await axios.post(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// trashdelete : Delete a File from Bin
export async function API_TrashDeleteFile(fileId, userId) {
    const url = APIURL.FILE.DELETE.trashdelete.replace("{fileId}", fileId);
    var response = await axios.delete(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// trashlist : Get All Files in Bin as a List
export async function API_GetDeletedFileList(userId) {
    const url = APIURL.FILE.GET.trashlist.replace("{userId}", userId);
    var response = await axios.get(url);
    return response.data;
}

// restore : Restore a File from Bin
export async function API_RestoreFile(fileId, userId) {
    const url = APIURL.FILE.POST.restore.replace("{fileId}", fileId);
    var response = await axios.post(url, {
        headers: userId
    });
    return response;
}

// create : Create a Folder
export async function API_CreateFolder(userId, folderName) {
    const url = APIURL.FOLDER.POST.create;
    var response = await axios.post(url, {}, {
        params: {
            name: folderName
        },
        headers: {
            "Content-Length": 0,
            userId: userId
        }
    });
    return response;
}

// setfavorite : Set Favorite Folder
export async function API_SetFolderFavorite(folderId, userId) {
    const url = APIURL.FOLDER.POST.setfavorite.replace("{folderId}", folderId);
    var response = await axios.post(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// rename : Rename Folder
export async function API_FolderRename(folderId, userId, name) {
    const url = APIURL.FOLDER.POST.rename.replace("{folderId}", folderId);
    var response = await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "multipart/form-data",
            userId: userId
        },
        data: {
            newName: name
        }
    });
    return response;
}

// movetrash : Move a Folder to Bin
export async function API_DeleteFolder(userId, folderId) {
    const url = APIURL.FOLDER.POST.movetrash.replace('{folderId}', folderId);
    var response = await axios.post(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// restore : Restore a Folder from Bin
export async function API_RestoreFolder(folderId, userId) {
    const url = APIURL.FOLDER.POST.restore.replace("{folderId}", folderId);
    var response = await axios.post(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// trashdelete : Delete a Folder from Bin
export async function API_TrashDeleteFolder(folderId, userId) {
    const url = APIURL.FOLDER.DELETE.trashdelete.replace("{folderId}", folderId);
    var response = await axios.delete(url, {
        headers: {
            userId: userId
        }
    });
    return response;
}

// trashlist : Get All Folders in Bin as a List
export async function API_GetDeletedFolderList(userId) {
    const url = APIURL.FOLDER.GET.trashlist.replace("{userId}", userId);
    var response = await axios.get(url);
    return response.data;
}

// folderlist : Get All Folders of User as a List
export async function API_UserFolderList(userId) {
    const url = APIURL.FOLDER.GET.folderlist.replace("{userId}", userId);
    var response = await axios.get(url, {
        headers: {
            userId: userId
        }
    });
    return response.data;
}

// subfiles : Get All Files in the Folder as a List
export async function API_FolderFileList(userId, folderId) {
    const url = APIURL.FOLDER.GET.subfiles.replace('{folderId}', folderId);
    var response = await axios.get(url, {
        headers: {
            userId: userId
        }
    });
    return response.data;
}

// folderinfo : Get Folder Info using Folder ID
export async function API_GetFolderInfo(folderId) {
    const url = APIURL.FOLDER.GET.folderinfo.replace('{folderId}', folderId);
    var response = await axios.get(url, {
        headers: {
            folderId: folderId
        }
    });
    return response.data;
}

// totalsize : Get Total Used Size
export async function API_TotalSize(userId) {
    const url = APIURL.FILE.GET.totalsize.replace("{userId}", userId);
    var response = await axios.get(url, {
        headers: {
            userId: userId
        }
    });
    return response.data;
}

export async function API_OAUTH() {
    const url = "http://localhost:8080/oauth2/authorization/google";
    var response = await axios.post(url, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
    return response;
}