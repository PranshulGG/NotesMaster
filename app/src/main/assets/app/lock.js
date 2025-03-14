function viewLockedNotes(){
    if(localStorage.getItem('useFingerPrint') === 'true'){
        filterNotesByLabel(selectedLabelLocked.label.label)
        document.querySelectorAll('.hiddenNoteLabel').forEach((hiddenLockedEl) =>{
            hiddenLockedEl.classList.remove('hiddenNoteLabel')
        })
        selectedLabelLocked.element.setAttribute('selected', '')
    } else{
    if(document.getElementById('LockedNotepinInput').value === localStorage.getItem('applabelAccessPin')){
        filterNotesByLabel(selectedLabelLocked.label.label)
        document.querySelectorAll('.hiddenNoteLabel').forEach((hiddenLockedEl) =>{
            hiddenLockedEl.classList.remove('hiddenNoteLabel')
        })
        selectedLabelLocked.element.setAttribute('selected', '')
        window.history.back();
    } else{
        document.getElementById('LockedNotepinInput').error = true;
    }
    }
}


