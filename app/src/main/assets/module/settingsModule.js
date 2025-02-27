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

// export import

document.getElementById("exportAppData").addEventListener("click", () => {

  const keysToExport = ["notes"];


  const data = keysToExport.reduce((acc, key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});

  if (Object.keys(data).length > 0) {
    const jsonData = JSON.stringify(data, null, 2);
    Android.saveFile(jsonData);
  } else {
    ShowSnackMessage.ShowSnack("No selected data found", "short");
  }
});

document.getElementById("importAppData").addEventListener("click", () => {
  Android.importFile();
});

//function handleImportedData(importedData) {
//  try {
//    const data = JSON.parse(importedData);
//
//    if (typeof data !== "object" || data === null) {
//      throw new Error("Invalid data format");
//    }
//
//    setTimeout(() => {
//      for (const [key, value] of Object.entries(data)) {
//        localStorage.setItem(key, value);
//      }
//      ShowSnackMessage.ShowSnack('Data imported successfully!', 'short');
//    }, 1000);
//
//
//  } catch (error) {
//    ShowSnackMessage.ShowSnack('Failed to import data!', 'short');
//    console.error(error);
//  }
//}
//

function handleImportedData(importedData) {
  try {
    const data = JSON.parse(importedData);
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format");
    }

    if (typeof data.notes === "string") {
      data.notes = JSON.parse(data.notes);
    }

    Object.entries(data).forEach(([key, newValue]) => {
      let existingValue = localStorage.getItem(key);

      if (existingValue !== null) {
        try {
          existingValue = JSON.parse(existingValue);
        } catch {
          existingValue = null;
        }
      }

      console.log(`Before saving: ${key} =`, newValue);

      if (Array.isArray(existingValue) && Array.isArray(newValue)) {
        const mergedArray = [...new Set([...existingValue, ...newValue])];
        localStorage.setItem(key, JSON.stringify(mergedArray));
      } else if (typeof existingValue === "object" && typeof newValue === "object") {
        const mergedObject = { ...existingValue, ...newValue };
        localStorage.setItem(key, JSON.stringify(mergedObject));
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }

      console.log(`After saving: ${key} =`, localStorage.getItem(key));
    });

    ShowSnackMessage.ShowSnack("Data imported successfully!", "short");
  } catch (error) {
    console.error("Failed to import data!", error);
    ShowSnackMessage.ShowSnack("Failed to import data!", "short");
  }
}

// use list view

document.getElementById('listViewSwitch').addEventListener('change', () =>{
  localStorage.setItem('NotesView', document.getElementById('listViewSwitch').selected)
});

if(localStorage.getItem('NotesView') && localStorage.getItem('NotesView') === 'true'){
  document.getElementById('listViewSwitch').selected = true;
} else{
  document.getElementById('listViewSwitch').selected = false;
}
