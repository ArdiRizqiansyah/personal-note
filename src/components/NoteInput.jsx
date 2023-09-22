/* eslint-disable react/prop-types */
import { useState } from "react";

function NoteInput({ onAdd }){
  const [limitTitle, setLimitTitle] = useState(50);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function onSubmitHandler (e) {
      e.preventDefault();
      
      const newNote = {
        id: Date.now(),
        title: title,
        body: body,
        createdAt: Date.now(),
        archived: false,
      };

      onAdd(newNote);
      setTitle("");
      setBody("");
  }

  // handle change title
  function onChangeTitleHandler (e) {
    setTitle(e.target.value);

    let lengthTitle = e.target.value.length;
    
    if(lengthTitle > 50){
      setLimitTitle(0);

      // input dont added value
      setTitle(title.substring(0, 50));
    }else{
      setLimitTitle(50 - lengthTitle);
    }
  }

  return (
    <div className="note-input">
      <h2>Buat catatan</h2>
      <form onSubmit={onSubmitHandler}>
        <p className="note-input__title__char-limit">
          Sisa karakter: {limitTitle}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder="Ini adalah judul ..."
          required=""
          value={title}
          onChange={onChangeTitleHandler}
        />
        <textarea
          className="note-input__body"
          type="text"
          placeholder="Tuliskan catatanmu di sini ..."
          required=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
}

export default NoteInput;