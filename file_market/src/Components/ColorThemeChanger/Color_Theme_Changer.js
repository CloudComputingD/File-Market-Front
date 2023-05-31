import React from 'react';
import styles from '../../assets/css/ColorThemeChanger/Color_Theme_Changer.module.css';
import LightModeIcon from '../../assets/image/lightmode.png';
import DarkModeIcon from '../../assets/image/darkmode.png';

const ColorThemeChanger = (props) => {
    const colorTheme = props.colorTheme;

    return(
        <div className={styles.theme_change_wrapper}>
            <button
                className={styles.toggle_button}
                onClick={() => props.handleChangeColorTheme()}>
                <div className={`${styles.toggle_container} ${colorTheme === 'light' ? styles.toggle_container_light : null}`} />
                <div className={`${styles.toggle_circle} ${colorTheme === 'light' ? styles.toggle_circle_light : null}`} >
                    {colorTheme === 'light' ?   
                    <img src={LightModeIcon} className={styles.button_icon}/> :
                    <img src={DarkModeIcon} className={styles.button_icon}/>}
                </div>
            </button>
        </div>
    )
}

export default ColorThemeChanger;