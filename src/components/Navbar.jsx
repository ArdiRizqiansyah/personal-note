// eslint-disable-next-line react/prop-types
function Navbar({ onSearch }){
    return (
      <div className="note-app__header">
        <h1>Notes</h1>
        <div className="note-search">
          <input
            type="text"
            placeholder="Cari catatan ..."
            defaultValue=""
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    );
}

export default Navbar;