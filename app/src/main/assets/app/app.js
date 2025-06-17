const Search_notes_input = document.getElementById('Search_notes_input');
const Search_notes_inputWrapper = document.getElementById('Search_notes_input_wrapper');

let debounceSearchTimer
let debounceSearchBackTimer
let onLoadElements = false;

Search_notes_inputWrapper.addEventListener('click', () =>{
    if(document.querySelector('.search_container_screen').hidden){
    if(document.getElementById('deleteNoteBtn').hidden){
        clearTimeout(debounceSearchTimer)
    document.querySelector('.search_container_screen').style.borderRadius = ''
    document.querySelector('.search_container_screen').hidden = false
    window.history.pushState({ SearchContainerOpen: true }, "");
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '20')
    document.getElementById('backSearchBtn').hidden = false;
    document.getElementById('backSearchBtnIconSearch').hidden = true;
    document.querySelector('.header_search').classList.add('enabled');
           Search_notes_input.blur();
        debounceSearchTimer = setTimeout(() =>{
            Search_notes_input.focus();
        }, 500);
       debounceSearchTimer = setTimeout(() => {
                document.querySelector('.search_container_screen').style.borderRadius = 'unset'
                     sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), Themeflag, '200')

        }, 400);
  } else{
       Search_notes_input.blur();
     }
 }
})

window.addEventListener("popstate", function (event) {
    const deleteCheckboxes = document.querySelectorAll('.noteCheckboxWrap');

    if(!document.querySelector('.search_container_screen').hidden){
        deleteCheckboxes.forEach((checkbox) =>{
            if(!checkbox.hidden){
               setTimeout(() => {
                    window.history.back();
               }, 100);
            }
        })
    }

    if(!document.querySelector('.search_container_screen').hidden){
        clearTimeout(debounceSearchBackTimer)
    document.querySelector('.search_container_screen').style.height = 'calc(0% + 76.5px)'
    document.querySelector('.search_container_screen').style.borderRadius = ''
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-High'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag)
    document.body.style.pointerEvents = 'none'
        Search_notes_input.blur();
        document.getElementById('notesContainerSearched').innerHTML = '';

       debounceSearchBackTimer =   setTimeout(() =>{
        document.querySelector('.search_container_screen').hidden = true;
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag)
        document.querySelector('.header_search').classList.remove('enabled');
        document.getElementById('backSearchBtnIconSearch').hidden = false;
        document.querySelector('.search_container_screen').style.height = ''
        document.getElementById('backSearchBtn').hidden = true;
        document.getElementById('Search_notes_input').value = ''
        document.body.style.pointerEvents = ''
      }, 300);
    }

       deleteCheckboxes.forEach((checkbox) =>{
       if(sessionStorage.getItem('DeleteAlertDialogOpen') === "false" || !sessionStorage.getItem('DeleteAlertDialogOpen')){
        if(!checkbox.hidden){
            checkbox.hidden = true;
            document.getElementById('backSearchBtn').hidden = true;
            document.getElementById('backSearchBtnIconSearch').hidden = false;
            document.getElementById('deleteNoteBtn').hidden = true;
            document.getElementById('deleteNoteBtn').disabled = true;
            document.getElementById('restoreNoteBtn').hidden = true
            document.getElementById('restoreNoteBtn').disabled = true
            document.querySelector('#textheadingNotes').innerHTML = `Notes`;

              if(JSON.parse(localStorage.getItem('notesLabels'))){
              JSON.parse(localStorage.getItem('notesLabels')).forEach((label, index) => {
                if(!label.locked){
                    document.querySelector(`[label="${label.label}"]`).disabled = false
                }
            });
            disabledLockedLabels()

            }
        }
    }

       });

       const notes_ripple_elems = document.querySelectorAll('.notes_ripple_elem');

          notes_ripple_elems.forEach((notes_ripple_elem) =>{
           notes_ripple_elem.hidden = false;
       })




})
let hiddenNote = '';
let hiddenNoteMargin = '';
let isImportant = '';
let debounceCheckbox
let debounceListeners

