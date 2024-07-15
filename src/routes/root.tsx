import "./root.css";

export default function Root() {
  return (
    <>
      <div className="rootContainer">
        <h1>The Casual Funk</h1>
        <nav>
          <ul>
            <li>
              <a href={`/setlist`}>Set List</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
