// import "./assets/header.css";
function Sidebar({
  names,
  onAddNames,
  onDeleteName,
  activeNote,
  setActiveNote,
}) {
  return (
    <div className="app-sidebar">
      {/* <div className="app-sidebar-namelist">
        {names.map((names) => (
          <div
            className={`app-sidebar-title-body ${names.id === activeNote && "active"
              }`}
            onClick={() => setActiveNote(names.id)}
          >
            <ol>{names.title}</ol>
            <p>{names.body && names.body}</p>
            <small>
              {new Date(names.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                era: "long",
              })}
            </small>
            <button onClick={() => onDeleteName(names.id)}>Delete</button>
          </div>
        ))}
      </div> */}
      {/* <button onClick={onAddNames}>Sidebar Button</button> */}
      
    </div>
  );
}

export default Sidebar;