function createNoteTile(){
    clearTimeout(debounceListeners)
    debounceListeners = setTimeout(() =>{
        loadCheckboxListeners()
        disableEnableDeleteBtn()
    }, 200);
        if(localStorage.getItem('onlyShowTitle') && localStorage.getItem('onlyShowTitle') === 'true'){
        if(localStorage.getItem('SelectedNotesView') !== 'list_view'){
            hiddenNote = 'hidden'
            hiddenNoteMargin = 'margin-bottom: 0px;'
            isImportant = '!important';
        }
        } else{
            hiddenNote = ''
            hiddenNoteMargin = ''
            isImportant = '';
        }
        const savedNotesList = document.getElementById('savedNotesList');
        const pinnedNotesList = document.getElementById('pinnedNotesList');

    while (savedNotesList.firstChild) savedNotesList.removeChild(savedNotesList.firstChild);
    while (pinnedNotesList.firstChild) pinnedNotesList.removeChild(pinnedNotesList.firstChild);
    const binList = document.getElementById('binNotesList');
    while (binList.firstChild) binList.removeChild(binList.firstChild);

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => {
            if (note.title.trim() === "" && note.content.trim() === "") {
                return false;
            }
            return true;
        });
        localStorage.setItem('notes', JSON.stringify(notes));
        displayWaterMark()

        const savedFragment = document.createDocumentFragment();
        const pinnedFragment = document.createDocumentFragment();
        const binFragment = document.createDocumentFragment();

        notes.forEach((note, index) => {
            const noteTile = document.createElement('noteTileWrap');
              noteTile.setAttribute('noteID', note.noteID)

            const timestamp = parseInt(note.noteID.split('_')[0]);
            const date = new Date(timestamp);

            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

                    const tempDiv = document.createElement('imgDivTempID');
                    tempDiv.innerHTML = note.content;
                    const imgIds = [];
                    tempDiv.querySelectorAll('img').forEach(img => {
                        const alt = img.getAttribute('data-img-id');
                        if (alt) {
                            imgIds.push(alt);
                        }
                    });
                    if (imgIds.length > 0) {
                        noteTile.setAttribute('hasImg-ids', imgIds.join(','));
                    }

                if(note.binNote){
                    noteTile.classList.add('deletedBinNote')
                } else{
                    noteTile.classList.remove('deletedBinNote')
                }
                let hiddenNoteMarginNocontent
                if(note.content === ""){
                    hiddenNoteMarginNocontent = 'margin-bottom: 0px;';
                } else{
                    hiddenNoteMarginNocontent = '';
                }
            noteTile.innerHTML = `
                <label class="noteCheckboxWrap" hidden onclick="event.stopPropagation();">
                  <check_label>
                  <md-checkbox class="noteCheckbox" data-id="${note.noteID}" style="border-radius: 50px;"></md-checkbox></check_label>
                </label>
                <p style="${hiddenNoteMargin} ${hiddenNoteMarginNocontent} ${stripHtmlTags(note.content) === "" && note.title === "" ? 'color: var(--Secondary); font-style: italic' : ''}">${note.title}${stripHtmlTags(note.content) === "" && note.title === "" ? 'Empty note' : ''}</p>
                <span ${hiddenNote}>${stripHtmlTags(note.content)}</span>
                <time>Created: ${formattedDate}</time>
                <md-ripple class="notes_ripple_elem"></md-ripple>
            `


            noteTile.addEventListener('click', function() {
                if(note.binNote){
                    document.getElementById('selectedNoteRestoreBtn').hidden = true;
                    document.getElementById('singleNoteRestoreBtn').hidden = false;
                    document.getElementById('singleNoteRestoreBtn').setAttribute('noteData', JSON.stringify(note))
                    showRestoreAlertDialog();
                    return
                }
                localStorage.setItem('clickedNote', index)
                localStorage.setItem('clickedNoteId', note.noteID)

                navigateActivity('NotesViewActivity')
            });

                        document.querySelectorAll('imgDivTempID').forEach((div) =>{
                            div.remove();
                        })


                if (note.pinned) {
                    pinnedFragment.appendChild(noteTile);
                } else if (note.binNote){
                    binFragment.appendChild(noteTile)
                    checkIfTimeExceeded()
                    console.log('started')
                } else {
                    savedFragment.appendChild(noteTile);
                }


        });

                if(notes.filter(note => note.pinned).length < 1 ){
                    document.querySelector('.saved-notesPinned').hidden = true;
                } else{
                    document.querySelector('.saved-notesPinned').hidden = false;
                }


                clearTimeout(debounceCheckbox)
               debounceCheckbox = setTimeout(() => {
                    document.querySelectorAll('md-checkbox').forEach(mdCheckbox => {
                        if (mdCheckbox.shadowRoot) {
                            const checkbox = mdCheckbox.shadowRoot.querySelector('input[type="checkbox"]');
                            checkbox.style.width = '18px'
                            checkbox.style.height = '18px'

                        } else {
                            console.warn('No shadowRoot found for', mdCheckbox);
                        }
                    });
                }, 500);

                            savedNotesList.appendChild(savedFragment);
                    pinnedNotesList.appendChild(pinnedFragment);
                    binNotesList.appendChild(binFragment);
     document.querySelectorAll('md-filter-chip').forEach(chip => {
            chip.removeAttribute('selected');
        });
        if(!onLoadElements){
        createLabels()
        onLoadElements = true
        }
        hideLockedLabelNotes()
        cleanUnusedImagesFromIndexedDB()

if(JSON.parse(localStorage.getItem('notesLabels'))){
      JSON.parse(localStorage.getItem('notesLabels')).forEach((label, index) => {
        if(!label.locked){
            document.querySelector(`[label="${label.label}"]`).disabled = false
        }
    });
}

}

document.addEventListener('DOMContentLoaded', () =>{
    setTimeout(() =>{
        createNoteTile()
    }, 300);
});


