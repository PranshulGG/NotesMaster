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


if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
    document.getElementById('darkThemeSwitch').selected = true;
} else{
    document.getElementById('darkThemeSwitch').selected = false;
}


// app font

function hexWithOpacity(hex, opacityPercent) {
  hex = hex.replace("#", "");

  const alpha = Math.round((opacityPercent / 100) * 255)
    .toString(16)
    .padStart(2, "0");

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  return `#${hex}${alpha}`;
}


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
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  }
//    if (document.getElementById("headUser-1").scrollTop >= 50) {
//      sendThemeToAndroid(colorsDialogsOpenContainer[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
//    } else {
//      sendThemeToAndroid(colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface[GetDialogOverlayContainerColor()], '0', '40');
//    }
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
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

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

// only title


document.getElementById('onlyShowTitleSwitch').addEventListener('change', () =>{
  localStorage.setItem('onlyShowTitle', document.getElementById('onlyShowTitleSwitch').selected)
});

if(localStorage.getItem('onlyShowTitle') && localStorage.getItem('onlyShowTitle') === 'true'){
  document.getElementById('onlyShowTitleSwitch').selected = true;
} else{
  document.getElementById('onlyShowTitleSwitch').selected = false;
}

// -------

document.getElementById('useFingerPrintSwitch').addEventListener('change', () =>{
  localStorage.setItem('useFingerPrint', document.getElementById('useFingerPrintSwitch').selected)
});

if(localStorage.getItem('useFingerPrint') && localStorage.getItem('useFingerPrint') === 'true'){
  document.getElementById('useFingerPrintSwitch').selected = true;
} else{
  document.getElementById('useFingerPrintSwitch').selected = false;
}

// ---------------

document.getElementById('DynamicColorsSwitch').addEventListener('change', () =>{
  localStorage.setItem('useDynamicColors', document.getElementById('DynamicColorsSwitch').selected)

  if(document.getElementById('DynamicColorsSwitch').selected){
  document.querySelector('.customthemeSlider').style.height = '0';
        document.querySelector('load_theme').hidden = false;
  setTimeout(() =>{
    ActivityBack();
  }, 100)
  } else{
  document.querySelector('.customthemeSlider').style.height = '';
  }

});

if(localStorage.getItem('useDynamicColors') && localStorage.getItem('useDynamicColors') === 'true'){
  document.getElementById('DynamicColorsSwitch').selected = true;
  document.querySelector('.customthemeSlider').style.height = '0';
} else{
  document.getElementById('DynamicColorsSwitch').selected = false;
  document.querySelector('.customthemeSlider').style.height = '';

}


// ----------

function openColorSheet(){
  document.getElementById("ColorPickerSheet").show();
  window.history.pushState({ ColorPickerSheetOpen: true }, "");

  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-Low'), '0colorOnly', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container-Low'), '0colorOnly', '225');
  }
}

window.addEventListener("popstate", function (event) {
  if (document.getElementById("ColorPickerSheet").hasAttribute('open')) {
    document.getElementById("ColorPickerSheet").close();
  }
});

document.getElementById("ColorPickerSheet").addEventListener("closing", () => {
  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
});

document.getElementById("ColorPickerSheet").addEventListener("closed", () => {
    if (window.history.state && window.history.state.ColorPickerSheetOpen === true) {
      window.history.back();
  } else {
      console.log("ColorPickerSheet is not open.");
  }
})
