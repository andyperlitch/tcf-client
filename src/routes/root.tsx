import { Link } from "react-router-dom";
import "./root.css";

export default function Root() {
  return (
    <>
      <div className="rootContainer">
        <h1>The Casual Funk</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/setlist`}>Set List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