function deleteSelectedNotes() {
    if(document.querySelector('md-filter-chip[label="Bin"]').selected){
        PermanentdeleteSelectedNotes()
        return
    }
    const checkboxes = document.querySelectorAll('.noteCheckbox');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const noteID = checkbox.dataset.id;
            const noteIndex = notes.findIndex(note => note.noteID === noteID);

            if (noteIndex !== -1) {
                notes[noteIndex].prevPinned = notes[noteIndex].pinned;
                notes[noteIndex].binNote = true;
                notes[noteIndex].pinned = false;
            }
        }
    });

    checkboxes.forEach(checkbox => checkbox.hidden = true);
    document.getElementById('backSearchBtn').hidden = true;
    document.getElementById('backSearchBtnIconSearch').hidden = false;
    document.getElementById('deleteNoteBtn').hidden = true;
    document.getElementById('deleteNoteBtn').disabled = true;
    document.getElementById('restoreNoteBtn').hidden = true
    document.getElementById('restoreNoteBtn').disabled = true
    document.querySelector('#textheadingNotes').innerHTML = `Notes`;

    localStorage.setItem('notes', JSON.stringify(notes));
    createNoteTile();
    displayWaterMark();
    window.history.back();
     ShowSnackMessage.ShowSnack('Moved to the bin', 'short');
    window.dispatchEvent(new CustomEvent('localNotesUpdated', {
     detail: { key: 'notes', newValue: notes }
 }));
}


function PermanentdeleteSelectedNotes() {
    const checkboxes = document.querySelectorAll('.noteCheckbox');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const checkedNoteIDs = new Set(
        [...checkboxes]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.id)
    );

    const updatedNotes = notes.filter(note => !checkedNoteIDs.has(note.noteID));

    checkboxes.forEach(checkbox => checkbox.hidden = true);
    document.getElementById('backSearchBtn').hidden = true;
    document.getElementById('backSearchBtnIconSearch').hidden = false;
    document.getElementById('deleteNoteBtn').hidden = true;
    document.getElementById('deleteNoteBtn').disabled = true;
    document.getElementById('restoreNoteBtn').hidden = true
    document.getElementById('restoreNoteBtn').disabled = true
    document.querySelector('#textheadingNotes').innerHTML = `Notes`;

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    createNoteTile();
    displayWaterMark();
    window.history.back();
    showAllNotes();
    document.getElementById('savedNotesList').style.height = '';
    document.getElementById('savedNotesList').style.overflow = '';
    document.getElementById('savedNotesList').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.height = '';
    document.querySelector('.saved-notesPinned').style.overflow = '';
    document.querySelector('.saved-notesPinned').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.padding = '';
    document.getElementById('binNotesList').style.height = '0'
    document.getElementById('binNotesList').style.pointerEvents = 'none'
       window.dispatchEvent(new CustomEvent('localNotesUpdated', {
        detail: { key: 'notes', newValue: notes }
    }));
}

let holdTimer
function loadCheckboxListeners(){

const deleteCheckboxes = document.querySelectorAll('.noteCheckboxWrap');
const noteTilesAll = document.querySelectorAll('noteTileWrap');
const notes_ripple_elems = document.querySelectorAll('.notes_ripple_elem');
const Checkboxes = document.querySelectorAll('.noteCheckbox');

noteTilesAll.forEach((noteTile) =>{
noteTile.addEventListener('touchstart', () =>{
            clearTimeout(holdTimer)

    holdTimer = setTimeout(() =>{
        notes_ripple_elems.forEach((notes_ripple_elem) =>{
            notes_ripple_elem.hidden = true;
        })
        Checkboxes.forEach((Checkbox) =>{
            Checkbox.checked = false;
        })
        deleteCheckboxes.forEach((checkbox) =>{
            checkbox.addEventListener('touchstart', (event) =>{
                event.stopPropagation()
            })
            checkbox.hidden = false;
            document.getElementById('backSearchBtn').hidden = false;
            document.getElementById('backSearchBtnIconSearch').hidden = true;
            document.getElementById('deleteNoteBtn').hidden = false;
        });
             if(document.querySelector('md-filter-chip[label="Bin"]').selected){
                 document.getElementById('restoreNoteBtn').hidden = false
             } else{
                 document.querySelector('md-filter-chip[label="Bin"]').disabled = true
                 document.getElementById('restoreNoteBtn').hidden = true
                 document.getElementById('restoreNoteBtn').disabled = true
             }

            window.history.pushState({ SelectionOpen: true }, "");
            disabledLockedLabels()
            document.querySelector('selectedCount').innerHTML = `0`
    }, 1000)
})

noteTile.addEventListener('touchend', () =>{
    clearTimeout(holdTimer)
});
noteTile.addEventListener('touchmove', () =>{
    clearTimeout(holdTimer)
});

});
}
function displayWaterMark(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const activeNotes = notes.filter(note => !note.binNote);

    if (activeNotes.length > 0) {
        document.querySelector('.water_mark').hidden = true;
    } else {
        document.querySelector('.water_mark').hidden = false;
        document.querySelector('.saved-notesPinned').hidden = true;
    }

}

displayWaterMark()

// search......



function searchNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedLabelsLocked = JSON.parse(localStorage.getItem('notesLabels')) || [];
    const noteLabelsLocked = JSON.parse(localStorage.getItem('noteLabels')) || {};
    const query = document.getElementById('Search_notes_input').value.toLowerCase();
    const container = document.getElementById('notesContainerSearched');
    container.innerHTML = "";

    if (query === "") return;

    const filtered = notes
    .map((note, originalIndex) => ({ ...note, originalIndex }))
    .filter(note => {
        const labels = noteLabelsLocked[note.noteID] || [];
        const isBinNote = note.binNote === true;
        const hasLockedLabel = savedLabelsLocked.some(labelObj =>
            labelObj.locked && labels.includes(labelObj.label)
        );
        return note.title.toLowerCase().includes(query) && !isBinNote && !hasLockedLabel;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<error style='color: var(--On-Surface); margin-left: 15px;'>No matching notes found.</error>";
        return;
    }

    filtered.forEach(note => {
        const searchedItem = document.createElement('SearchedNote');

        const timestamp = parseInt(note.noteID.split('_')[0]);
        const date = new Date(timestamp);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

        searchedItem.innerHTML = `
        <p>${note.title}</p>
        <p_content>${stripHtmlTags(note.content)}</p_content>
        <span>Created: ${formattedDate}</span>
        <md-ripple></md-ripple>
        `;

        searchedItem.addEventListener('click', () => {
            localStorage.setItem('clickedNote', note.originalIndex);
            localStorage.setItem('clickedNoteId', note.noteID)
            navigateActivity('NotesViewActivity');
            setTimeout(() => {
                window.history.back();
            }, 200);
        });

        container.appendChild(searchedItem);
    });
}



document.getElementById('Search_notes_input').addEventListener('input', searchNotes)

function stripHtmlTags(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    tempElement.querySelectorAll('br').forEach(br => br.replaceWith('\n'));

    const blockElements = [
        'p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol',
        'header', 'footer', 'section', 'article', 'aside', 'address', 'blockquote',
        'pre', 'figure', 'figcaption', 'nav', 'main', 'details', 'summary',
        'dt', 'dd', 'fieldset', 'legend'
    ];

    tempElement.querySelectorAll(blockElements.join(', ')).forEach(el => {
        el.appendChild(document.createTextNode('\n'));
    });

    let textContent = tempElement.textContent || tempElement.innerText || '';

    return textContent.replace(/\n\s*\n/g, '\n').trim();
}


// check delete btn

function disableEnableDeleteBtn() {
    const checkboxes = document.querySelectorAll('.noteCheckbox');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

            if (checkedCount < 1) {
                document.getElementById('deleteNoteBtn').disabled = true;
                document.getElementById('restoreNoteBtn').disabled = true
            } else {
                document.getElementById('deleteNoteBtn').disabled = false;
                document.getElementById('restoreNoteBtn').disabled = false
            }
            document.querySelector('selectedCount').innerHTML = `${checkedCount}`
        });
    });
}

// --------


function showDeleteAlertDialog(){
    if(document.querySelector('md-filter-chip[label="Bin"]').selected){
        document.getElementById('deleteNoteHeadline').innerHTML = 'Delete Notes Permanently?'
        document.getElementById('deleteNoteContent-Text').innerHTML = "Notes will be deleted permanently. This action can't be undone."
    } else{
        document.getElementById('deleteNoteHeadline').innerHTML = 'Delete Notes?'
        document.getElementById('deleteNoteContent-Text').innerHTML = "Notes will be moved to the bin. You can restore them from there"
    }
    document.getElementById('deleteNoteAlert').show();
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');

    window.history.pushState({ DeleteAlertDialogOpen: true }, "");
    sessionStorage.setItem('DeleteAlertDialogOpen', "true");

}


window.addEventListener("popstate", function (event) {
    if(document.getElementById('deleteNoteAlert').open){
        document.getElementById('deleteNoteAlert').close();
    }
});

document.getElementById('deleteNoteAlert').addEventListener('cancel', () =>{
    document.getElementById('deleteNoteAlert').addEventListener('closed', () =>{
        window.history.back()
    })
})


document.getElementById('deleteNoteAlert').addEventListener('close', () =>{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
})

document.getElementById('deleteNoteAlert').addEventListener('closed', () =>{
    setTimeout(() =>{
        sessionStorage.setItem('DeleteAlertDialogOpen', "false");
    }, 200);
})

//-------------------------

function showRestoreAlertDialog(){
    document.getElementById('restoreNoteAlert').show();
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');

    window.history.pushState({ RestoreAlertDialogOpen: true }, "");
    sessionStorage.setItem('DeleteAlertDialogOpen', "true");

}


window.addEventListener("popstate", function (event) {
    if(document.getElementById('restoreNoteAlert').open){
        document.getElementById('restoreNoteAlert').close();
    }
});

document.getElementById('restoreNoteAlert').addEventListener('cancel', () =>{
    document.getElementById('restoreNoteAlert').addEventListener('closed', () =>{
        window.history.back()

        document.getElementById('selectedNoteRestoreBtn').hidden = false;
        document.getElementById('singleNoteRestoreBtn').hidden = true;
    })
})


document.getElementById('restoreNoteAlert').addEventListener('close', () =>{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
})

document.getElementById('restoreNoteAlert').addEventListener('closed', () =>{
    setTimeout(() =>{
        sessionStorage.setItem('DeleteAlertDialogOpen', "false");
    }, 200);
})


// labels

let selectedLabelLocked = null
let labelWasSelected = false

