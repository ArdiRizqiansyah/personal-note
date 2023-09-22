import { useState } from 'react'
import Navbar from './components/Navbar';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

import { getArchivedData, getInitialData, getUnarchivedData } from './utils/index';

function App() {
  const data = getInitialData();

  const [notes, setNotes] = useState(data);
  const [unarchivedNotes, setUnarchivedNotes] = useState(getUnarchivedData(notes));
  const [archivedNotes, setArchivedNotes] = useState(notes.filter((note) => note.archived));

  // refresh notes
  function refreshNotes (newNotes) {
    setNotes(newNotes);
    setUnarchivedNotes(getUnarchivedData(newNotes));
    setArchivedNotes(getArchivedData(newNotes));
  }

  // handle delete note
  function onDeleteHandler (id) {
    const newNotes = notes.filter((note) => note.id !== id);

    refreshNotes(newNotes);
  }

  // handle add note
  function onAddHandler (note) {
    const newNotes = [...notes, note];

    refreshNotes(newNotes);
  }

  // handle archive note
  function onArchiveHandler (id) {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }
      return note;
    });
    
    refreshNotes(newNotes);
  }

  // handle search note
  function onSearchHandler (query) {
    const newNotes = notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()));

    setUnarchivedNotes(getUnarchivedData(newNotes));
    setArchivedNotes(getArchivedData(newNotes));
  }

  return (
    <>
      <Navbar onSearch={onSearchHandler} />

      <div className="note-app__body">
        <NoteInput onAdd={onAddHandler} />

        {/* list archived notes */}
        <NoteList
          title="Catatan Aktif"
          notes={unarchivedNotes}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />

        {/* list unarchived notes */}
        <NoteList
          title="Catatan Arsip"
          notes={archivedNotes}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />
      </div>
    </>
  );
}

export default App
