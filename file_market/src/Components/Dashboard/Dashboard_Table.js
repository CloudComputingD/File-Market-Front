import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/Dashboard/Dashboard_Table.module.css';
import { FormatBytes } from '../../logics/Formatter';
import * as API_MANAGER from '../../API/APIManager';
import { CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const FileTable = (props) => {
    const userInfo = props.userInfo;
    const colorTheme = props.colorTheme;
    const [curMode, setCurMode] = useState('size');
    const [orderedFileList, setOrderedFileList] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [page, setPage] = useState(1);
    const numPages = Math.ceil(orderedFileList.length / 10);

    async function makeFileList(userId) {
        let result = await API_MANAGER.API_UserFileList(userId);
        const sorted = sortFileList(result, 'size');
        console.log(sorted);
        setOrderedFileList(sorted);
    }

    function handleSingleCheck(checked, id) {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    }
    
    function handleAllCheck(checked, offset) {
        if (checked) {
            const idArray = [];
            for (let i = offset * 10; i < (offset + 1) * 10; i++) {
                if (i >= orderedFileList.length) {
                    break;
                }
                idArray.push(orderedFileList[i].id);
            }
            setCheckItems(idArray);
        } else {
            setCheckItems([]);
        }
    }

    async function handleDelete() {
        checkItems.forEach(async(file) => {
            const result = await API_MANAGER.API_TrashDeleteFile(file, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
        })
        setCheckItems([]);
        makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
        // console.log(checkItems);
    }

    function handleCurMode(clicked) {
        if (curMode === 'size' && clicked === 'date') {
            setCurMode('date');
            return true;
        } else if (curMode === 'date' && clicked === 'size') {
            setCurMode('size');
            return true;
        }
        return false;
    }

    useEffect(() => {
        // console.log(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
        makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }, []);

    function sortFileList(fileList, orderKey) {
        if (orderKey === 'size') {
            const result = [...fileList].sort(function (a, b) {
                if (a.extension !== '' && b.extension !== '') {
                    return a.file_size > b.file_size ? -1 : a.file_size < b.file_size ? 1 : 0;
                }
            })
            return result;
        } else {
            const result = [...fileList].sort(function (a, b) {
                return a.created_time < b.created_time ? -1 : a.created_time > b.created_time ? 1 : 0;
            })
            return result;
        }
    }

    return(
        <div className={styles.file_table_wrapper}>
            <div className={styles.table_wrapper}>
                <div className={styles.table_title_wrapper}>
                    <div className={styles.table_title_area}>
                        <CDropdown>
                            <CDropdownToggle color='secondary'>
                                {curMode === 'size' ? "Size" : "Deleted Date"}
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => handleCurMode('size')}>Size</CDropdownItem>
                                <CDropdownItem onClick={() => handleCurMode('date')}>Date</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <div className={styles.table_delete_button_wrapper}>
                        <button
                            className={styles.table_delete_button}
                            onClick={() => {handleDelete()}}>
                            delete
                        </button>
                    </div>
                    <div className={styles.pagination_wrapper}>
                        <button className={styles.pagination_button} onClick={() => setPage(page - 1)} disabled={page === 1}>
                            &lt;
                        </button>
                        {numPages > 4 ?
                        Array(numPages)
                        .fill()
                        .map((_, i) => (
                            i < 2 || i > numPages - 3 ? 
                            <button
                                key={i + 1}
                                className={`${i + 1 === page ? styles.cur_page_button : styles.pagination_button}`}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 ? "page" : null}>
                                {i + 1}
                            </button> : 
                            i == 2 ?
                            <div> ... </div> : 
                            null
                        ))
                        :
                        Array(numPages)
                        .fill()
                        .map((_, i) => (
                            <button
                                key={i + 1}
                                className={`${i + 1 === page ? styles.cur_page_button : styles.pagination_button}`}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 ? "page" : null}>
                                {i + 1}
                            </button>
                        ))}
                        <button className={styles.pagination_button} onClick={() => setPage(page + 1)} disabled={page === numPages}>
                            &gt;
                        </button>
                    </div>
                </div>

                <div className={styles.table_header_wrapper}>
                    <div className={styles.table_header_block}>
                        <div className={styles.header_checkbox_column_wrapper}>
                            <input 
                                type='checkbox'
                                onChange={(e) => {handleAllCheck(e.target.checked, page - 1)}}
                                checked={checkItems.length == (page < numPages ? 10 : orderedFileList.length % 10) ? true : false}/>
                        </div>
                        <div className={styles.header_index_column_wrapper}>
                            Index
                        </div>
                        <div className={styles.header_name_column_wrapper}>
                            Name
                        </div>
                        <div className={styles.header_orderkey_column_wrapper}>
                            {curMode === 'size' ? "Size" : "Date"}
                        </div>
                    </div>
                </div>
                
                <div className={styles.table_block_wrapper}>
                    { orderedFileList.map((file, index) => {
                        if (index >= (page - 1) * 10 && index < page * 10) {
                            return (
                                <div className={styles.table_item_wrapper}>
                                    <div className={styles.item_checkbox_column_wrapper}>
                                        <input 
                                            type='checkbox'
                                            onChange={(e) => {handleSingleCheck(e.target.checked, orderedFileList[index].id)}}
                                            checked={checkItems.includes(orderedFileList[index].id) ? true : false}/>
                                    </div>
                                    <div className={`${styles.item_index_column_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                        {index + 1}
                                    </div>
                                    <div className={`${styles.item_name_column_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                        {file.name}
                                    </div>
                                    <div className={`${styles.item_orderkey_column_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                        {curMode === 'size' ? FormatBytes(file.file_size) : file.modified_time.split('T')[0]}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default FileTable;