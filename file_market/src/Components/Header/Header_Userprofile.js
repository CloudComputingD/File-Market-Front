import React, { useState } from "react";
import UserProfileImg from "../../assets/image/userprofileimage.png";
import styles from "../../assets/css/Header/Header_Userprofile.module.css";

const UserProfile = (props) => {
  const userInfo = props.userInfo;
  const colorTheme = props.colorTheme;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.userprofile_wrapper}>
      <div
        className={`${styles.userprofile_circular_image_border} ${
          colorTheme === "light" ? null : styles.darkmode_image_border
        }`}
      >
        <img
          src={UserProfileImg}
          className={`${styles.userprofile_image} ${
            colorTheme === "light" ? null : styles.darkmode_userprofile_image
          }`}
          onClick={handleProfileClick}
        />

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modal_content}>
              <h3>User Profile</h3>
              <br></br>
              <p>Name: {userInfo.name}</p>
              <p>Email: {userInfo.email}</p>
              <p>Role: {userInfo.role}</p>
              <div className={styles.modal_button_wrapper}>
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
