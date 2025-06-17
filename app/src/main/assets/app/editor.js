let openedNoteId = null;
let debounceToolBarTimer

const imageDBName = "NoteImagesDB";
const imageStoreName = "images";


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


function debounceNoteSave(func, delay) {
    let timer
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

const debouncedSaveNoteEditor = debounceNoteSave(saveNote, 300);
const debouncedSaveNoteTitle = debounceNoteSave(saveNote, 300);


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
        debouncedSaveNoteEditor();
});

document.getElementById('noteTitle').addEventListener('input', debouncedSaveNoteTitle)

function saveNote() {
    const title = document.getElementById('noteTitle').innerHTML.trim();
    const content = document.getElementById('editor').innerHTML.trim();
    const noteID = document.querySelector('id').getAttribute('id')
    const lastEdited = Date.now()

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
        notes[existingNoteIndex].lastEdited = lastEdited;
    } else {
        notes.push({ title, content, noteID});
    }

    const timestamp = parseInt(lastEdited);
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString();

    const formattedDate = `Last edited: ${formattedHours}:${minutes}${ampm} - ${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;



    document.getElementById('lastEditedTime').innerHTML = formattedDate

    localStorage.setItem('notes', JSON.stringify(notes));

        displayCreatedTime(parseInt(noteID.split('_')))
        displayEditedTime(parseInt(lastEdited))

    clearEditor();
}

async function displaySavedNotes(note) {

        document.getElementById('noteTitle').innerHTML = note.title;
        document.getElementById('editor').innerHTML = note.content;
        if (document.getElementById('editor').textContent.trim().length > 0 || document.getElementById('editor').querySelector('img') !== null || document.getElementById('editor').querySelector('ul')  || document.getElementById('editor').querySelector('ol') || document.getElementById("editor").querySelector('.table-wrapper')) {
            document.getElementById('placeholderEditor').style.display = 'none';
        }

        if (document.getElementById('noteTitle').textContent.trim().length > 0) {
            document.getElementById('placeholderTitle').style.display = 'none';
        }
     document.querySelector('id').setAttribute('id', note.noteID)

      if(note.pinned){
         document.getElementById('pinThisNoteBtnText').innerHTML = 'Unpin';
         document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark_remove';
     }

          setTimeout(()=>{
             loadNoteLabels(note.noteID)
          }, 100)

        if(note.lastEdited){
        const timestamp = parseInt(note.lastEdited);
          const date = new Date(timestamp);

          const hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = (hours % 12 || 12).toString();

          const formattedDate = `Last edited: ${formattedHours}:${minutes}${ampm} - ${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
          document.getElementById('lastEditedTime').innerHTML = formattedDate
        }

        // --------------------------------------

        displayCreatedTime(parseInt(note.noteID.split('_')))
        if(note.lastEdited){
        displayEditedTime(parseInt(note.lastEdited))
        }



        await rehydrateImagesFromIndexedDB();

}

async function rehydrateImagesFromIndexedDB() {
    const editor = document.getElementById('editor');
    const images = editor.querySelectorAll('img[data-img-id]');

    const tasks = Array.from(images).map(async (img) => {
        img.removeAttribute('src');

        const loadingText = document.createElement('span');
        loadingText.innerHTML =
            `<md-circular-progress indeterminate style="--md-circular-progress-size: 40px;"></md-circular-progress>`;

        img.parentNode.insertBefore(loadingText, img);

        const id = img.getAttribute('data-img-id');
        const blobURL = await getImageURLFromIndexedDB(id);

        // improves loading
        await new Promise(resolve => setTimeout(resolve, 500));

        const tempImg = new Image();
        return new Promise((resolve) => {
            tempImg.onload = () => {
                img.src = blobURL;
                loadingText.remove();
                resolve();
            };
            tempImg.onerror = () => {
                loadingText.textContent = 'Failed to load image.';
                resolve();
            };
            tempImg.src = blobURL;
        });
    });

    await Promise.all(tasks);
}

