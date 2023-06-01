import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/Dashboard/Dashboard_Table.module.css';
import { FormatBytes } from '../../logics/Formatter';
import { CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const OrderedTable = (props) => {
    const [page, setPage] = useState(1);
    const orderedFileList = props.orderedFileList;
    const numPages = Math.ceil(orderedFileList.length / 10);

    return(
        <div className={styles.table_wrapper}>
            <div className={styles.table_title_wrapper}>
                <div className={styles.table_title_area}>
                    <CDropdown>
                        <CDropdownToggle color='secondary'>
                            {props.curMode === 'size' ? "Size" : "Deleted Date"}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => props.handleCurMode('size')}>Size</CDropdownItem>
                            <CDropdownItem onClick={() => props.handleCurMode('date')}>Deleted Date</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
                <div className={styles.table_delete_button_wrapper}>
                    <button
                        className={styles.table_delete_button}>
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
                            onChange={(e) => {props.handleAllCheck(e.target.checked, page - 1)}}
                            checked={props.checkItems.length == (page < numPages ? 10 : orderedFileList.length % 10) ? true : false}/>
                    </div>
                    <div className={styles.header_index_column_wrapper}>
                        Index
                    </div>
                    <div className={styles.header_name_column_wrapper}>
                        Name
                    </div>
                    <div className={styles.header_orderkey_column_wrapper}>
                        {props.curMode === 'size' ? "Size" : "Date"}
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
                                        onChange={(e) => {props.handleSingleCheck(e.target.checked, orderedFileList[index].id)}}
                                        checked={props.checkItems.includes(orderedFileList[index].id) ? true : false}/>
                                </div>
                                <div className={`${styles.item_index_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                    {index + 1}
                                </div>
                                <div className={`${styles.item_name_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                    {file.title}
                                </div>
                                <div className={`${styles.item_orderkey_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                    {props.curMode === 'size' ? FormatBytes(file.size) : file.created_time}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        
            {/* { orderedFileList.length >= 10 ? 
                <div className={styles.more_button_wrapper}>
                    <button
                        className={styles.more_button}>
                        more button
                    </button>
                </div>: null
            } */}
        </div>
    )
}

const FileTable = (props) => {
    const colorTheme = props.colorTheme;
    const fileList = props.fileList;
    const [curMode, setCurMode] = useState('size');
    const [orderedFileList, setOrderedFileList] = useState(fileList);
    const [checkItems, setCheckItems] = useState([]);

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
        sortFileList('size');
    }, [])

    function sortFileList(orderKey) {
        if (orderKey === 'size') {
            setOrderedFileList(
                [...orderedFileList].sort(function (a, b) {
                    if (a.extension !== '' && b.extension !== '') {
                        return a.size > b.size ? -1 : a.size < b.size ? 1 : 0;
                    }
                })
            );
        } else {
            setOrderedFileList(
                [...orderedFileList].sort(function (a, b) {
                    return a.created_time < b.created_time ? -1 : a.created_time > b.created_time ? 1 : 0;
                })
            );
        }
    }

    return(
        <div className={styles.file_table_wrapper}>
            <OrderedTable colorTheme={colorTheme} sortFileList={sortFileList} checkItems={checkItems} curMode={curMode} handleCurMode={handleCurMode} handleSingleCheck={handleSingleCheck} handleAllCheck={handleAllCheck} orderedFileList={orderedFileList}/>
        </div>
    )
}

export default FileTable;