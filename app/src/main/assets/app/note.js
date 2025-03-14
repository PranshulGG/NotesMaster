
document.getElementById('deleteThisNoteBtnAlert').addEventListener('click', () =>{
    console.log(openedNoteId)
    document.getElementById('deleteNoteAlert').show();
    window.history.pushState({ DeleteNoteDialogOpen: true }, "");

    if(document.querySelector('.view-btn').selected){
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
    }else{
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], '0', '225');
    }
});

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
    if(document.querySelector('.view-btn').selected){
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
    } else{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), Themeflag, '210')
    }
});


document.getElementById('deleteThisNoteBtn').addEventListener('click', () =>{
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.noteID !== openedNoteId);
    localStorage.setItem('notes', JSON.stringify(notes));
    ActivityBack();

    setTimeout(() =>{
        ActivityBack();
    }, 150)

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
                      ShowSnackMessage.ShowSnack('Note pinned', 'short');
            } else{
                document.getElementById('pinThisNoteBtnText').innerHTML = 'Pin';
                document.getElementById('pinThisNoteBtnIcon').innerHTML = 'bookmark';
                ShowSnackMessage.ShowSnack('Note unpinned', 'short');

            }
        }
        return note;
    });
    localStorage.setItem('notes', JSON.stringify(notes));
});

// add label

document.getElementById('addLabelToThisNoteDialog').addEventListener('click', () =>{
    document.getElementById('NoteLabelDialog').show();

    window.history.pushState({ NoteLabelDialogOpen: true }, "");
    if(document.querySelector('.view-btn').selected){
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
    }else{
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], '0', '225');
    }

});

function loadDialogLabels(){
    const savedLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    const label_holder = document.getElementById('label_selection_list');
    label_holder.innerHTML = ""

    savedLabels.forEach(label => {
        const label_item = document.createElement('noteLabelitem');
        label_item.classList.add('label-itemCheckboxes');

        label_item.innerHTML = `
            <label ${label.locked ? 'lockedLabelItem' : ''}>
            <md-checkbox class="label-checkbox" locked="${label.locked}" ${label.locked ? 'data-locked="true"' : ''}></md-checkbox>
            ${label.label}
            </label>
            <md-ripple></md-ripple>
        `
        label_holder.appendChild(label_item);
    });

    if(savedLabels.length === 0){
        label_holder.innerHTML = '<p style="margin: 0; color: var(--On-Surface-Variant); text-align: center;">No labels found</p>'
    }
    attachCheckboxListeners()
}

function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.label-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const isLocked = checkbox.getAttribute('data-locked') === "true";
            if (isLocked && checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = true;
                        cb.closest('noteLabelitem').classList.add('not-clickable');
                        cb.checked = false;

                    }
                });
            } else {
                const lockedChecked = [...checkboxes].some(cb => cb.getAttribute('data-locked') === "true" && cb.checked);
                if (!lockedChecked) {
                    checkboxes.forEach(cb => {
                        cb.disabled = false;
                        cb.closest('noteLabelitem').classList.remove('not-clickable');
                    });
                }
            }
        });
    });
}

loadDialogLabels()

window.addEventListener("popstate", function (event) {
    if(document.getElementById('NoteLabelDialog').open){
    document.getElementById('NoteLabelDialog').close();
    }
});

document.getElementById('NoteLabelDialog').addEventListener('cancel', () =>{
    document.getElementById('NoteLabelDialog').addEventListener('closed', () =>{
        window.history.back()
    })
})

document.getElementById('NoteLabelDialog').addEventListener('close', () =>{
    if(document.querySelector('.view-btn').selected){
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
    } else{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), Themeflag, '210')
    }
});

document.getElementById('addNoteLabel').addEventListener('click', () => {
    const checkedLabels = Array.from(document.querySelectorAll('.label-checkbox'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.parentElement.textContent.trim());

    const label_holder = document.getElementById('added_note_labels');

    label_holder.innerHTML = '';

    checkedLabels.forEach((checkedLabel) => {
        const label_item = document.createElement('md-assist-chip');
        label_item.setAttribute('label', checkedLabel);
        label_holder.appendChild(label_item);
    });

    if (openedNoteId) {
        let savedLabels = JSON.parse(localStorage.getItem('noteLabels')) || {};
        savedLabels[openedNoteId] = checkedLabels;
        localStorage.setItem('noteLabels', JSON.stringify(savedLabels));
    }

    if(document.querySelectorAll('#added_note_labels md-assist-chip').length === 0){
        document.getElementById('noteTitle').style.marginTop = ''
        label_holder.hidden = true;
    } else{
        document.getElementById('noteTitle').style.marginTop = '0'
        label_holder.hidden = false;

    }

    window.history.back();
});

function loadNoteLabels(noteId) {
    let savedLabels = JSON.parse(localStorage.getItem('noteLabels')) || {};
    let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    let labelsForNote = savedLabels[noteId] || [];

    labelsForNote = labelsForNote.filter(label =>
        notesLabels.some(noteLabel => noteLabel.label === label)
    );

    savedLabels[noteId] = labelsForNote;
    localStorage.setItem('noteLabels', JSON.stringify(savedLabels));

    const label_holder = document.getElementById('added_note_labels');
    label_holder.innerHTML = '';

    labelsForNote.forEach((label) => {
        const label_item = document.createElement('md-assist-chip');
        label_item.setAttribute('label', label);
        label_holder.appendChild(label_item);

        const matchingCheckbox = Array.from(document.querySelectorAll('.label-checkbox'))
        .find(checkbox => checkbox.parentElement.textContent.trim() === label);

        if(matchingCheckbox){
        matchingCheckbox.checked = true;
        disableIFLocked()
    }

    });

    label_holder.hidden = labelsForNote.length === 0;

        if(labelsForNote.length === 0){
            document.getElementById('noteTitle').style.marginTop = ''
        } else{
            document.getElementById('noteTitle').style.marginTop = '0'
        }

    function disableIFLocked() {
        const checkboxes = document.querySelectorAll('.label-checkbox');

        checkboxes.forEach(checkbox => {
                const isLocked = checkbox.getAttribute('data-locked') === "true";
                if (isLocked && checkbox.checked) {
                    checkboxes.forEach(cb => {
                        if (cb !== checkbox) {
                            cb.disabled = true;
                            cb.closest('noteLabelitem').classList.add('not-clickable');
                            cb.checked = false;

                        }
                    });
                } else {
                    const lockedChecked = [...checkboxes].some(cb => cb.getAttribute('data-locked') === "true" && cb.checked);
                    if (!lockedChecked) {
                        checkboxes.forEach(cb => {
                            cb.disabled = false;
                            cb.closest('noteLabelitem').classList.remove('not-clickable');
                        });
                    }
                }
            });
    }
}

