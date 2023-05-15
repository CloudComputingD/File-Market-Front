import React, { useState } from 'react';
import styles from '../../assets/css/Bin/Bin_Filelist.module.css';
import RestoreIcon from '../../assets/image/restoreicon.png';
import DeleteIcon from '../../assets/image/deleteicon.png';

const DirectoryNameandButtonBar = (props) => {
    return(
        <div className={styles.filelist_header_wrapper}>
            <div className={styles.header_directory_title_wrapper}>
                Bin
            </div>
            <div className={styles.header_button_wrapper}>
                <button
                    className={styles.header_button}
                    onClick={props.handleRestore}>
                    <div className={styles.header_button_image_wrapper}>
                        <img src={RestoreIcon} className={styles.header_button_image}/>
                    </div>
                    <div className={styles.header_button_title_wrapper}>
                        Restore
                    </div>
                </button>
                <button
                    className={styles.header_button}
                    onClick={props.handleDelete}>
                    <div className={styles.header_button_image_wrapper}>
                        <img src={DeleteIcon} className={styles.header_button_image} />
                    </div>
                    <div className={styles.header_button_title_wrapper}>
                        Delete
                    </div>
                </button>
            </div>
        </div>
    )
}

const TableHeader = (props) => {
    return(
        <div className={styles.table_header_wrapper}>
            <div className={styles.header_checkbox_column}>
                <input 
                    type='checkbox'
                    className={styles.table_checkbox}
                    onChange={(e) => {props.handleAllCheck(e.target.checked)}}
                    checked={props.checkItems.length === props.numberOfFiles ? true : false}
                    />
            </div>
            <div className={styles.header_filename_column}>
                Name
            </div>
            <div className={styles.header_deleted_date_column}>
                Deleted Date
            </div>
            <div className={styles.header_size_column}>
                Size
            </div>
        </div>
    )
}

const FileListTable = (props) => {
    const fileInfo = props.fileInfo;
    return(
        <div className={styles.filelist_table_wrapper}>
            <div className={styles.table_checkbox_column}>
                <input 
                    type='checkbox'
                    className={styles.table_checkbox}
                    onChange={(e) => {props.handleSingleCheck(e.target.checked, fileInfo.id)}}
                    checked={props.checkItems.includes(fileInfo.id) ? true : false}
                    />
            </div>
            <div className={styles.table_filename_column}>
                {fileInfo.name}
            </div>
            <div className={styles.table_deleted_date_column}>
                {fileInfo.deleted_date}
            </div>
            <div className={styles.table_size_column}>
                {fileInfo.size}
            </div>
        </div>
    )
}


const FileListBlock = (props) => {
    const fileList = props.fileList;
    return(
        <div className={styles.filelist_block_wrapper}>
            <TableHeader checkItems={props.checkItems} handleAllCheck={props.handleAllCheck} numberOfFiles={fileList.length} />
            { fileList.map((file, index) => {
                return(
                    <FileListTable checkItems={props.checkItems} index={index} handleSingleCheck={props.handleSingleCheck} fileInfo={file} />
                )
            })}
        </div>
    )
}

const FileList = (props) => {
    const tempFileList = props.tempFileList;
    const [checkItems, setCheckItems] = useState([]);

    function handleSingleCheck(checked, id) {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    }
    
    function handleAllCheck(checked) {
        if (checked) {
            const idArray = [];
            tempFileList.forEach((el) => {
                idArray.push(el.id);
            })
            setCheckItems(idArray);
        } else {
            setCheckItems([]);
        }
    }

    function handleDelete() {
        if (checkItems.length === 0) {
            alert('선택된 파일및 폴더가 없습니다.');
        } else {
            console.log(checkItems);
        }
    }

    function handleRestore() {
        console.log('restore');
    }

    return(
        <div className={styles.filelist_wrapper}>
            <DirectoryNameandButtonBar handleRestore={handleRestore} handleDelete={handleDelete}/>
            <FileListBlock checkItems={checkItems} handleSingleCheck={handleSingleCheck} handleAllCheck={handleAllCheck} fileList={tempFileList}/>
        </div>
    )
}

export default FileList;