import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../../assets/image/dashboardicon.png";
import StorageIcon from "../../assets/image/storageicon.png";
import UntoggledIcon from "../../assets/image/untoggledicon.png";
import ToggledIcon from "../../assets/image/toggledicon.png";
import FavoriteIcon from "../../assets/image/blackstaricon.png";
import BinIcon from "../../assets/image/binicon.png";
import styles from "../../assets/css/Sidebar/Sidebar.module.css";

const DashboardMenu = (props) => {
  const button_style =
    props.currentPage === "dashboard"
      ? styles.sidebar_curpage_menu_button
      : styles.sidebar_normal_menu_button;

  return (
    <div className={styles.sidebar_menu_button_wrapper}>
      <button
        className={button_style}
        onClick={() => {
          if (props.currentPage !== "dashboard") {
            props.navigate("/dashboard");
          }
        }}
      >
        <div className={styles.sidebar_menu_button_image_wrapper}>
          <img
            src={DashboardIcon}
            className={styles.sidebar_menu_button_image}
          />
        </div>
        <div className={styles.sidebar_menu_title_wrapper}>Dashboard</div>
      </button>
    </div>
  );
};

const StorageMenu = (props) => {
  const button_style =
    props.currentPage === "storage"
      ? styles.sidebar_curpage_menu_button
      : styles.sidebar_normal_menu_button;
  const toggle = props.currentPage === "storage" ? ToggledIcon : UntoggledIcon;

  return (
    <div className={styles.sidebar_menu_button_wrapper}>
      <button
        className={button_style}
        onClick={() => {
          props.navigate("/storage");
        }}
      >
        <div className={styles.sidebar_menu_button_toggle_image_wrapper}>
          <img
            src={toggle}
            className={styles.sidebar_menu_button_toggle_image}
          />
        </div>
        <div className={styles.sidebar_menu_button_image_wrapper}>
          <img src={StorageIcon} className={styles.sidebar_menu_button_image} />
        </div>
        <div className={styles.sidebar_menu_title_wrapper}>Storage</div>
      </button>
    </div>
  );
};

const FavoriteMenu = (props) => {
  const button_style =
    props.currentPage === "favorite"
      ? styles.sidebar_curpage_menu_button
      : styles.sidebar_normal_menu_button;

  return (
    <div className={styles.sidebar_menu_button_wrapper}>
      <button
        className={button_style}
        onClick={() => {
          alert("Favorite");
        }}
      >
        <div className={styles.sidebar_menu_button_image_wrapper}>
          <img
            src={FavoriteIcon}
            className={styles.sidebar_menu_button_image}
          />
        </div>
        <div className={styles.sidebar_menu_title_wrapper}>Favorite</div>
      </button>
    </div>
  );
};

const BinMenu = (props) => {
  const button_style =
    props.currentPage === "bin"
      ? styles.sidebar_curpage_menu_button
      : styles.sidebar_normal_menu_button;

  return (
    <div className={styles.sidebar_menu_button_wrapper}>
      <button
        className={button_style}
        onClick={() => {
          if (props.currentPage !== "bin") {
            props.navigate("/bin");
          }
        }}
      >
        <div className={styles.sidebar_menu_button_image_wrapper}>
          <img src={BinIcon} className={styles.sidebar_menu_button_image} />
        </div>
        <div className={styles.sidebar_menu_title_wrapper}>Bin</div>
      </button>
    </div>
  );
};

const Sidebar = (props) => {
  const navigate = useNavigate();
  const currentPage = props.currentPage;

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.sidebar_menu_block}>
        <DashboardMenu navigate={navigate} currentPage={currentPage} />
        <StorageMenu navigate={navigate} currentPage={currentPage} />
        <FavoriteMenu navigate={navigate} currentPage={currentPage} />
        <BinMenu navigate={navigate} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Sidebar;
