import styles from "../../assets/css/Storage/FileList.module.css";
import uploadIcon from "../../assets/image/uploadicon.png";
import downloadIcon from "../../assets/image/downloadicon.png";
import renameIcon from "../../assets/image/renameicon.png";
import newFolderIcon from "../../assets/image/addfoldericon.png";
import binIcon from "../../assets/image/binicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";
import rootIcon from "../../assets/image/rooticon.png";

const Button = (props) => {
  const handleNewFolderClick = () => {
    if (props.onNewFolder) {
      props.onNewFolder();
    }
  };

  return (
    <div className={styles.btn_wrapper}>
      <div
        className={`${styles.btn_title_wrapper} ${
          props.colorTheme === "light"
            ? null
            : styles.darkmode_btn_title_wrapper
        }`}
      >
        {props.currentFolderName}
      </div>
      <div className={styles.btn}>
        <button
          className={styles.btn_upload}
          onClick={() => {
            alert("Upload Folder or File");
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

        <button
          className={styles.btn_else}
          onClick={() => {
            alert("Download Folder or File");
          }}
        >
          <img
            className={styles.img_else}
            src={downloadIcon}
            height={14}
            width={14}
            alt="donwloadIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Download</div>
        </button>

        <button className={styles.btn_else} onClick={handleNewFolderClick}>
          <img
            className={styles.img_else}
            src={newFolderIcon}
            height={14}
            width={14}
            alt="newFolderIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;New Folder</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() =>
            props.onRename(props.selectedFolder, props.selectedFile)
          }
        >
          <img
            className={styles.img_else}
            src={renameIcon}
            height={14}
            width={14}
            alt="renameIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Rename</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() =>
            props.onDelete(props.selectedFolder, props.selectedFile)
          }
        >
          <img
            className={styles.img_else}
            src={binIcon}
            height={14}
            width={14}
            alt="binIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Delete</div>
        </button>
      </div>
    </div>
  );
};

const Folders = ({
  filteredFolderList,
  onFolderSelect,
  onFolderDoubleClick,
  onFileSelect,
  colorTheme,
  navigate,
}) => {
  const handleFolderClick = (folder) => {
    onFolderSelect(folder);
  };

  const handleRootFolderClick = (navigate) => {
    onFileSelect(0);
    onFolderDoubleClick(0, navigate);
    handleFolderClick(null);
  };

  return (
    <div className={styles.files_wrapper}>
      <h2
        className={`${styles.filelist_title_wrapper} ${
          colorTheme === "light" ? null : styles.darkmode_filelist_title_wrapper
        }`}
      >
        folder
      </h2>
      <div className={styles.files_body}>
        <div className={styles.files_each} onClick={() => handleRootFolderClick(navigate)}>
          <img
            className={`${styles.rootIcon} ${
              colorTheme === "light" ? null : styles.darkmode_folderIcon
            }`}
            src={rootIcon}
            alt="root folder"
          />
          <br></br>
          <div className={styles.each_title}></div>
          <text
            className={`${styles.text} ${
              colorTheme === "light" ? null : styles.darkmode_text
            }`}
          >
            ./
          </text>
        </div>
        {filteredFolderList.map((folder) => (
          <div
            className={styles.files_each}
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            onDoubleClick={() => onFolderDoubleClick(folder, navigate)}
          >
            <img
              className={`${styles.folderIcon} ${
                colorTheme === "light" ? null : styles.darkmode_folderIcon
              }`}
              src={folderIcon}
              alt={folder.title}
            />
            <br></br>
            <div className={styles.each_title}></div>
            <text
              className={`${styles.text} ${
                colorTheme === "light" ? null : styles.darkmode_text
              }`}
            >
              {folder.title}
            </text>
          </div>
        ))}
      </div>
    </div>
  );
};

const Files = ({ fileList, filteredFileList, onFileSelect, colorTheme }) => {
  const handleFileClick = (file) => {
    onFileSelect(file);
  };

  return (
    <div className={styles.files_wrapper}>
      <h2
        className={`${styles.filelist_title_wrapper} ${
          colorTheme === "light" ? null : styles.darkmode_filelist_title_wrapper
        }`}
      >
        file
      </h2>
      <div className={styles.files_body}>
        {filteredFileList.map((file) => (
          <div
            className={styles.files_each}
            key={file.id}
            onClick={() => handleFileClick(file)}
          >
            <img
              className={`${styles.folderIcon} ${
                colorTheme === "light" ? null : styles.darkmode_folderIcon
              }`}
              src={fileIcon}
              alt={file.title}
            />
            <br></br>
            <text
              className={`${styles.text} ${
                colorTheme === "light" ? null : styles.darkmode_text
              }`}
            >
              {file.title}
            </text>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileList = (props) => {
  return (
    <div className={styles.filelist_wrapper}>
      <Button
        onNewFolder={props.onNewFolder}
        onDelete={props.onDelete}
        selectedFolder={props.selectedFolder}
        selectedFile={props.selectedFile}
        onRename={props.onRename}
        currentFolderName={props.currentFolderName}
        colorTheme={props.colorTheme}
      ></Button>
      <Folders
        navigate={props.navigate}
        folderList={props.folderList}
        filteredFolderList={props.filteredFolderList}
        onFolderSelect={props.onFolderSelect}
        onFileSelect={props.onFileSelect}
        onFolderDoubleClick={props.onFolderDoubleClick}
        colorTheme={props.colorTheme}
      ></Folders>
      <Files
        fileList={props.fileList}
        filteredFileList={props.filteredFileList}
        onFileSelect={props.onFileSelect}
        colorTheme={props.colorTheme}
      ></Files>
    </div>
  );
};

export default FileList;
