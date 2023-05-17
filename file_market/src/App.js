import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Sign/Signin";
import Signup from "./Components/Sign/Signup";
import Storage from "./Components/Storage/Storage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Bin from "./Components/Bin/Bin";

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
    favorite: true,
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
    favorite: false,
    user_id: 2,
    trash: true,
    size: 34543653,
  },

  {
    id: 10,
    title: "1차시보고서.hwp",
    created_time: new Date().getTime(),
    deleted_time: null,
    folder_id: 2,
    favorite: false,
    user_id: 2,
    trash: false,
    size: 524234,
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="storage" element={<Storage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bin" element={<Bin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
