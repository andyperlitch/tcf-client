import "./root.css";

export default function Root() {
  return (
    <>
      <div className="rootBackground" />
      <div className="rootContainer">
        <h1>The Casual Funk</h1>
        <h2>Santa Cruz, CA</h2>
        <p>
          <a href="https://www.instagram.com/thecasualfunk/" target="_blank">
            @TheCasualFunk
          </a>
        </p>
        {/* <nav>
          <ul>
            <li>
              <Link to={`/setlist`}>Set List</Link>
            </li>
          </ul>
        </nav> */}
      </div>
      <div id="detail"></div>
    </>
  );
}
