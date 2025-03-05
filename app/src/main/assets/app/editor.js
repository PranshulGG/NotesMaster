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
        document.getElementById('blockquote_checkbox').checked = false
    }

       if (!document.getElementById('editor').textContent.trim()) {
            document.getElementById('horizontal_rule_btn').style.opacity = '0.5';
            document.getElementById('horizontal_rule_btn').style.pointerEvents = 'none';
       } else{
        document.getElementById('horizontal_rule_btn').style.opacity = '';
        document.getElementById('horizontal_rule_btn').style.pointerEvents = '';
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
    const title = document.getElementById('noteTitle').innerHTML.trim();
    const content = document.getElementById('editor').innerHTML.trim();
    const noteID = document.querySelector('id').getAttribute('id')


    if(title === "" && content === ""){
        document.getElementById('pinThisNoteBtn').disabled = true;
        document.getElementById('addLabelToThisNoteDialog').disabled = true;
        document.getElementById('shareContentMenuOption').disabled = true
        document.getElementById('ClearNoteContentMenuOption').disabled = true;

    } else{
        document.getElementById('pinThisNoteBtn').disabled = false;
        document.getElementById('addLabelToThisNoteDialog').disabled = false;
        document.getElementById('shareContentMenuOption').disabled = false
        if(!document.querySelector('.view-btn').selected){
            document.getElementById('ClearNoteContentMenuOption').disabled = false;
        }
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
        document.getElementById('noteTitle').innerHTML = note.title;
        document.getElementById('editor').innerHTML = note.content;
     document.querySelector('id').setAttribute('id', note.noteID)

      if(note.pinned){
         document.getElementById('pinThisNoteBtnText').innerHTML = 'Unpin';
         document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark_remove';
     }

          setTimeout(()=>{
             loadNoteLabels(note.noteID)
          }, 100)

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

        if(document.getElementById('noteTitle').innerHTML.trim() === "" && document.getElementById('editor').innerHTML.trim() === ""){
            document.getElementById('pinThisNoteBtn').disabled = true;
            document.getElementById('addLabelToThisNoteDialog').disabled = true;
            document.getElementById('shareContentMenuOption').disabled = true
            document.getElementById('ClearNoteContentMenuOption').disabled = true;
        }
}


function clearEditor() {
    updateCheckboxes()
}


// displaySavedNotes(JSON.parse(localStorage.getItem('notes'))[]);

function setTextColor(color) {
    execCmd('foreColor', color);
    document.getElementById('editor').focus()
}

function setbgColor(color) {
    try {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    const span = document.createElement('span');
    span.style.backgroundColor = color;


    if (!selection.isCollapsed) {
        range.surroundContents(span);
    } else {

        span.innerHTML = '&#8203;';
        range.insertNode(span);

        const newRange = document.createRange();
        newRange.setStart(span, 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }    } catch (error) {
        ShowSnackMessage.ShowSnack('Error', 'short');

    }
}


function removeBgColor() {
    document.execCommand('hiliteColor', false, 'initial');
    document.getElementById('editor').focus()
}


function undo() {
    document.execCommand('undo');
}

function redo() {
    document.execCommand('redo');
}

function applyColorSurfaceVariant() {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, 'var(--On-Surface-Variant)'); // Hack to apply class
}

function applyColorDefault() {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, 'var(--On-Surface)'); // Hack to apply class
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
    document.getElementById('insertUnorderedList_checkbox').checked = document.queryCommandState('insertUnorderedList');
    document.getElementById('underline_checkbox').checked = document.queryCommandState('underline');
    document.getElementById('strikethrough_checkbox').checked = document.queryCommandState('strikethrough');
    document.getElementById('blockquote_checkbox').checked = document.queryCommandState('formatBlock', '<blockquote>');


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
        document.getElementById('noteTitle').contentEditable = 'false';
        document.querySelector('.bottom_tool_bar').hidden = true
        document.querySelector('.full-activity-content').style.height = 'calc(100% - 65px - 0px - 20px)'
        document.getElementById('undo_btn_toggle').hidden = true;
        document.getElementById('redo_btn_toggle').hidden = true;
        document.getElementById('ClearNoteContentMenuOption').disabled = true;

    } else{
        editor.contentEditable = 'true';
        document.getElementById('noteTitle').contentEditable = 'true';
        document.querySelector('.bottom_tool_bar').hidden = false
        document.querySelector('.full-activity-content').style.height = 'calc(100% - 65px - 65px - 20px)'
        document.getElementById('undo_btn_toggle').hidden = false;
        document.getElementById('redo_btn_toggle').hidden = false;
        document.getElementById('ClearNoteContentMenuOption').disabled = false;

    }

}

function changeNavStatusConfig(){
    const viewButton = document.querySelector('.view-btn');

    if(viewButton.selected){
        if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
        } else{
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
        }

    } else{
        if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), '0')
        } else{
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), '1')
        }

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

document.getElementById('blockquote_checkbox').addEventListener('input', () =>{
    if(document.getElementById('blockquote_checkbox').checked){
        execCmd('formatBlock', 'blockquote')
    } else{
        execCmd('formatBlock', 'div')

    }
});

function shareContent() {
    window.Android.shareText(document.getElementById('noteTitle').textContent.trim(), document.getElementById('editor').textContent.trim());
}

function insertHR() {
    document.execCommand("insertHorizontalRule", false, null);
    document.execCommand("insertHTML", false, "<br>");
}


