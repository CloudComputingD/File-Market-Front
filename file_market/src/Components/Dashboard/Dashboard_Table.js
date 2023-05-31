import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/Dashboard/Dashboard_Table.module.css';
import { FormatBytes } from '../../logics/FormatBytes';
import { CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const OrderedTable = (props) => {
    const menu = [
        { title: 'Size', value: 'size'},
        { title: 'Deleted Date', value: 'date'}
    ];
    const [dropped, setDropped] = useState(false);

    function handleDrop() {
        setDropped(!dropped);
    }

    const sizeButtonStyle = (props.curMode === 'size' ? styles.table_cur_mode_button : styles.table_mode_button);
    const dateButtonStyle = (props.curMode === 'date' ? styles.table_cur_mode_button : styles.table_mode_button);
    const orderedFileList = props.orderedFileList;

    return(
        <div className={styles.table_wrapper}>
            <div className={styles.table_title_wrapper}>
                <CDropdown>
                    <CDropdownToggle color='secondary'>
                        {props.curMode === 'size' ? "Size" : "Deleted Date"}
                    </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem onClick={() => props.handleCurMode('size')}>Size</CDropdownItem>
                        <CDropdownItem onClick={() => props.handleCurMode('date')}>Deleted Date</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <div className={styles.table_mode_button_wrapper}>
                    <button
                        className={styles.table_delete_button}>
                        delete
                    </button>
                </div>
                <div>
                    paging area
                </div>
            </div>

            <div className={styles.table_header_wrapper}>
                <div className={styles.table_header_block}>
                    <div className={styles.header_column_wrapper}>
                        Index
                    </div>
                    <div className={styles.header_column_wrapper}>
                        Name
                    </div>
                    <div className={styles.header_column_wrapper}>
                        {props.curMode === 'size' ? "Size" : "Date"}
                    </div>
                </div>
            </div>
            
            <div className={styles.table_block_wrapper}>
                { orderedFileList.map((file, index) => {
                    if (index < 10) {
                        return (
                            <div className={styles.table_item_wrapper}>
                                <div className={`${styles.item_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                    {index + 1}
                                </div>
                                <div className={`${styles.item_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
                                    {file.title}
                                </div>
                                <div className={`${styles.item_column_wrapper} ${props.colorTheme === 'light' ? null : styles.darkmode_font_color}`}>
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
            <OrderedTable colorTheme={colorTheme} sortFileList={sortFileList} curMode={curMode} handleCurMode={handleCurMode} orderedFileList={orderedFileList}/>
        </div>
    )
}

export default FileTable;