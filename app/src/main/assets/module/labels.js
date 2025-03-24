function openCreateLabelDialog(){
    document.getElementById('createLabelDialog').show();
    window.history.pushState({ LabelDialogOpen: true }, "");

  if (document.getElementById("headUser-1").scrollTop >= 5) {
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
  }
}

function loadLabels() {
    const savedLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    const label_list = document.getElementById('label_list');
    label_list.innerHTML = ""; // Clear existing labels before rendering


    savedLabels.forEach((label, index) => {
        const label_list_item = document.createElement('note_label');
        label_list_item.setAttribute("data-id", index + 1);

        let lockedLabelclass

        if(label.locked){
            lockedLabelclass = 'lockedlabel'
        } else{
            lockedLabelclass = ''
        }

        label_list_item.innerHTML = `
            <div>
            <md-icon icon-outlined>drag_handle</md-icon>
            <p class="${lockedLabelclass} ${label.bin ? 'binLabel' : ''}">${label.label}</p>
            </div>
            <div style="gap: 0;">
                <md-icon-button onclick="editLabel('${label.label}')" ${label.bin ? 'disabled' : ''}>
                    <md-icon icon-outlined>edit</md-icon>
                </md-icon-button>
                <md-icon-button onclick="deleteLabel('${label.label}', '${label.locked}')" ${label.bin ? 'disabled' : ''}>
                    <md-icon icon-outlined>delete</md-icon>
                </md-icon-button>
            </div>
        `;
        label_list.appendChild(label_list_item);
    });
    initializeDragAndDrop();

    if(JSON.parse(localStorage.getItem('notesLabels')) && JSON.parse(localStorage.getItem('notesLabels')).length > 0){
        document.querySelector('.water_mark').hidden = true
    } else{
        document.querySelector('.water_mark').hidden = false
    }
}

// Function to create and save a new label
function createNewLabel() {
    const inputField = document.getElementById('NewLabel_input');
    const labelValue = inputField.value.trim();

    if (labelValue === "") {
        document.getElementById('NewLabel_input').setAttribute('error-text', "Please fill in the field");
        document.getElementById('NewLabel_input').error = true;
        return;

    }

    let locked
    let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];


    if(document.getElementById('toggleLockedLabelSwitch').selected){
        locked = true;
    } else{
        locked = false;
    }

    if(labelValue === 'Bin' || labelValue === 'bin'){
        document.getElementById('NewLabel_input').setAttribute('error-text', "You cannot create a bin label");
        document.getElementById('NewLabel_input').error = true;
        return;
    }


    if (notesLabels.some((notesLabel) => notesLabel.label === labelValue)) {
        document.getElementById('NewLabel_input').setAttribute('error-text', "This label already exists");
        document.getElementById('NewLabel_input').error = true;
        return;
    }


    notesLabels.push({label: labelValue, locked: locked});


    localStorage.setItem('notesLabels', JSON.stringify(notesLabels));

    loadLabels();

    inputField.value = "";
    if(document.getElementById('toggleLockedLabelSwitch').selected){
    document.getElementById('toggleLockedLabelSwitch').click()}
    window.history.back();
}

function deleteLabel(label, islocked) {
    if(islocked === 'true' || islocked === 'true'){
        sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
        document.getElementById('enterPinDialog').show();
        window.history.pushState({ enterPinDialogOpen: true }, "");
        document.getElementById('LockedlabelpinInput').value = ''
         document.getElementById('LockedlabelpinInput').error = false;
         document.getElementById('deleteLockedLabel').setAttribute('lockedLabelId', label)
        return
    }
    let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
        notesLabels = notesLabels.filter(item => item.label !== label);
    localStorage.setItem('notesLabels', JSON.stringify(notesLabels));
    loadLabels();
}

document.getElementById('deleteLockedLabel').addEventListener('click', () =>{
    if(document.getElementById('LockedlabelpinInput').value === localStorage.getItem('applabelAccessPin')){
        deleteLabel(document.getElementById('deleteLockedLabel').getAttribute('lockedLabelId'), 'false')
        window.history.back()
    } else{
        document.getElementById('LockedlabelpinInput').error = true;
    }
})

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

