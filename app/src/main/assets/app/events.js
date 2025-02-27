function handleStorageChange(event) {
    switch (event.key) {
        case 'useDarkTheme':
        case 'Materialtheme':
        checkThemeFlag()
                if(!document.querySelector('.search_container_screen').hidden){
                    window.history.back()
                }
            if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
                document.documentElement.setAttribute('colorTheme', 'dark');
                if(localStorage.getItem('Materialtheme')){
                    document.documentElement.setAttribute(
                "Theme",
                localStorage.getItem('Materialtheme')
              );
                }
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
                
            } else{
                document.documentElement.setAttribute('colorTheme', 'light');
                if(localStorage.getItem('Materialtheme')){
                    document.documentElement.setAttribute(
                "Theme",
                localStorage.getItem('Materialtheme')
              );
                }
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
            }
            break;
            case 'notes':
                createNoteTile()
            case 'SelectedAPPfont':
                applyAppFont()
            case 'notesLabels':
            case 'dragAndDropState':
                 createLabels()
            case 'NotesView':
            useListView()
            default:
                console.log('Untracked key changed:', event.key);
      }
 }

window.addEventListener('storage', handleStorageChange);
