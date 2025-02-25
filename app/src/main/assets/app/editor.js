let openedNoteId = null;

function execCmd(command, value = null) {
    if (command === 'createLink') {
        const url = prompt('Enter the URL:');
        if (url) {
            document.execCommand(command, false, url);
        }
    } else {
        document.execCommand(command, false, value);
    }
  
    setTimeout(updateCheckboxes, 0); 
    document.getElementById('editor').focus(); 
}

let inputDebounce

document.getElementById('editor').addEventListener('input', () =>{
    setTimeout(updateCheckboxes, 0);
    if (document.getElementById('editor').innerHTML.trim() === '') {
        document.getElementById('formatBlockPre_checkbox').checked = false;
    }

    clearTimeout(inputDebounce)

    inputDebounce = setTimeout(() =>{
        saveNote()
    }, 300);

});

let inputDebounceTitle

document.getElementById('noteTitle').addEventListener('input', () =>{
    clearTimeout(inputDebounceTitle)
    inputDebounceTitle = setTimeout(() =>{
        saveNote()
    }, 300);

});

function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('editor').innerHTML.trim();
    const noteID = document.querySelector('id').getAttribute('id')


    if(title === "" && content === ""){
        document.getElementById('pinThisNoteBtn').disabled = true;
    } else{
        document.getElementById('pinThisNoteBtn').disabled = false;
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const existingNoteIndex = notes.findIndex(note => note.noteID === noteID);

    if (existingNoteIndex !== -1) {
        notes[existingNoteIndex].content = content;
        notes[existingNoteIndex].title = title;
    } else {
        notes.push({ title, content, noteID});
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    clearEditor();
}

function displaySavedNotes(note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('editor').innerHTML = note.content;
     document.querySelector('id').setAttribute('id', note.noteID)

      if(note.pinned){
         document.getElementById('pinThisNoteBtnText').innerHTML = 'Unpin';
         document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark_remove';
     }

}

if(localStorage.getItem('clickedNote')){
    displaySavedNotes(JSON.parse(localStorage.getItem('notes'))[localStorage.getItem('clickedNote')])
        document.querySelector('.view-btn').selected = true;
        toggleView()
        openedNoteId = localStorage.getItem('clickedNoteId')
        localStorage.removeItem('clickedNote')
        localStorage.removeItem('clickedNoteId')
} else{
    document.querySelector('id').setAttribute('id', Date.now() + '_note')
    openedNoteId = document.querySelector('id').getAttribute('id');

        if(document.getElementById('noteTitle').value.trim() === "" && document.getElementById('editor').innerHTML.trim() === ""){
            document.getElementById('pinThisNoteBtn').disabled = true;
        }
}


function clearEditor() {
    updateCheckboxes()
}


// displaySavedNotes(JSON.parse(localStorage.getItem('notes'))[]);

function setTextColor(color) {
    execCmd('foreColor', color);
}


function undo() {
    document.execCommand('undo');
}

function redo() {
    document.execCommand('redo');
}


// checkboxes

function toggleFormat(command, value = null) {
    const isChecked = document.getElementById(command + '_checkbox').checked;

    if (isChecked) {
        execCmd(command, value);
    } else {
        execCmd(command, value);
    }
}
function updateCheckboxes() {
    document.getElementById('bold_checkbox').checked = document.queryCommandState('bold');
    document.getElementById('italic_checkbox').checked = document.queryCommandState('italic');
    document.getElementById('insertOrderedList_checkbox').checked = document.queryCommandState('insertOrderedList');

}

let editor = document.getElementById('editor');
let selection = window.getSelection();
let range = document.createRange();

function saveCursorPosition() {
    let sel = window.getSelection();
    if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
    }
}

function restoreCursorPosition() {
    editor.focus();
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

editor.addEventListener('keyup', saveCursorPosition);
editor.addEventListener('mouseup', saveCursorPosition);



function insertLink() {
    document.getElementById('editor').focus();


    if(document.getElementById('linkTitleInput').value < 1){
        document.getElementById('linkTitleInput').error = true;
        return;
    }

    if(document.getElementById('linkURLInput').value < 1){
        document.getElementById('linkURLInput').error = true;
        return;
    }


    setTimeout(() => {
        restoreCursorPosition();
    }, 50);

    setTimeout(() =>{
        const link = `<a href="${document.getElementById('linkURLInput').value}" target="_blank">${document.getElementById('linkTitleInput').value}</a>`;
        document.execCommand('insertHTML', false, link);
        document.getElementById('linkURLInput').value = ''
        document.getElementById('linkTitleInput').value = ''
    }, 200);

    window.history.back()
}

document.getElementById('openInsertLinkDialog').addEventListener('click', () =>{
    document.getElementById('insertLinkDialog').show();
    window.history.pushState({ InsertLinkDialogOpen: true }, "");
    sendThemeToAndroid(colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], '0', '40');
});

document.getElementById('linkURLInput').addEventListener('input', () =>{
    if(document.getElementById('linkURLInput').error){
        document.getElementById('linkURLInput').error = false;
    }
})

document.getElementById('linkTitleInput').addEventListener('input', () =>{
    if(document.getElementById('linkTitleInput').error){
        document.getElementById('linkTitleInput').error = false;
    }
})

window.addEventListener("popstate", function (event) {
    if(document.getElementById('insertLinkDialog').open){
    document.getElementById('insertLinkDialog').close();
    }
});

document.getElementById('insertLinkDialog').addEventListener('cancel', () =>{
    document.getElementById('insertLinkDialog').addEventListener('closed', () =>{
        window.history.back()
    })
})

document.getElementById('insertLinkDialog').addEventListener('close', () =>{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), Themeflag, '40');
})



function toggleView() {
    const editor = document.getElementById('editor');
    const viewButton = document.querySelector('.view-btn');

    if(viewButton.selected){
        editor.contentEditable = 'false';
        document.getElementById('noteTitle').style.pointerEvents = 'none';

    } else{
        editor.contentEditable = 'true';
        document.getElementById('noteTitle').style.pointerEvents = '';

    }

}

function toggleFormatPre(cmd, value){
    const isChecked = document.getElementById('formatBlockPre_checkbox').checked;

    if (isChecked) {
        execCmd(cmd, value);
    } else {
        execCmd('formatBlock', '<div>');
    }
}

document.getElementById('editor').focus()
