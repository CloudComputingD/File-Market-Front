import React, { useState } from 'react';
import styles from "../../assets/css/Storage/FileList.module.css"
import uploadIcon from "../../assets/image/uploadicon.png";
import { API_UploadFile } from '../../API/APIManager';

const UploadModal = (props) => {
    const [fileBase64, setFileBase64] = useState([]); // 파일 base64
    const [file, setFile] = useState(null);	//파일	

    const handleChangeFile = (event) => {
        console.log(event.target.files)
        setFile(event.target.files);
        //fd.append("file", event.target.files)
        setFileBase64([]);
        for(var i=0;i<event.target.files.length;i++){
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
                // 파일 상태 업데이트
                reader.onloadend = () => {
                    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                    const base64 = reader.result;
                    console.log(base64)
                    if (base64) {
                    //  images.push(base64.toString())
                        var base64Sub = base64.toString();
                        setFileBase64(fileBase64 => [...fileBase64, base64Sub]);
                        //  setImgBase64(newObj);
                        // 파일 base64 상태 업데이트
                        //  console.log(images)
                    }
                }
            }
        }
        console.log(file, fileBase64);
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: "20%", height: 150, zIndex: 999, position: 'absolute', top: '130px', left: '40%', backgroundColor: 'white', borderWidth: 1, borderStyle: 'solid', borderColor: 'black', borderRadius: 8}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: "Lato Bold", fontWeight: 'bold', }}>
                Select File
            </div>
            <input 
                type="file"
                onChange={handleChangeFile}
                className={styles.btn_upload}
                // onChange={e => onUpload(e)}
            />
            <button
                className={styles.btn_upload}
                onClick={async () => {
                    if (file !== null) {
                        const formData = new FormData();
                        console.log(file["0"]);
                        formData.append("file", file["0"]);
                        const result = await API_UploadFile(localStorage.getItem('userInfo').split(',')[0].split(":")[1], formData, props.currentFolderId);
                        props.makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], props.currentFolderId);
                        props.closeModal();
                    } else {
                        alert("Select a File!");
                    }
                    
                    // formData.append("file", )
                }}
                >
                <img
                    className={styles.img_upload}
                    src={uploadIcon}
                    height={14}
                    width={14}
                    alt="uploadIcon"
                />
                <div className={styles.text_wrapper}>&nbsp;Upload</div>
            </button>
        </div>
    )
}

export default UploadModal;