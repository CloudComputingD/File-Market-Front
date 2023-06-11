import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { STATESNAMING } from "./Configuration/StatesNaing";
import Signin from "./Components/Sign/Signin";
import Signup from "./Components/Sign/Signup";
import Storage from "./Components/Storage/Storage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Bin from "./Components/Bin/Bin";
import Favorite from "./Components/Favorite/Favorite";
import Search from "./Components/Search/Search";
import { Categorize } from "./logics/Categorize";
import * as API_MANAGER from "./API/APIManager";

const dummyFileList = [
  {
    id: 1,
    title: "backtracking실습.py",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 1,
    favorite: false,
    user_id: 1,
    trash: false,
    size: 234213,
  },

  {
    id: 2,
    title: "사운드압축.pdf",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 1,
    favorite: true,
    user_id: 1,
    trash: true,
    size: 34246,
  },

  {
    id: 3,
    title: "공통hw_11주차.pdf",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 1,
    favorite: true,
    user_id: 1,
    trash: false,
    size: 6463452,
  },

  {
    id: 4,
    title: "photos.zip",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 1,
    favorite: true,
    user_id: 1,
    trash: false,
    size: 24235,
  },

  {
    id: 5,
    title: "UIUX_Final_Exam.pdf",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 3,
    favorite: false,
    user_id: 3,
    trash: true,
    size: 235436,
  },

  {
    id: 6,
    title: "denim.pptx",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 4,
    favorite: false,
    user_id: 3,
    trash: true,
    size: 645352,
  },

  {
    id: 7,
    title: "noto_sans_kr.zip",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 4,
    favorite: true,
    user_id: 3,
    trash: false,
    size: 23543547,
  },

  {
    id: 8,
    title: "컴네필기.txt",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 3,
    favorite: false,
    user_id: 3,
    trash: true,
    size: 2342,
  },

  {
    id: 9,
    title: "개인영양평가_김나현.hwp",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 2,
    favorite: true,
    user_id: 2,
    trash: true,
    size: 34543653,
  },

  {
    id: 10,
    title: "1차시보고서.hwp",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    folder_id: 2,
    favorite: false,
    user_id: 2,
    trash: true,
    size: 524234,
  },

  {
    id: 11,
    title: "3D 입체음향 시스템.pdf",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: null,
    favorite: true,
    user_id: 2,
    trash: false,
    size: 43402,
  },

  {
    id: 12,
    title: "김민석 바보.pdf",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 1,
    favorite: true,
    user_id: 2,
    trash: false,
    size: 42402,
  },
];

const dummyFolderList = [
  {
    id: 1,
    title: "folder1",
    created_time: new Date().getTime(),
    deleted_time: null,
    favorite: true,
    user_id: 1,
    trash: false,
    size: 524234,
  },

  {
    id: 2,
    title: "folder2",
    created_time: new Date().getTime(),
    deleted_time: new Date().getTime(),
    favorite: false,
    user_id: 2,
    trash: true,
    size: 524234,
  },

  {
    id: 3,
    title: "folder3",
    created_time: new Date().getTime(),
    deleted_time: null,
    favorite: false,
    user_id: 3,
    trash: false,
    size: 524234,
  },

  {
    id: 4,
    title: "folder4",
    created_time: new Date().getTime(),
    deleted_time: null,
    favorite: false,
    user_id: 3,
    trash: false,
    size: 524234,
  },
];

