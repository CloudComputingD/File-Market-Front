import React, { useState } from "react";
import UserProfileImg from "../../assets/image/userprofileimage.png";
import styles from "../../assets/css/Header/Header_Userprofile.module.css";

const UserProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // 모달 내부에 표시할 유저 정보
  const user = {
    name: "김나현",
    email: "knh4769@khu.ac.kr",
    role: "User",
  };

  return (
    <div className={styles.userprofile_wrapper}>
      <div className={styles.userprofile_circular_image_border}>
        <img
          src={UserProfileImg}
          className={styles.userprofile_image}
          onClick={handleProfileClick}
        />

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modal_content}>
              <h2>User Profile</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
