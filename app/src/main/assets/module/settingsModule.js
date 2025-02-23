document.getElementById('darkThemeSwitch').addEventListener('change', () =>{
    localStorage.setItem('useDarkTheme', document.getElementById('darkThemeSwitch').selected);
    if(document.getElementById('darkThemeSwitch').selected){
        document.documentElement.setAttribute('colorTheme', 'dark');
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
    } else{
        document.documentElement.setAttribute('colorTheme', 'light');
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
    }
    checkThemeFlag()
});

if(localStorage.getItem('Materialtheme')){
    document.documentElement.setAttribute(
        "Theme",
        localStorage.getItem('Materialtheme')
      );
      document.querySelector(`[theme-value="${localStorage.getItem("Materialtheme")}"]`).style.setProperty("--display-style", "block");
}

if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
    document.getElementById('darkThemeSwitch').selected = true;
} else{
    document.getElementById('darkThemeSwitch').selected = false;
}

// themes ----------


const colorItems = document.querySelectorAll(".color-item");

colorItems.forEach((item) => {
  item.addEventListener("click", () => {
    colorItems.forEach((i) => i.style.setProperty("--display-style", "none"));
    item.style.setProperty("--display-style", "block");
    document.documentElement.setAttribute(
      "Theme",
      item.getAttribute("theme-value")
    );
    localStorage.setItem('Materialtheme', item.getAttribute("theme-value"))
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag)
  });
});