if(localStorage.getItem('clickedNote')){
    displaySavedNotes(JSON.parse(localStorage.getItem('notes'))[localStorage.getItem('clickedNote')])
        document.querySelector('.view-btn').selected = true;
        toggleView()
        openedNoteId = localStorage.getItem('clickedNoteId')
        setTimeout(() =>{
                localStorage.removeItem('clickedNote')
                localStorage.removeItem('clickedNoteId')
        }, 200)

} else{
    document.querySelector('id').setAttribute('id', Date.now() + '_note')
    openedNoteId = document.querySelector('id').getAttribute('id');

        if(document.getElementById('noteTitle').innerHTML.trim() === "" && document.getElementById('editor').innerHTML.trim() === ""){
            document.getElementById('pinThisNoteBtn').disabled = true;
            document.getElementById('addLabelToThisNoteDialog').disabled = true;
            document.getElementById('shareContentMenuOption').disabled = true
            document.getElementById('ClearNoteContentMenuOption').disabled = true;
        }

    document.querySelector('.bottom_tool_bar').hidden = false

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
        document.querySelector("#editor").dispatchEvent(new Event("input", { bubbles: true }));

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
    document.getElementById('justifyLeft_checkbox').checked = document.queryCommandState('justifyLeft');
    document.getElementById('justifyCenter_checkbox').checked = document.queryCommandState('justifyCenter');
    document.getElementById('justifyRight_checkbox').checked = document.queryCommandState('justifyRight');

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

editor.addEventListener('click', saveCursorPosition);




function insertLink() {
    window.history.back();

    sessionStorage.setItem('insertLinkPressed', true);
}

document.getElementById('openInsertLinkDialog').addEventListener('click', () =>{
        sessionStorage.removeItem('insertLinkPressed')
    document.getElementById('linkURLInput').value = ''
    document.getElementById('linkTitleInput').value = ''
    document.getElementById('insertLinkDialog').show();
    window.history.pushState({ InsertLinkDialogOpen: true }, "");
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
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

document.getElementById('insertLinkDialog').addEventListener('closed', () =>{
    if(sessionStorage.getItem('insertLinkPressed') === 'true' || sessionStorage.getItem('insertLinkPressed') === true){
            addLinkIfAdded()
    }
})

document.getElementById('insertLinkDialog').addEventListener('close', () =>{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210');
})

function addLinkIfAdded(){
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
        const link = `<a style="-webkit-user-drag: none;" href="${document.getElementById('linkURLInput').value}" target="_blank">${document.getElementById('linkTitleInput').value}</a>`;
        document.execCommand('insertHTML', false, link);
    }, 200);

}


function toggleView() {
    clearTimeout(debounceToolBarTimer)

    const editor = document.getElementById('editor');
    const viewButton = document.querySelector('.view-btn');

    if(viewButton.selected){
        document.querySelector('.bottom_tool_bar').style.transform = 'translateY(100%)';
        document.querySelector('.bottom_tool_bar').style.opacity = '0';
        editor.contentEditable = 'false';
        document.getElementById('noteTitle').contentEditable = 'false';
       document.querySelector('.full-activity-content').style.height = 'calc(100% - 65px - 20px - 0px)'
       document.querySelector('.full-activity-content').style.paddingBottom = '20px'
        document.getElementById('undo_btn_toggle').hidden = true;
        document.getElementById('redo_btn_toggle').hidden = true;
        document.getElementById('ClearNoteContentMenuOption').disabled = true;
        debounceToolBarTimer = setTimeout(() =>{
        document.querySelector('.bottom_tool_bar').hidden = true
        }, 500);
    } else{

        document.querySelector('.bottom_tool_bar').style.transform = '';
        document.querySelector('.bottom_tool_bar').style.opacity = '';
        editor.contentEditable = 'true';
        document.getElementById('noteTitle').contentEditable = 'true';
        document.querySelector('.bottom_tool_bar').hidden = false
       document.querySelector('.full-activity-content').style.height = 'calc(100% - 65px - 100px - 0px)'
       document.querySelector('.full-activity-content').style.paddingBottom = '100px'
        document.getElementById('undo_btn_toggle').hidden = false;
        document.getElementById('redo_btn_toggle').hidden = false;
        if(document.getElementById('noteTitle').innerHTML.trim() !== "" && document.getElementById('editor').innerHTML.trim() !== ""){
            document.getElementById('ClearNoteContentMenuOption').disabled = false;
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

if(localStorage.getItem('SelectedAPPfont') === 'roboto'){
    document.getElementById('editor').classList.add('usingInter');
    document.getElementById('placeholderEditor').classList.add('usingInter');
} else{
    document.documentElement.setAttribute('sys-font', ' ');
    document.getElementById('editor').classList.remove('usingInter');
    document.getElementById('placeholderEditor').classList.remove('usingInter');
}

if(localStorage.getItem('Showscrollbar') === 'true'){
    document.querySelector('.full-activity-content-note_editor').classList.add('useScrollbar');
} else{
    document.querySelector('.full-activity-content-note_editor').classList.remove('useScrollbar');

}



// -------------------------------------------

function openImageDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(imageDBName, 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore(imageStoreName);
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function () {
            reject("Error opening IndexedDB");
        };
    });
}

async function saveImageToIndexedDB(blob) {
    const db = await openImageDB();
    const tx = db.transaction(imageStoreName, "readwrite");
    const store = tx.objectStore(imageStoreName);
    const id = Date.now().toString();
    store.put(blob, id);
    return new Promise((resolve) => {
        tx.oncomplete = () => resolve(id);
    });
}

async function getImageURLFromIndexedDB(id) {
    const db = await openImageDB();
    const tx = db.transaction(imageStoreName, "readonly");
    const store = tx.objectStore(imageStoreName);
    const request = store.get(id);
    return new Promise((resolve) => {
        request.onsuccess = () => {
            const blob = request.result;
            const url = URL.createObjectURL(blob);
            resolve(url);
        };
    });
}


// -------------------------------------------


let imageBlob = null;

function openImageSizeDialog(name) {
const existingSheet = document.getElementById('imageSizeSheet');
    if (existingSheet) {
        existingSheet.remove();
    }

    let sheetHtml

    if(name === 'table'){
     sheetHtml = `
                  <bottom-sheet id="imageSizeSheet">
                <close-touch-sheet></close-touch-sheet>
                <bottom-sheet-content>
                <handle></handle>
                <p style="color: var(--On-Surface); font-size: 20px; font-family: var(--google-normal); margin: 0; padding-bottom: 10px; text-align: center;">Select table size</p>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; padding-top: 10px;">
                    <md-text-button onclick="insertPresetTable(2, 2)">
                        2 x 2
                    </md-text-button>
                    <md-text-button onclick="insertPresetTable(3, 3)">
                        3 x 3
                    </md-text-button>
                    <md-text-button onclick="insertPresetTable(4, 4)">
                        4 x 4
                    </md-text-button>
                    <md-text-button onclick="insertPresetTable(5, 2)">
                        5 x 2
                    </md-text-button>
                    <md-text-button onclick="insertPresetTable(2, 5)">
                        2 x 5
                    </md-text-button>
                    <md-text-button onclick="insertPresetTable(10, 6)">
                        10 x 6
                    </md-text-button>
                </div>
                <div style="padding: 16px; display: flex; gap: 10px; border-top: 1px solid var(--Outline-Variant); margin-top: 10px; justify-content: flex-end;">
                <md-filled-button id="canceltableBtn" >
                    Cancel
                </md-filled-button>
                </div>
                </content-holder-sheet>
                </bottom-sheet-content>
                </bottom-sheet>
`
    } else{
 sheetHtml = `
                    <bottom-sheet id="imageSizeSheet">
                <close-touch-sheet></close-touch-sheet>
                <bottom-sheet-content>
                <handle></handle>
                <p style="color: var(--On-Surface); font-size: 20px; font-family: var(--google-normal); margin: 0; padding-bottom: 10px; text-align: center;">Select image size</p>
                <md-list-item list-type="radio">
                <md-radio slot="start" value="small" name="imageSize" id="small_radio_ripple"></md-radio>
                <div slot="headline">Small</div>
                <label for="small_radio_ripple" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;" slot="end"><md-ripple></md-ripple></label>
                </md-list-item>
                <md-list-item list-type="radio">
                <md-radio slot="start" value="medium" name="imageSize" id="medium_radio_ripple"></md-radio>
                <div slot="headline">Medium</div>
                <label for="medium_radio_ripple" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;" slot="end"><md-ripple></md-ripple></label>
                </md-list-item>
                <md-list-item list-type="radio">
                <md-radio slot="start" value="original" name="imageSize" id="original_radio_ripple" checked></md-radio>

                <div slot="headline">Original</div>
                <label for="original_radio_ripple" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;" slot="end"><md-ripple></md-ripple></label>
                </md-list-item>
                <div style="padding: 16px; display: flex; gap: 10px; border-top: 1px solid var(--Outline-Variant); margin-top: 10px;">
                <md-outlined-button id="cancelImageBtn"  style="width: 100%;">
                    Cancel
                </md-outlined-button>
                <md-filled-button id="confirmImageBtn" style="width: 100%;">
                    Add Image
                </md-filled-button>
                </div>
                </content-holder-sheet>
                </bottom-sheet-content>
                </bottom-sheet>
`
}
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-Low'), '0colorOnly', '225');
    window.history.pushState({ ImageSizeSheetOpen: true }, "");

    document.querySelector('.full-activity').insertAdjacentHTML('beforeend', sheetHtml);

    setTimeout(() => {
        document.getElementById('imageSizeSheet').show();

        if(document.getElementById('cancelImageBtn')){
        document.getElementById('cancelImageBtn').addEventListener('click', () => {
            window.history.back();
        });
    }
        if(document.getElementById('canceltableBtn')){
        document.getElementById('canceltableBtn').addEventListener('click', () => {
            window.history.back();
        });
    }

        if(document.getElementById('confirmImageBtn')){
        document.getElementById('confirmImageBtn').addEventListener('click', () => {
            addImage();
        });
    }
    }, 0);



document.getElementById("imageSizeSheet").addEventListener("closing", () => {
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '200')
  });

  document.getElementById("imageSizeSheet").addEventListener("closed", () => {
      if (window.history.state && window.history.state.NoteInfoSheetOpen === true) {
        window.history.back();
    } else {
        console.log("imageSizeSheet is not open.");
    }
  })
}


window.addEventListener("popstate", function (event) {
    if (document.getElementById("imageSizeSheet").hasAttribute('open')) {
      document.getElementById("imageSizeSheet").close();
    }
  });



function addImage() {

  const radios = document.querySelectorAll('md-radio[name="imageSize"]');
 let selectedImageSize = 'original';

    radios.forEach(radio => {
        if (radio.checked) {
            selectedImageSize = radio.value || 'original';
            console.log(radio.value)
        }
    });
    restoreCursorPosition();


    if (imageBlob) {


        setTimeout(() => {
            restoreCursorPosition();
        }, 50);

        setTimeout(() => {

        insertImageWithSize(imageBlob, selectedImageSize);
        console.log(imageBlob, selectedImageSize)
    }, 100);

    } else {
        console.error("No image selected.");
    }

     window.history.back();
}


 function insertPresetTable(rows, cols) {
    let tableHTML = '<div class="table-wrapper"><table>';
    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHTML += "<td>&nbsp;</td>";
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table></div>";
    restoreCursorPosition();

            setTimeout(() => {
            restoreCursorPosition();
        }, 50);

        setTimeout(() => {
    document.execCommand('insertHTML', false, tableHTML);
    }, 100);

     window.history.back();

  }


function insertImageWithSize(imageBlobObj, size) {
    let img = document.createElement('img');
    console.log(imageBlobObj.url)
    img.src = imageBlobObj.url;
    img.setAttribute('data-img-id', imageBlobObj.id);

    switch (size) {
        case "small":
            img.style.width = "100px";
            break;
        case "medium":
            img.style.width = "300px";
            break;
        case "original":
            img.style.width = "100%";
            break;
    }

    img.style.height = "auto";
    document.execCommand('insertHTML', false, img.outerHTML);
}

document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];



    if (file) {
            imageBlob = file;

            const imageId = await saveImageToIndexedDB(imageBlob);

            const imageURL = URL.createObjectURL(imageBlob);

            openImageSizeDialog();

            imageBlob = { url: imageURL, id: imageId };

            event.target.value = '';

    }
});

document.getElementById('openInsertTableSheet').addEventListener('click', () =>{
    openImageSizeDialog('table')
})

function scrollToBottom() {
  const container = document.querySelector('.full-activity-content');
  const scrollThreshold = 80;

  const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;

  if (distanceFromBottom <= scrollThreshold) {
    container.scrollTop = container.scrollHeight;
  }
}

editor.addEventListener('input', scrollToBottom);