function editLabel(oldLabel) {
    document.getElementById('editLabelDialog').show();
    document.getElementById('editLabel_input').value = oldLabel
    document.getElementById('editLabel_input').setAttribute('oldLabelValue', oldLabel)

    window.history.pushState({ EditLabelDialogOpen: true }, "");

      if (document.getElementById("headUser-1").scrollTop >= 5) {
        sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
      } else {
        sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
      }

}

function updateLabel(){
    const newLabel = document.getElementById('editLabel_input').value
    const oldLabel = document.getElementById('editLabel_input').getAttribute('oldLabelValue');
    if (newLabel !== "") {
        let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];

        // Find the object and update its label
        const labelObj = notesLabels.find(label => label.label === oldLabel);

        if (labelObj) {
            labelObj.label = newLabel;
            localStorage.setItem('notesLabels', JSON.stringify(notesLabels));
            loadLabels();
        }
    }

    window.history.back();
}

document.addEventListener('DOMContentLoaded', loadLabels);


document.getElementById('NewLabel_input').addEventListener('input', () =>{
    if(document.getElementById('NewLabel_input').error){
        document.getElementById('NewLabel_input').error = false;
    }
})

window.addEventListener("popstate", function (event) {
    if(document.getElementById('createLabelDialog').open){
    document.getElementById('createLabelDialog').close();
    }

    if(document.getElementById('editLabelDialog').open){
        document.getElementById('editLabelDialog').close();
    }
});

document.getElementById('createLabelDialog').addEventListener('cancel', () =>{
    document.getElementById('createLabelDialog').addEventListener('closed', () =>{
        window.history.back()
    })
})

document.getElementById('createLabelDialog').addEventListener('close', () =>{
  if (document.getElementById("headUser-1").scrollTop >= 5) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
})


// ---------

document.getElementById('editLabelDialog').addEventListener('cancel', () =>{
    document.getElementById('editLabelDialog').addEventListener('closed', () =>{
        window.history.back()
    })
})

document.getElementById('editLabelDialog').addEventListener('close', () =>{
  if (document.getElementById("headUser-1").scrollTop >= 5) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
})

// ------------


document.getElementById('toggleLockedLabelSwitch').addEventListener('change', () =>{
    if(document.getElementById('toggleLockedLabelSwitch').selected){
        if(!localStorage.getItem('applabelAccessPin')){
            setTimeout(() =>{
                document.getElementById('toggleLockedLabelSwitch').click()
            }, 200)
            navigateActivity('openLockConfigPage')
        }
    }
});

// ------------


function deleteAllLabels() {
    let labels = JSON.parse(localStorage.getItem('notesLabels')) || [];

    let updatedLabels = labels.filter(label => label.locked || label.bin);

    localStorage.setItem('notesLabels', JSON.stringify(updatedLabels));

    loadLabels();
}

function deleteAllLabelsDialog(){
    document.getElementById('deleteLabelsAlert').show();

    window.history.pushState({ deleteLabelsAlertOpen: true }, "");

      if (document.getElementById("headUser-1").scrollTop >= 5) {
        sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
      } else {
        sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0', '225');
      }
}


window.addEventListener("popstate", function (event) {
    if(document.getElementById('deleteLabelsAlert').open){
    document.getElementById('deleteLabelsAlert').close();
    }
});

document.getElementById('deleteLabelsAlert').addEventListener('cancel', () =>{
    document.getElementById('deleteLabelsAlert').addEventListener('closed', () =>{
        window.history.back()
    })
})

document.getElementById('deleteLabelsAlert').addEventListener('close', () =>{
  if (document.getElementById("headUser-1").scrollTop >= 5) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
})

function showInfoDialog(){

    alert("You can lock a label with a pin or fingerprint. Any note assigned to a locked label will require a pin to view. If a note is assigned to a locked label, you can't add other labels to it. If you forget your pin, it can't be reset unless you clear the app data, but you can change it in the settings.")

}