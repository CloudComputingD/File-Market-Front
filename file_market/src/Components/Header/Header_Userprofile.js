import React from 'react';
import UserProfileImg from "../../assets/image/userprofileimage.png"
import styles from '../../assets/css/Header/Header_Userprofile.module.css';

const UserProfile = () => {
    return(
        <div className={styles.userprofile_wrapper}>
            <div className={styles.userprofile_circular_image_border}>
                <img src={UserProfileImg} className={styles.userprofile_image} />
            </div>
        </div>
    )
}

export default UserProfile;