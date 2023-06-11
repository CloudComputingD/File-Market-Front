export const APIURL = {
    // User Control
    USER_CONTROLLER: {
        // POST
        POST: {
            // signup : Sign Up API
            signup: "/signup",
            // login : Sign In API
            login: "/login"
        },
        // GET
        GET: {
            // info : Get User Info
            info: "/info",
        }
    },
    // Folders
    FOLDER: {
        POST: {
            // create : Create a Folder
            create: "/folder",
            // setfavorite : Set Favorite Folder
            setfavorite: "/folder/favorite/{folderId}",
            // rename : Rename Folder
            rename: "/folder/rename/{folderId}",
            // movetrash : Move a Folder to Bin
            movetrash: "/folder/trash/{folderId}",
            // restore : Restore a Folder from Bin
            restore: "/folder/restore/{folderId}"
        },
        GET: {
            // folderinfo : Get Folder Info using Folder ID
            folderinfo: "/folder/{folderId}",
            // subfiles : Get All Files in the Folder as a List
            subfiles: "/folder/filelist/{folderId}",
            // folderlist : Get All Folders of User as a List
            folderlist: "/folder/list/{userId}",
            // search : Search Folder with Folder Name
            search: "/folder/search",
            // trashlist : Get All Folders in Bin as a List
            trashlist : "/folder/trash/list/{userId}",
        },
        DELETE: {
            // trashdelete : Delete a Folder from Bin
            trashdelete: "/folder/delete/{folderId}",
        }
    },
    // Files
    FILE: {
        POST: {
            // upload : Upload a File to S3
            upload: "/file/file-market-test-bucket/upload",
            // setfavorite : Set Favorite File
            setfavorite: "/file/favorite/{fileId}",
            // rename : Rename File
            rename: "/file/rename/{fileId}",
            // movetrash : Move a File to Bin
            movetrash: "/file/trash/{fileId}",
            // restore : Restore a File from Bin
            restore: "/file/restore/{fileId}",
        },
        GET: {
            // s3list : Get All Files in S3 as a List
            s3list: "/file/file-market-test-bucket",
            // download : Download File from S3
            download: "file/file-market-test-bucket/download/{fileName}",
            // fileinfo : Get File Info using File ID
            fileinfo: "/file/{fileId}",
            // userlist : Get All Files of User as a List
            userlist: "/file/list/{userId}",
            // search : Search File with File Name
            search: "/file/search",
            // trashlist : Get All Files in Bin as a List
            trashlist: "/file/trash/list/{userId}",
            // totalsize : Get Total Used Size
            totalsize: "/file/size/{userId}"
        },
        DELETE: {
            // s3delete : Delete a File from S3
            s3delete: "/file/file-market-test-bucket/{fileName}",
            // trashdelete : Delete a File from Bin
            trashdelete: "/file/delete/{fileId}",
        }
    }
}