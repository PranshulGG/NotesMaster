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