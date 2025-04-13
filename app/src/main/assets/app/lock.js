function viewLockedNotes(){
    if(localStorage.getItem('useFingerPrint') === 'true'){
        filterNotesByLabel(selectedLabelLocked.label.label)
        document.querySelectorAll('.hiddenNoteLabel').forEach((hiddenLockedEl) =>{
            hiddenLockedEl.classList.remove('hiddenNoteLabel')
        })
        selectedLabelLocked.element.setAttribute('selected', '')
        document.getElementById('savedNotesList').style.height = '';
        document.getElementById('savedNotesList').style.overflow = '';
        document.getElementById('savedNotesList').style.pointerEvents = '';
        document.querySelector('.saved-notesPinned').style.height = '';
        document.querySelector('.saved-notesPinned').style.overflow = '';
        document.querySelector('.saved-notesPinned').style.pointerEvents = '';
        document.querySelector('.saved-notesPinned').style.padding = '';
        document.getElementById('binNotesList').style.height = '0'
        document.getElementById('binNotesList').style.pointerEvents = 'none'
        showWaterMarkONBin()
    } else{
    if(document.getElementById('LockedNotepinInput').value === localStorage.getItem('applabelAccessPin')){
        filterNotesByLabel(selectedLabelLocked.label.label)
        document.querySelectorAll('.hiddenNoteLabel').forEach((hiddenLockedEl) =>{
            hiddenLockedEl.classList.remove('hiddenNoteLabel')
        })
        selectedLabelLocked.element.setAttribute('selected', '')
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
        showWaterMarkONBin()
    } else{
        document.getElementById('LockedNotepinInput').error = true;
    }
    }
}


