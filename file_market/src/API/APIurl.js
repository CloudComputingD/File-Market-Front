const serverIP = "http://localhost:8080/";

export const APIURL = {
    // User Control
    USER_CONTROLLER: {
        // POST
        POST: {
            // join : Sign Up API
            join: serverIP + "join"
        },
        // GET
        GET: {
            
        }
    },
    // Folders
    FOLDER: {
        POST: {
            // create : Create a Folder
            create: serverIP + "folder",
            // setfavorite : Set Favorite Folder
            setfavorite: serverIP + "/folder/favorite/{folderId}",
            // rename : Rename Folder
            rename: serverIP + "/folder/rename/{folderId}",
            // movetrash : Move a Folder to Bin
            movetrash: serverIP + "/folder/trash/{folderId}",
            // restore : Restore a Folder from Bin
            restore: serverIP + "/folder/value=/restore/{folderId}"
        },
        GET: {
            // folderinfo : Get Folder Info using Folder ID
            folderinfo: serverIP + "/folder/{folderId}",
            // subfiles : Get All Files in the Folder as a List
            subfiles: serverIP + "/folder/fileList/{folderId}",
            // folderlist : Get All Folders of User as a List
            folderList: serverIP + "/folder/list/{userId}",
            // search : Search Folder with Folder Name
            search: serverIP + "/folder/search",
            // trashlist : Get All Folders in Bin as a List
            trashlist : serverIP + "/folder/value=/trash/list/{userId}",
        },
        DELETE: {
            // trashdelete : Delete a Folder from Bin
            trashdelete: serverIP + "/folder/value=/delete/{fodlerId}",
        }
    },
    // Files
    FILE: {
        POST: {
            // upload : Upload a File to S3
            upload: serverIP + "/file/{bucketName}/upload",
            // setfavorite : Set Favorite File
            setfavorite: serverIP + "/file/{bucketName}/upload",
            // rename : Rename File
            rename: serverIP + "/file/{bucketName}/upload",
            // movetrash : Move a File to Bin
            movetrash: serverIP + "/file/trash/{fileId}",
            // restore : Restore a File from Bin
            restore: serverIP + "/file/trash/{fileId}",
        },
        GET: {
            // s3list : Get All Files in S3 as a List
            s3list: serverIP + "/file/{bucketName}",
            // download : Download File from S3
            download: serverIP + "file/{bucketName}/download/{fileName}",
            // fileinfo : Get File Info using File ID
            fileinfo: serverIP + "/file/{fileId}",
            // list : Get All Files of User as a List
            userlist: serverIP + "/file/list/{userId}",
            // search : Search File with File Name
            search: serverIP + "/file/search",
            // trashlist : Get All Files in Bin as a List
            trashlist: serverIP + "/file/value=/trash/list/{userId}",
        },
        DELETE: {
            // s3delete : Delete a File from S3
            s3delete: serverIP + "/file/{bucketName}/{fileName}",
            // trashdelete : Delete a File from Bin
            trashdelete: serverIP + "/file/value=/delete/{fileId}",
        }
    }
}