import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="nav">
      <a className="brand" href="/">
        EReader
      </a>
      <nav>
        <label htmlFor="checker">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </label>
        <input type="checkbox" className="input" id="checker" />

        <ul className="uls">
          <li>
            <a href="/upload-book">upload book</a>
          </li>
          <li>
            <a href="/home">home</a>
          </li>
          <li>
            {" "}
            <a href="#">Continue Reading</a>
          </li>
          <li>
            {" "}
            <a href="/about">about</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
