function handleStorageChange(event) {
    switch (event.key) {
        case 'useDarkTheme':
        case 'materialThemeColorSource':
        if(!localStorage.getItem('useDynamicColors') || localStorage.getItem('useDynamicColors') !== 'true'){
             themeConfig(localStorage.getItem('materialThemeColorSource') || '#aac7ff')
        }

        checkThemeFlag()
                if(!document.querySelector('.search_container_screen').hidden){
                    window.history.back()
                }
            if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
            } else{
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
            }
            break;
            case 'notes':
            case 'onlyShowTitle':
            case 'noteLabels':
                createNoteTile()
                break;
            case 'SelectedAPPfont':
                applyAppFont()
                break;
            case 'notesLabels':
            case 'dragAndDropState':
                 createLabels()
                 break;
            case 'SelectedNotesView':
                useView()
                 break;
            case 'StackedLabel':
            labelsView()
                 break;
            case 'SelectedClearBinTime':
            checkIfTimeExceeded();
            case 'useDynamicColors':
                if(localStorage.getItem('useDynamicColors') === 'true'){
                    AndroidFunctionActivityInterface.androidFunction('ReloadDynamicColors');
                }
                 break;
            case 'linesToDisplay':
                  displayLines()
                 break;
            case 'pickBackupFolderClicked':
                 ShowSnackMessage.ShowSnack('Select backups folder', 'short');
                setTimeout(() =>{
                  AndroidFunctionActivityInterface.androidFunction('pickAfolderOnly');
                }, 1000);
                 break;
            default:
                console.log('Untracked key changed:', event.key);
      }
 }

window.addEventListener('storage', handleStorageChange);
