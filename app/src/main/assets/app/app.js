const Search_notes_input = document.getElementById('Search_notes_input');
const Search_notes_inputWrapper = document.getElementById('Search_notes_input_wrapper');

Search_notes_inputWrapper.addEventListener('click', () =>{
    document.querySelector('.search_container_screen').hidden = false
    window.history.pushState({ SearchContainerOpen: true }, "");
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), Themeflag, '200')
    document.getElementById('backSearchBtn').hidden = false;
    document.getElementById('backSearchBtnIconSearch').hidden = true;
    document.querySelector('.header_search').classList.add('enabled');
    setTimeout(() =>{
        Search_notes_input.focus();
    }, 100);
})

window.addEventListener("popstate", function (event) {
    if(!document.querySelector('.search_container_screen').hidden){
        document.querySelector('.search_container_screen').hidden = true;
        Search_notes_input.blur();
        document.getElementById('backSearchBtnIconSearch').hidden = false;
        document.querySelector('.header_search').classList.remove('enabled');
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag)
        document.getElementById('backSearchBtn').hidden = true;
        document.getElementById('notesContainerSearched').innerHTML = '';
        document.getElementById('Search_notes_input').value = ''
    }

       const deleteCheckboxes = document.querySelectorAll('.noteCheckboxWrap');

       deleteCheckboxes.forEach((checkbox) =>{
        if(!checkbox.hidden){
            checkbox.hidden = true;
            document.getElementById('backSearchBtn').hidden = true;
            document.getElementById('backSearchBtnIconSearch').hidden = false;
            document.getElementById('deleteNoteBtn').hidden = true;
        }
       });
})

function createNoteTile(){
    setTimeout(() =>{
        loadCheckboxListeners()
    }, 300);
        const savedNotesList = document.getElementById('savedNotesList');
        savedNotesList.innerHTML = '';

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.title !== "" || note.content !== "");
        displayWaterMark()

        notes.forEach((note, index) => {
            const noteTile = document.createElement('noteTileWrap');
              noteTile.setAttribute('noteID', note.noteID)

            const timestamp = parseInt(note.noteID.split('_')[0]);
            const date = new Date(timestamp);

            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

            noteTile.innerHTML = `
                <label class="noteCheckboxWrap" hidden onclick="event.stopPropagation();">
                  <check_label>
                  <md-checkbox class="noteCheckbox"></md-checkbox></check_label>
                </label>
                <p>${note.title}</p>
                <span>${note.content}</span>
                <time>${formattedDate}</time>
            `

            noteTile.addEventListener('click', function() {
                localStorage.setItem('clickedNote', index)

                navigateActivity('NotesViewActivity')
            });

            savedNotesList.appendChild(noteTile);
        });
}

createNoteTile()

function deleteSelectedNotes() {
    const checkboxes = document.querySelectorAll('.noteCheckbox');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    let updatedNotes = [];
    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            updatedNotes.push(notes[index]);
        }
        checkbox.hidden = true;
        document.getElementById('backSearchBtn').hidden = true;
        document.getElementById('backSearchBtnIconSearch').hidden = false;
        document.getElementById('deleteNoteBtn').hidden = true;
    });

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    createNoteTile();
     displayWaterMark()
    window.history.back();
}

let holdTimer
function loadCheckboxListeners(){

const deleteCheckboxes = document.querySelectorAll('.noteCheckboxWrap');
const noteTilesAll = document.querySelectorAll('noteTileWrap');

noteTilesAll.forEach((noteTile) =>{
noteTile.addEventListener('touchstart', () =>{
    holdTimer = setTimeout(() =>{
        deleteCheckboxes.forEach((checkbox) =>{
            checkbox.hidden = false;
            clearTimeout(holdTimer)
            document.getElementById('backSearchBtn').hidden = false;
            document.getElementById('backSearchBtnIconSearch').hidden = true;
            document.getElementById('deleteNoteBtn').hidden = false;
            window.history.pushState({ SelectionOpen: true }, "");

        });
    }, 1000)
})

noteTile.addEventListener('touchend', () =>{
    clearTimeout(holdTimer)
});

});
}
function displayWaterMark(){
    if (JSON.parse(localStorage.getItem('notes')) && JSON.parse(localStorage.getItem('notes')).length > 0 ) {
        document.querySelector('.water_mark').hidden = true;
    } else{
        document.querySelector('.water_mark').hidden = false;
    }

}

displayWaterMark()

// search......



function searchNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const query = document.getElementById('Search_notes_input').value.toLowerCase();
    const container = document.getElementById('notesContainerSearched');
    container.innerHTML = "";

    if (query === "") return;

    const filtered = notes
        .map((note, originalIndex) => ({ ...note, originalIndex })) // Keep track of original index
        .filter(note => note.title.toLowerCase().includes(query));

    if (filtered.length === 0) {
        container.innerHTML = "<error style='color: var(--On-Surface);'>No matching notes found.</error>";
        return;
    }

    filtered.forEach(note => {
        const searchedItem = document.createElement('SearchedNote');

        const timestamp = parseInt(note.noteID.split('_')[0]);
        const date = new Date(timestamp);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

        searchedItem.innerHTML = `
        <p>${note.title}</p>
        <p_content>${note.content}</p_content>
        <span>${formattedDate}</span>
        <md-ripple></md-ripple>
        `;

        searchedItem.addEventListener('click', () => {
            localStorage.setItem('clickedNote', note.originalIndex); // Use the original index
            navigateActivity('NotesViewActivity');
            setTimeout(() => {
                window.history.back();
            }, 200);
        });

        container.appendChild(searchedItem);
    });
}



document.getElementById('Search_notes_input').addEventListener('input', searchNotes)