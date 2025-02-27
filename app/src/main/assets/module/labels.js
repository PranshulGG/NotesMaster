function openCreateLabelDialog(){
    document.getElementById('createLabelDialog').show();
    window.history.pushState({ LabelDialogOpen: true }, "");

  if (document.getElementById("headUser-1").scrollTop >= 5) {
    sendThemeToAndroid(colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
  }
}

function loadLabels() {
    const savedLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    const label_list = document.getElementById('label_list');
    label_list.innerHTML = ""; // Clear existing labels before rendering

    savedLabels.forEach((label, index) => {
        const label_list_item = document.createElement('note_label');
        label_list_item.setAttribute("data-id", index + 1);

        label_list_item.innerHTML = `
            <div>
            <md-icon icon-outlined>drag_handle</md-icon>
            <p>${label}</p>
            </div>
            <div>
                <md-icon-button onclick="editLabel('${label}')">
                    <md-icon icon-outlined>edit</md-icon>
                </md-icon-button>
                <md-icon-button onclick="deleteLabel('${label}')">
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

    let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];

    if (notesLabels.includes(labelValue)) {
        document.getElementById('NewLabel_input').setAttribute('error-text', "This label already exists");
        document.getElementById('NewLabel_input').error = true;
        return;
    }


    notesLabels.push(labelValue);

    localStorage.setItem('notesLabels', JSON.stringify(notesLabels));

    loadLabels();

    inputField.value = "";
    window.history.back();
}

function deleteLabel(label) {
    let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
    notesLabels = notesLabels.filter(item => item !== label);
    localStorage.setItem('notesLabels', JSON.stringify(notesLabels));
    loadLabels();
}

function editLabel(oldLabel) {
    document.getElementById('editLabelDialog').show();
    document.getElementById('editLabel_input').value = oldLabel
    document.getElementById('editLabel_input').setAttribute('oldLabelValue', oldLabel)

    window.history.pushState({ EditLabelDialogOpen: true }, "");

      if (document.getElementById("headUser-1").scrollTop >= 5) {
        sendThemeToAndroid(colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
      } else {
        sendThemeToAndroid(colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
      }

}

function updateLabel(){
    const newLabel = document.getElementById('editLabel_input').value
    const oldLabel = document.getElementById('editLabel_input').getAttribute('oldLabelValue');
    if (newLabel && newLabel.trim() !== "") {
        let notesLabels = JSON.parse(localStorage.getItem('notesLabels')) || [];
        const index = notesLabels.indexOf(oldLabel);
        if (index !== -1) {
            notesLabels[index] = newLabel.trim();
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
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')

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
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')

  }
})
