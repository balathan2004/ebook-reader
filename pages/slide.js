import styles from "@/styles/slide.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileArrowUp,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
export default function page() {
  return (
    <div className="app">
      <div className={styles.box}>
        <div className={styles.side}>
          <div className={styles.header}>
            <a>
              <FontAwesomeIcon icon={faBookOpen} className={styles.brand} />
            </a>
          </div>
          <div className={styles.icon_container}>
            <a className={styles.icon} href="/home">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </a>
            <a className={styles.icon} href="upload-book">
              <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
            </a>
            <a className={styles.icon} href="/about">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a className={styles.icon} href="/contact">
              {" "}
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <div className={styles.target}>
            <div className={styles.side}>
              <div className={styles.header}>
                <a>
                  <img className={styles.brand_img} src={"/brand.png"} />
                </a>
              </div>
              <div className={styles.icon_container}>
                <a className={styles.icon}>
                  <FontAwesomeIcon icon={faHome} size="2x" />
                  <span>Home</span>
                </a>
                <a className={styles.icon}>
                  <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
                  <span>Upload Files</span>
                </a>
                <a className={styles.icon}>
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                  <span>About</span>
                </a>
                <a className={styles.icon}>
                  {" "}
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}></div>
      </div>
    </div>
  );
}