function App() {
  const [colorTheme, setColorTheme] = useState(STATESNAMING.COLORTHEME.LIGHTTHEME);
  const [authKey, setAuthKey] = useState(null);
  const [authRefreshKey, setAuthRefreshKey] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [authDone, setAuthDone] = useState(false);
  const [searchKey, setSearchKey] = useState(null);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const [searchedFolders, setSearchedFolders] = useState([]);
  const [files, setFiles] = useState([]); // file list
  const [folders, setFolders] = useState([]); // folder list
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [deletedFolders, setDeletedFolders] = useState([]);
  const [favoriteFiles, setFavoriteFiles] = useState([]);
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  const [favChange, setFavChange] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState(null); // 더블클릭한 folder's id
  const [currentFolderName, setCurrentFolderName] = useState("My Storage");
  const [extensionCategory, setExtensionCategory] = useState({});

  function handleFavChange() {
    setFavChange(prev => prev + 1);
  }

  async function handleAuth(auth, refresh, email) {
    setAuthKey(auth);
    setAuthRefreshKey(refresh);
    const result = await API_MANAGER.API_GetUserInfo(email);
    setUserInfo(result);
    localStorage.setItem('userInfo', JSON.stringify(result));
    // makeFileList(result.id);
    setAuthDone(true);
  }

  // useEffect(() => {
  //   if (authDone) {
  //     makeFileList(userInfo.id);
  //     setAuthDone(false);
  //   }
  // }, [authDone])

  function getDeletedList() {
    setSearchKey(null);
    const arr1 = [];
    const arr2 = [];
    dummyFileList.forEach((file) => {
      if (file.deleted_time !== null) {
        arr1.push(file);
      }
    });
    dummyFolderList.forEach((folder) => {
      if (folder.deleted_time !== null) {
        arr2.push(folder);
      }
    });
    setDeletedFiles(arr1);
    setDeletedFolders(arr2);
  }

  function getFavoriteList() {
    const arr1 = [];
    const arr2 = [];
    dummyFileList.forEach((file) => {
      if (file.favorite === true) {
        arr1.push(file);
      }
    });
    dummyFolderList.forEach((folder) => {
      if (folder.favorite === true) {
        arr2.push(folder);
      }
    });
    setFavoriteFiles(arr1);
    setFavoriteFolders(arr2);
  }

  function handleChangeColorTheme() {
    if (colorTheme === STATESNAMING.COLORTHEME.LIGHTTHEME) {
      setColorTheme(STATESNAMING.COLORTHEME.DARKTHEME);
    } else if (colorTheme === STATESNAMING.COLORTHEME.DARKTHEME) {
      setColorTheme(STATESNAMING.COLORTHEME.LIGHTTHEME);
    }
  }

  function handleSearch(key) {
    console.log(key);
    localStorage.setItem("searchKey", key);
    setSearchKey(key);
  }

  const handleFileSelect = (fileId) => {
    setSelectedFolder(null);
    setSelectedFile(fileId);
  };

  const handleFolderSelect = (folderId) => {
    setSelectedFile(null);
    setSelectedFolder(folderId);
  };

  const handleFolderDoubleClick = (folder, navigate) => {
    setCurrentFolderId(folder.id);
    setCurrentFolderName(folder.title);
    navigate('/storage');
  };

  // 선택된 폴더의 하위 파일 & 폴더 필터링
  const filteredFiles = dummyFileList.filter(
    (file) => file.id == currentFolderId
  );
  const filteredFolders = dummyFolderList.filter((folder) =>
    currentFolderId ? folder.id == currentFolderId : folder
  );

  async function handleNewFolder() {
    const folderName = prompt("Enter folder name!");
    if (folderName) {
      const result = await API_MANAGER.API_CreateFolder(localStorage.getItem('userInfo').split(',')[0].split(":")[1], folderName);
      console.log(result);
      // const newFolder = {
      //   id: Date.now(), // 고유한 id 생성. (임시로 현재 시간 사용)
      //   title: folderName,
      //   created_time: new Date().getTime(),
      //   deleted_time: null,
      //   favorite: false,
      //   user_id: 1,
      //   trash: false,
      //   size: 34235,
      // };
      // setFolders((prevFolders) => [...prevFolders, newFolder]); // 새로운 폴더 추가
    }
  };

  const handleRename = (targetFolder, targetFile) => {
    const newTitle = prompt("Enter new name!");
    if (targetFolder) {
      const updatedFolders = folders.map((folder) => {
        if (folder.id === targetFolder.id) {
          return { ...folder, title: newTitle };
        }
        return folder;
      });
      setFolders(updatedFolders);
      setSelectedFolder(null);
      alert("folder updated");
    }
    if (targetFile) {
      const updatedFiles = files.map((file) => {
        if (file.id === targetFile.id) {
          return { ...file, title: newTitle };
        }
        return file;
      });
      setFiles(updatedFiles);
      setSelectedFile(null);
      alert("file updated");
    }
  };

  const handleDelete = (targetFolder, targetFile) => {
    if (targetFolder) {
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== targetFolder.id)
      );
      setSelectedFolder(null);
    }

    if (targetFile) {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== targetFile.id)
      );
      setSelectedFile(null);
    }
  };

  const handleFavorite = (targetFolder, targetFile) => {
    if (targetFolder) {
      const updatedFolders = folders.map((folder) => {
        if (folder.id === targetFolder.id && targetFolder.favorite) {
          return { ...folder, favorite: false };
        }
        if (folder.id === targetFolder.id && targetFolder.favorite === false) {
          return { ...folder, favorite: true };
        }
        return folder;
      });
      setFolders(updatedFolders);
      updatedFolders.forEach((folder) => {
        if (folder.id === targetFolder.id) {
          setSelectedFolder(folder);
        }
      });
    }

    if (targetFile) {
      const updatedFiles = files.map((file) => {
        if (file.id === targetFile.id && targetFile.favorite) {
          return { ...file, favorite: false };
        }
        if (file.id === targetFile.id && targetFile.favorite === false) {
          return { ...file, favorite: true };
        }
        return file;
      });
      setFiles(updatedFiles);
      updatedFiles.forEach((file) => {
        if (file.id === targetFile.id) {
          setSelectedFile(file);
        }
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("currentFolderId", 1);
    localStorage.setItem("searchKey", null);
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin authDone={authDone} handleAuth={handleAuth}/>} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="storage/:folder_id"
          element={
            <Storage
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              handleDelete={handleDelete}
              files={files}
              filteredFiles={filteredFiles}
              folders={folders}
              filteredFolders={filteredFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
            />
          }
        />
        <Route
          path="dashboard"
          element={
            <Dashboard
              userInfo={userInfo}
              authKey={authKey}
              authRefreshKey={authRefreshKey}
              extensionCategory={extensionCategory}
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              handleDelete={handleDelete}
              files={files}
              filteredFiles={filteredFiles}
              folders={folders}
              filteredFolders={filteredFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
            />
          }
        />
        <Route
          path="storage"
          element={
            <Storage
              handleFavChange={handleFavChange}
              favChange={favChange}
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              handleDelete={handleDelete}
              files={files}
              filteredFiles={filteredFiles}
              folders={folders}
              filteredFolders={filteredFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
              handleFavorite={handleFavorite}
            />
          }
        />
        <Route
          path="favorite"
          element={
            <Favorite
              handleFavChange={handleFavChange}
              favChange={favChange}
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              handleDelete={handleDelete}
              files={favoriteFiles}
              filteredFiles={favoriteFiles}
              folders={favoriteFolders}
              filteredFolders={favoriteFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
              handleFavorite={handleFavorite}
            />
          }
        />
        <Route
          path="bin"
          element={
            <Bin
              handleFavChange={handleFavChange}
              favChange={favChange}
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              handleDelete={handleDelete}
              files={deletedFiles}
              filteredFiles={deletedFiles}
              folders={deletedFolders}
              filteredFolders={deletedFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
            />
          }
        />
        <Route
          path="search"
          element={
            <Search
              handleFavChange={handleFavChange}
              favChange={favChange}
              handleSearch={handleSearch}
              colorTheme={colorTheme}
              handleChangeColorTheme={handleChangeColorTheme}
              searchedFiles={searchedFiles}
              searchedFolders={searchedFolders}
              handleDelete={handleDelete}
              files={searchedFiles}
              filteredFiles={searchedFiles}
              folders={searchedFolders}
              filteredFolders={searchedFolders}
              selectedFolder={selectedFolder}
              selectedFile={selectedFile}
              currentFolderName={currentFolderName}
              handleFileSelect={handleFileSelect}
              handleFolderSelect={handleFolderSelect}
              handleFolderDoubleClick={handleFolderDoubleClick}
              handleNewFolder={handleNewFolder}
              handleRename={handleRename}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
