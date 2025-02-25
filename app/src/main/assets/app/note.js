document.getElementById('deleteThisNoteBtn').addEventListener('click', () =>{
    console.log(openedNoteId)
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.noteID !== openedNoteId);
    localStorage.setItem('notes', JSON.stringify(notes));
    ActivityBack();
});

// pin

document.getElementById('pinThisNoteBtn').addEventListener('click', () =>{
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.map(note => {
        if (note.noteID === openedNoteId) {
            note.pinned = !note.pinned;

            if(note.pinned){
                document.getElementById('pinThisNoteBtnText').innerHTML = 'Unpin';
                document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark_remove';
            } else{
                document.getElementById('pinThisNoteBtnText').innerHTML = 'Pin';
                document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark';
            }
        }
        return note;
    });
    localStorage.setItem('notes', JSON.stringify(notes));
});