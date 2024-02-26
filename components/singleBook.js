import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/Home.module.css";

import SendData from "./sendFunction";

export default function SingleBook({ data, bookName, bookFunction }) {
  async function removeBook(bookname) {
    var prom = prompt(
      "Do You want to remove" + data + "\n Yes or No"
    ).toLowerCase();
    if (prom == "yes" || prom == "y") {
      var res = await SendData(data, "delete_book");
      console.log(res);
      bookFunction(bookName.filter((name) => name !== data));
    }
  }

  return (
    <div className={styles.book}>
      <span
        onClick={() => {
          removeBook(data);
        }}
      >
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrash}
        ></FontAwesomeIcon>
      </span>
      <a href={`book/${data}`}>
        <div className={styles.book_div}>
          <img src={"./pdf-icon.png"} />

          <p>{data}</p>
        </div>
      </a>
    </div>
  );
}
