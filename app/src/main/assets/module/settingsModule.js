document.getElementById('darkThemeSwitch').addEventListener('change', () =>{
    localStorage.setItem('useDarkTheme', document.getElementById('darkThemeSwitch').selected);
    if(document.getElementById('darkThemeSwitch').selected){
        document.documentElement.setAttribute('colorTheme', 'dark');
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
    } else{
        document.documentElement.setAttribute('colorTheme', 'light');
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
    }
      document.querySelector('load_theme').hidden = false;
      document.getElementById("headUser-1").scrollTop = 0

      setTimeout(() =>{
        document.querySelector('load_theme').hidden = true;
      }, 500);
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
    if(document.getElementById("headUser-1").scrollTop >= 50){
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '220')
    } else{
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '220')
    }
  });
});

// app font

function openAppFontDialog() {
  document.getElementById("chooseAPPFontDialog").show();
  window.history.pushState({ AppFontDialogOpen: true }, "");

  document
    .querySelector(
      `md-radio[value="${
        localStorage.getItem("SelectedAPPfont") || "product_sans"
      }"]`
    )
    .setAttribute("checked", "true");

  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
  }
}

window.addEventListener("popstate", function (event) {
  if (document.getElementById("chooseAPPFontDialog").open) {
    document.getElementById("chooseAPPFontDialog").close();
  }
});

document
  .getElementById("chooseAPPFontDialog")
  .addEventListener("cancel", () => {
    document
      .getElementById("chooseAPPFontDialog")
      .addEventListener("closed", () => {
        window.history.back();
      });
  });

document.getElementById("chooseAPPFontDialog").addEventListener("close", () => {
  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '40')

  }
});

document.getElementById("saveSelectedFont").addEventListener("click", () => {
  if (document.querySelector('md-radio[value="product_sans"]').checked) {
    localStorage.setItem("SelectedAPPfont", "product_sans");
    document.documentElement.setAttribute("sys-font", "");
  } else {
    localStorage.setItem("SelectedAPPfont", "roboto");
    document.documentElement.setAttribute("sys-font", "roboto");
  }
  window.history.back();
  applyFontChanges();
});



