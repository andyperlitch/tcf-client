export default function Root() {
  return (
    <>
      <div id="sidebar">
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