function createLabels(){
if (JSON.parse(localStorage.getItem('notesLabels')) || !JSON.parse(localStorage.getItem('notesLabels'))) {
    const savedLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    const label_holder = document.getElementById('label_holder');
    label_holder.innerHTML = ""

    const binLabel = { label: "Bin", locked: false, bin: true };

  const binExists = savedLabels.some(label => label.label === "Bin" && label.bin === true);

    if (!binExists) {
        savedLabels.push(binLabel);
        localStorage.setItem('notesLabels', JSON.stringify(savedLabels));
        console.log('saved')
    }


    savedLabels.forEach((label, index) => {
        const label_item = document.createElement('md-filter-chip');
        label_item.setAttribute('label', label.label);
        label_item.setAttribute("data-id", index + 1);

        if(label.locked){
            const createLabelLockedIcon = document.createElement('md-icon');
            createLabelLockedIcon.setAttribute('icon-outlined', '')
            createLabelLockedIcon.setAttribute('slot', 'icon')
            createLabelLockedIcon.innerHTML = 'lock'
            label_item.appendChild(createLabelLockedIcon)
        }

        if(label.bin){
            const createLabelBinIcon = document.createElement('md-icon');
            createLabelBinIcon.setAttribute('icon-outlined', '')
            createLabelBinIcon.setAttribute('slot', 'icon')
            createLabelBinIcon.innerHTML = 'auto_delete'
            label_item.appendChild(createLabelBinIcon)

        }

        if(label.isFolder){
            const createLabelFolderIcon = document.createElement('md-icon');
            createLabelFolderIcon.setAttribute('icon-outlined', '')
            createLabelFolderIcon.setAttribute('slot', 'icon')
            createLabelFolderIcon.innerHTML = 'folder'
            label_item.appendChild(createLabelFolderIcon)
        }

        label_item.addEventListener('click', () => {
            const isSelected = label_item.hasAttribute('selected');
            label_holder.querySelectorAll('md-filter-chip').forEach(chip => {
                chip.removeAttribute('selected');
            });
            if (!isSelected) {
                if(label.locked){
                    selectedLabelLocked = { element: label_item, label: label };
                    if(localStorage.getItem('useFingerPrint') === 'true'){
                        AndroidFunctionActivityInterface.androidFunction('ShowBiometric');
                    } else{
                    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
                    document.getElementById('enterPinDialog').show();
                    window.history.pushState({ enterPinDialogOpen: true }, "");
                    }
                    document.getElementById('LockedNotepinInput').value = ''
                     document.getElementById('LockedNotepinInput').error = false;
                    setTimeout(() =>{
                        label_item.removeAttribute('selected')
                    }, 100);
                    return
                }
                    if(label.locked){
//                    do nothing!
                    } else if (label.bin){
//                    do nothing! ezz
                    } else{
                        localStorage.setItem('lastSelectedLabelId', label.label)
                    }
                if(label.bin){
                    document.getElementById('savedNotesList').style.height = '0';
                    document.getElementById('savedNotesList').style.overflow = 'hidden';
                    document.getElementById('savedNotesList').style.pointerEvents = 'none';
                    document.querySelector('.saved-notesPinned').style.height = '0';
                    document.querySelector('.saved-notesPinned').style.overflow = 'hidden';
                    document.querySelector('.saved-notesPinned').style.pointerEvents = 'none';
                    document.querySelector('.saved-notesPinned').style.padding = '0';
                    document.getElementById('binNotesList').style.height = ''
                    document.getElementById('binNotesList').style.pointerEvents = ''
                    document.querySelector('.water_mark').hidden = true
                    showWaterMarkONBin('bin')

                    return
                }
//                skip bin label
                if(!label.bin){
                document.getElementById('savedNotesList').style.height = '';
                document.getElementById('savedNotesList').style.overflow = '';
                document.getElementById('savedNotesList').style.pointerEvents = '';
                document.querySelector('.saved-notesPinned').style.height = '';
                document.querySelector('.saved-notesPinned').style.overflow = '';
                document.querySelector('.saved-notesPinned').style.pointerEvents = '';
                document.querySelector('.saved-notesPinned').style.padding = '';
                document.getElementById('binNotesList').style.height = '0'
                document.getElementById('binNotesList').style.pointerEvents = 'none'
                }
                if(label.isFolder){
                    document.querySelectorAll('.hiddenNoteLabelFolder').forEach((hiddenLockedEl) =>{
                        hiddenLockedEl.classList.remove('hiddenNoteLabelFolder')
                    })
                    label_item.setAttribute('selected', '');
                    filterNotesByLabel(label.label);
                    showWaterMarkONBin()
                    return
                }
                label_item.setAttribute('selected', '');
                filterNotesByLabel(label.label);
                hideLockedLabelNotes()
                showWaterMarkONBin()
            } else {
                showAllNotes();
                document.getElementById('savedNotesList').style.height = '';
                document.getElementById('savedNotesList').style.overflow = '';
                document.getElementById('savedNotesList').style.pointerEvents = '';
                document.querySelector('.saved-notesPinned').style.height = '';
                document.querySelector('.saved-notesPinned').style.overflow = '';
                document.querySelector('.saved-notesPinned').style.pointerEvents = '';
                document.querySelector('.saved-notesPinned').style.padding = '';
                document.getElementById('binNotesList').style.height = '0'
                document.getElementById('binNotesList').style.pointerEvents = 'none'
            }
        });

        label_holder.appendChild(label_item);
    });
    if(!labelWasSelected){
    selectRememberedLabel()
    }

    function selectRememberedLabel(){
        if(localStorage.getItem('RememberLastLabelS') && localStorage.getItem('RememberLastLabelS') === 'true'){
            if(localStorage.getItem('lastSelectedLabelId')){
                if(document.querySelector(`[label="${localStorage.getItem('lastSelectedLabelId')}"]`)){
                    setTimeout(() => {
                    document.querySelector(`[label="${localStorage.getItem('lastSelectedLabelId')}"]`).click()
                    }, 100);
                    setTimeout(() => {
                        document.querySelector(`[label="${localStorage.getItem('lastSelectedLabelId')}"]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                        labelWasSelected = true
                        document.querySelector('empty_note')?.remove()
                    }, 200);
                }
            }
        } else{
            document.querySelector('empty_note')?.remove()
        }
    }
}


    async function initializeDragAndDropAllEL() {
        const draggableContainer = document.getElementById('label_holder');
        const storageKey = 'dragAndDropState';

        async function saveOrder() {
            const itemsOrder = Array.from(draggableContainer.children).map(element => element.dataset.id);
            localStorage.setItem(storageKey, JSON.stringify(itemsOrder));
        }

        async function loadOrder() {
            const storedState = localStorage.getItem(storageKey);
            if (storedState) {
                const itemsOrder = JSON.parse(storedState);
                const elements = Array.from(draggableContainer.children);

                itemsOrder.forEach(id => {
                    const element = elements.find(el => el.dataset.id === id);
                    if (element) {
                        draggableContainer.appendChild(element);
                    }
                });
            }
        }
        await loadOrder();
      }
      initializeDragAndDropAllEL()

}

window.addEventListener("popstate", function (event) {
    if(document.getElementById('enterPinDialog').open){
        document.getElementById('enterPinDialog').close();
    }
});

document.getElementById('enterPinDialog').addEventListener('cancel', () =>{
    document.getElementById('enterPinDialog').addEventListener('closed', () =>{
        window.history.back()

    })
})


document.getElementById('enterPinDialog').addEventListener('close', () =>{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
})

function filterNotesByLabel(selectedLabel) {
    let noteLabels = JSON.parse(localStorage.getItem('noteLabels')) || {};

    document.querySelectorAll('#savedNotesList noteTileWrap, #pinnedNotesList noteTileWrap').forEach(noteTile => {
        const noteID = noteTile.getAttribute('noteID');
        const labels = noteLabels[noteID] || [];

        if (labels.includes(selectedLabel)) {
            noteTile.hidden = false;
        } else {
            noteTile.hidden = true;
        }
    });

        const noteTilesHidden = document.querySelectorAll('.saved-notesPinned noteTileWrap');

        if (noteTilesHidden.length > 0) {
            const allHidden = Array.from(noteTilesHidden).every(el => el.hidden);
            document.querySelector('.saved-notesPinned').hidden = allHidden;
        } else{
        }

            showWaterMarkONfilter();

}

function showAllNotes() {
    document.querySelectorAll('#savedNotesList noteTileWrap, #pinnedNotesList noteTileWrap').forEach(noteTile => {
        noteTile.hidden = false;
    });
    hideLockedLabelNotes()
    if(document.querySelectorAll('#pinnedNotesList noteTileWrap').length < 1 ){
        document.querySelector('.saved-notesPinned').hidden = true;
    } else{
        document.querySelector('.saved-notesPinned').hidden = false;
    }
        showWaterMarkONfilter();
        showWaterMarkONBin()

}

function showWaterMarkONfilter(){
        displayWaterMark()

    const IFnotes = JSON.parse(localStorage.getItem('notes')) || [];

    const activeNotes = IFnotes.filter(note => !note.binNote);

    if (activeNotes.length <= 0) {
        return
    }

    const noteTilesHiddenAll = document.querySelectorAll('noteTileWrap');

    const filteredNoteTiles = Array.from(noteTilesHiddenAll).filter(el => !el.closest('#binNotesList'));

    if (filteredNoteTiles.length > 0) {
        const allHiddenFull = filteredNoteTiles.every(el => el.hidden);
        document.querySelector('.water_mark').hidden = !allHiddenFull;
        document.querySelector('.water_mark').style.top = `calc(200px + ${document.getElementById('label_holder').offsetHeight}px)`
    } else {
        document.querySelector('.water_mark').hidden = true;
    }
}

function showWaterMarkONBin(value){
    if(value){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(notes.filter(note => note.binNote).length === 0){
        document.querySelector('.water_mark_bin').hidden = false;
    } else{
        document.querySelector('.water_mark_bin').hidden = true;
    }
} else{
    document.querySelector('.water_mark_bin').hidden = true;
}
}
// toggle list or grid view

function useView(){
    if(localStorage.getItem('SelectedNotesView') && localStorage.getItem('SelectedNotesView') === 'list_view'){
    document.getElementById('savedNotesList').classList.add('listView')
    document.getElementById('pinnedNotesList').classList.add('listView')
    document.getElementById('binNotesList').classList.add('listView')
    document.getElementById('savedNotesList').classList.remove('cardsView')
    document.getElementById('pinnedNotesList').classList.remove('cardsView')
    document.getElementById('binNotesList').classList.remove('cardsView')
    } else if (localStorage.getItem('SelectedNotesView') && localStorage.getItem('SelectedNotesView') === 'cards_view'){
    document.getElementById('savedNotesList').classList.add('cardsView')
    document.getElementById('pinnedNotesList').classList.add('cardsView')
    document.getElementById('binNotesList').classList.add('cardsView')
    document.getElementById('savedNotesList').classList.remove('listView')
    document.getElementById('pinnedNotesList').classList.remove('listView')
    document.getElementById('binNotesList').classList.remove('listView')
    } else{
    document.getElementById('savedNotesList').classList.remove('listView')
    document.getElementById('pinnedNotesList').classList.remove('listView')
    document.getElementById('binNotesList').classList.remove('listView')
    document.getElementById('savedNotesList').classList.remove('cardsView')
    document.getElementById('pinnedNotesList').classList.remove('cardsView')
    document.getElementById('binNotesList').classList.remove('cardsView')
}
}

useView()



function hideLockedLabelNotes(){
    const savedLabelsLocked = JSON.parse(localStorage.getItem('notesLabels')) || [];
    let noteLabelsLocked = JSON.parse(localStorage.getItem('noteLabels')) || {};

    document.querySelectorAll('#savedNotesList noteTileWrap, #pinnedNotesList noteTileWrap').forEach(noteTile => {
        const noteID = noteTile.getAttribute('noteID');
        const labels = noteLabelsLocked[noteID] || [];

        const hasLockedLabel = savedLabelsLocked.some(labelObj =>
            labelObj.locked && labels.includes(labelObj.label)
        );

        if(hasLockedLabel){
        noteTile.classList.add('hiddenNoteLabel')
        }
    });

        hideFolderLabelNotes()

}

function hideFolderLabelNotes(){
    const savedLabelsLocked = JSON.parse(localStorage.getItem('notesLabels')) || [];
    let noteLabelsLocked = JSON.parse(localStorage.getItem('noteLabels')) || {};

    document.querySelectorAll('#savedNotesList noteTileWrap, #pinnedNotesList noteTileWrap').forEach(noteTile => {
        const noteID = noteTile.getAttribute('noteID');
        const labels = noteLabelsLocked[noteID] || [];

        const hasLockedLabel = savedLabelsLocked.some(labelObj =>
            labelObj.isFolder && labels.includes(labelObj.label)
        );

        if(hasLockedLabel){
        noteTile.classList.add('hiddenNoteLabelFolder')
        }
    });

}

function disabledLockedLabels(){
    if (window.history.state && window.history.state.SelectionOpen === true) {
            JSON.parse(localStorage.getItem('notesLabels')).forEach((label, index) => {
                    document.querySelector(`[label="${label.label}"]`).disabled = true
            });
    } else{
    if(JSON.parse(localStorage.getItem('notesLabels'))){
        JSON.parse(localStorage.getItem('notesLabels')).forEach((label, index) => {
                document.querySelector(`[label="${label.label}"]`).disabled = false
        });
        }
    }
}

// apply labels view mode

function labelsView(){
    if(localStorage.getItem('StackedLabel') && localStorage.getItem('StackedLabel') === 'true'){
        document.getElementById('label_holder').classList.add('stackView')
    } else{
        document.getElementById('label_holder').classList.remove('stackView')

    }
}

labelsView()

// disable chips when bin chip is selected

function disableOtherChips() {
    const allchips = JSON.parse(localStorage.getItem('notesLabels')) || [];

    allchips.forEach(label => {
        const chipElement = document.querySelector(`[label="${label.label}"]`);


        if (chipElement) {
            if (!label.locked) {
                chipElement.disabled = true;
            } else {
                chipElement.disabled = false;
            }
        }
    });
}

//----------------

function restoreSelectedNote(){
    const checkboxes = document.querySelectorAll('.noteCheckbox');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const noteID = checkbox.dataset.id;
            const noteIndex = notes.findIndex(note => note.noteID === noteID);

            if (noteIndex !== -1) {
                notes[noteIndex].binNote = false;
                notes[noteIndex].pinned = notes[noteIndex].prevPinned;
            }
        }
    });

    checkboxes.forEach(checkbox => checkbox.hidden = true);
    document.getElementById('backSearchBtn').hidden = true;
    document.getElementById('backSearchBtnIconSearch').hidden = false;
    document.getElementById('deleteNoteBtn').hidden = true;
    document.getElementById('deleteNoteBtn').disabled = true;
    document.querySelector('#textheadingNotes').innerHTML = `Notes`;

    localStorage.setItem('notes', JSON.stringify(notes));
    createNoteTile();
    displayWaterMark();
    window.history.back();
    document.getElementById('savedNotesList').style.height = '';
    document.getElementById('savedNotesList').style.overflow = '';
    document.getElementById('savedNotesList').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.height = '';
    document.querySelector('.saved-notesPinned').style.overflow = '';
    document.querySelector('.saved-notesPinned').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.padding = '';
    document.getElementById('binNotesList').style.height = '0'
    document.getElementById('binNotesList').style.pointerEvents = 'none'

       window.dispatchEvent(new CustomEvent('localNotesUpdated', {
        detail: { key: 'notes', newValue: notes }
    }));
}

function restoreSingleNote(dataAll){
    const data = JSON.parse(dataAll);
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteID = data.noteID;
    const noteIndex = notes.findIndex(note => note.noteID === noteID);

    if (noteIndex !== -1) {
        notes[noteIndex].binNote = false;
        notes[noteIndex].pinned = notes[noteIndex].prevPinned;
    }
    localStorage.setItem('notes', JSON.stringify(notes));

    createNoteTile();
    displayWaterMark();
    window.history.back();
    document.getElementById('savedNotesList').style.height = '';
    document.getElementById('savedNotesList').style.overflow = '';
    document.getElementById('savedNotesList').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.height = '';
    document.querySelector('.saved-notesPinned').style.overflow = '';
    document.querySelector('.saved-notesPinned').style.pointerEvents = '';
    document.querySelector('.saved-notesPinned').style.padding = '';
    document.getElementById('binNotesList').style.height = '0'
    document.getElementById('binNotesList').style.pointerEvents = 'none'

       window.dispatchEvent(new CustomEvent('localNotesUpdated', {
        detail: { key: 'notes', newValue: notes }
    }));
}

function clearBin() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];


    notes = notes.filter(note => !note.binNote);


    localStorage.setItem('notes', JSON.stringify(notes));
    createNoteTile();
}

let resetTimer;

function checkIfTimeExceeded() {
    const savedTimestamp = localStorage.getItem("ClearBinTimeTimestamp");
    const selectedClearBinTime = localStorage.getItem("SelectedClearBinTime");

    if (!savedTimestamp || !selectedClearBinTime || selectedClearBinTime === "clear_never") {
      console.log("No valid clear time set or clearing is set to 'Never'.");
      return;
    }

    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - parseInt(savedTimestamp, 10);
    const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);

    let timeLimitHours = 0;
    switch (selectedClearBinTime) {
      case "clear_24hrs":
        timeLimitHours = 24;
        break;
      case "clear_7days":
        timeLimitHours = 7 * 24;
        break;
      case "clear_14days":
        timeLimitHours = 14 * 24;
        break;
      case "clear_30days":
        timeLimitHours = 30 * 24;
        break;
    }

    if (elapsedHours >= timeLimitHours) {
        clearTimeout(resetTimer)
        clearBin()
        resetTimer = setTimeout(() =>{
        if(document.querySelectorAll('#binNotesList noteTileWrap').length > 0){
        localStorage.setItem("ClearBinTimeTimestamp", Date.now());
        }
    }, 200);

    } else {
        return; // 0;
    }
  }

  function displayLines(){
      document.documentElement.setAttribute('lines_to_display', localStorage.getItem('linesToDisplay') || 3)
  }

  displayLines()

  document.getElementById('LockedNotepinInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        viewLockedNotes();
    }
});

function cleanUnusedImagesFromIndexedDB() {
    const usedImgIDs = new Set();

    document.querySelectorAll('noteTileWrap[hasImg-id]').forEach(tile => {
        const id = tile.getAttribute('hasImg-id');
        if (id) usedImgIDs.add(id);
    });

    document.querySelectorAll('noteTileWrap[hasimg-ids]').forEach(tile => {
        const ids = tile.getAttribute('hasimg-ids');
        if (ids) {
            ids.split(',').forEach(id => {
                const trimmed = id.trim();
                if (trimmed) usedImgIDs.add(trimmed);
            });
        }
    });

    const request = indexedDB.open('NoteImagesDB', 1);

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['images'], 'readwrite');
        const objectStore = transaction.objectStore('images');

        const getAllKeysRequest = objectStore.getAllKeys();

        getAllKeysRequest.onsuccess = function() {
            const allKeys = getAllKeysRequest.result;
            allKeys.forEach(key => {
                if (!usedImgIDs.has(String(key))) {
                    objectStore.delete(key);
                    console.log(`Deleted unused image with ID: ${key}`);
                }
            });
        };

        getAllKeysRequest.onerror = function(event) {
            console.error('Error retrieving keys from object store:', event);
        };
    };

    request.onerror = function(event) {
        console.error('Error opening IndexedDB:', event);
    };
}


window.addEventListener('storage', (event) =>{
    if(event.key === "notes"){
        if(localStorage.getItem('AutoBackup') && localStorage.getItem('AutoBackup') === "true"){
            saveBackup();
        }
    }
})

let debounceTimerSaveBackup;

function saveBackup() {
    clearTimeout(debounceTimerSaveBackup);

    debounceTimerSaveBackup = setTimeout(() => {
        const notesData = localStorage.getItem("notes");

        if (notesData) {
            AndroidSaved.sendNotesData(notesData);
        }
    }, 3000);
}


window.addEventListener('localNotesUpdated', (event) => {
   if(event.detail.key === "notes"){
    if(localStorage.getItem('AutoBackup') && localStorage.getItem('AutoBackup') === "true"){
        saveBackup();
    }
   }
});

function setFolderInStorage(data){
    localStorage.setItem('selectedBackupsFolder', data);
}

function removeFolderInStorage(data){
    localStorage.removeItem('selectedBackupsFolder');
}
