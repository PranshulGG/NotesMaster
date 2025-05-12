//function saveSetting(key, value) {
//    if (typeof key !== "string" || key.trim() === "") return;
//
//    settingsPref[key] = value;
//
//    localStorage.setItem("AppSettings", JSON.stringify(settingsPref));
//}
//

document.getElementById('darkThemeSwitch').addEventListener('change', () =>{
    localStorage.setItem('useDarkTheme', document.getElementById('darkThemeSwitch').selected);
    if(document.getElementById('darkThemeSwitch').selected){
        document.documentElement.setAttribute('colorTheme', 'dark');
      document.getElementById('AMOLEDThemeSwitch').disabled = false
      document.querySelector('[for="AMOLEDThemeSwitch"]').style.pointerEvents = ''
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
    } else{
        document.documentElement.setAttribute('colorTheme', 'light');
          document.getElementById('AMOLEDThemeSwitch').disabled = true
          localStorage.setItem('useAMOLED', 'false')
          document.querySelector('[for="AMOLEDThemeSwitch"]').style.pointerEvents = 'none'
        sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
    }

    checkThemeFlag()
});


if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
    document.getElementById('darkThemeSwitch').selected = true;
} else{
    document.getElementById('darkThemeSwitch').selected = false;
      document.getElementById('AMOLEDThemeSwitch').disabled = true
      localStorage.setItem('useAMOLED', 'false')
      document.querySelector('[for="AMOLEDThemeSwitch"]').style.pointerEvents = 'none'
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


// ---------------


function openNotesViewDialog() {
  document.getElementById("chooseNotesViewDialog").show();
  window.history.pushState({ NotesViewDialogOpen: true }, "");

  document
    .querySelector(
      `md-radio[value="${
        localStorage.getItem("SelectedNotesView") || "grid_view"
      }"]`
    )
    .setAttribute("checked", "true");

  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  }
}

window.addEventListener("popstate", function (event) {
  if (document.getElementById("chooseNotesViewDialog").open) {
    document.getElementById("chooseNotesViewDialog").close();
  }
});

document
  .getElementById("chooseNotesViewDialog")
  .addEventListener("cancel", () => {
    document
      .getElementById("chooseNotesViewDialog")
      .addEventListener("closed", () => {
        window.history.back();
      });
  });

document.getElementById("chooseNotesViewDialog").addEventListener("close", () => {
  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
});

document.getElementById("saveSelectedViewBtn").addEventListener("click", () => {
  if (document.querySelector('md-radio[value="cards_view"]').checked) {
    localStorage.setItem("SelectedNotesView", "cards_view");
    document.getElementById('selectedNotesViewText').innerHTML = 'Cards view';
    document.getElementById('onlyShowTitleSwitch').disabled = false;
    document.getElementById('displayLinesSlider').disabled = false
  } else if (document.querySelector('md-radio[value="list_view"]').checked){
    localStorage.setItem("SelectedNotesView", "list_view");
    document.getElementById('selectedNotesViewText').innerHTML = 'List view';
      if(document.getElementById('onlyShowTitleSwitch').selected){
        document.getElementById('onlyShowTitleSwitch').click()
      }
      document.getElementById('onlyShowTitleSwitch').disabled = true;
       document.getElementById('displayLinesSlider').disabled = true
  } else{
    localStorage.setItem("SelectedNotesView", "grid_view");
    document.getElementById('selectedNotesViewText').innerHTML = 'Grid view';
    document.getElementById('onlyShowTitleSwitch').disabled = false;
    document.getElementById('displayLinesSlider').disabled = false

  }
  window.history.back();
});

if(localStorage.getItem("SelectedNotesView") === 'cards_view'){
  document.getElementById('selectedNotesViewText').innerHTML = 'Cards view';
} else if (localStorage.getItem("SelectedNotesView") === 'list_view'){
  document.getElementById('selectedNotesViewText').innerHTML = 'List view';
  if(document.getElementById('onlyShowTitleSwitch').selected){
    document.getElementById('onlyShowTitleSwitch').click()
  }
  document.getElementById('onlyShowTitleSwitch').disabled = true;
  document.getElementById('displayLinesSlider').disabled = true
} else{
  document.getElementById('selectedNotesViewText').innerHTML = 'Grid view';
}

// -----------

function openColorDialog() {

  if(document.getElementById("colorPickerSheetContent").hidden){
    document.getElementById("colorPickerSheetContent").hidden = false;
    document.querySelector(".pre-define-colors").hidden = true;
    document.getElementById('closeBlockBtn').hidden = true;
    document.getElementById('setRandomTheme').hidden = false;
    document.getElementById('openPredefineColorBlock').hidden = false;
    document.getElementById('content_color').style.paddingLeft = '';
    document.getElementById('content_color').style.paddingRight = '';
  }

  document.getElementById("chooseMaterialColorDialog").show();
  window.history.pushState({ MaterialColorDialogOpen: true }, "");

  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  }
}

window.addEventListener("popstate", function (event) {
  if (document.getElementById("chooseMaterialColorDialog").open) {
    document.getElementById("chooseMaterialColorDialog").close();
  }
});

document
  .getElementById("chooseMaterialColorDialog")
  .addEventListener("cancel", () => {
    document
      .getElementById("chooseMaterialColorDialog")
      .addEventListener("closed", () => {
        window.history.back();
      });
  });

document.getElementById("chooseMaterialColorDialog").addEventListener("close", () => {
  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
});

// ---------

document.getElementById('showStackedLabelSwitch').addEventListener('change', () =>{
  localStorage.setItem('StackedLabel', document.getElementById('showStackedLabelSwitch').selected)
  });

  if(localStorage.getItem('StackedLabel') && localStorage.getItem('StackedLabel') === 'true'){
  document.getElementById('showStackedLabelSwitch').selected = true;
  } else{
  document.getElementById('showStackedLabelSwitch').selected = false;
  }

// -----------

function openClearBinAfterDialog() {
  document.getElementById("chooseAutoClearBinDialog").show();
  window.history.pushState({ NotesViewDialogOpen: true }, "");

  document
    .querySelector(
      `md-radio[value="${
        localStorage.getItem("SelectedClearBinTime") || "clear_never"
      }"]`
    )
    .setAttribute("checked", "true");

  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  } else {
    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
  }
  }

  window.addEventListener("popstate", function (event) {
  if (document.getElementById("chooseAutoClearBinDialog").open) {
    document.getElementById("chooseAutoClearBinDialog").close();
  }
  });

  document
  .getElementById("chooseAutoClearBinDialog")
  .addEventListener("cancel", () => {
    document
      .getElementById("chooseAutoClearBinDialog")
      .addEventListener("closed", () => {
        window.history.back();
      });
  });

  document.getElementById("chooseAutoClearBinDialog").addEventListener("close", () => {
  if (document.getElementById("headUser-1").scrollTop >= 50) {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
  } else {
    sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

  }
  });



document.getElementById("saveSelectedClearBinTime").addEventListener("click", () => {
  if (document.querySelector('md-radio[value="clear_24hrs"]').checked) {
    localStorage.setItem("SelectedClearBinTime", "clear_24hrs");
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 24 hours';
  } else if (document.querySelector('md-radio[value="clear_7days"]').checked){
    localStorage.setItem("SelectedClearBinTime", "clear_7days");
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 7 days';
  } else if (document.querySelector('md-radio[value="clear_14days"]').checked){
    localStorage.setItem("SelectedClearBinTime", "clear_14days");
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 14 days';
  } else if (document.querySelector('md-radio[value="clear_30days"]').checked){
    localStorage.setItem("SelectedClearBinTime", "clear_30days");
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 30 days';
  } else{
    localStorage.setItem("SelectedClearBinTime", "clear_never");
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'Never';
  }
    localStorage.setItem("ClearBinTimeTimestamp", Date.now());
    window.history.back();
  });

  if (localStorage.getItem("SelectedClearBinTime") === 'clear_24hrs') {
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 24 hours';
  } else if (localStorage.getItem("SelectedClearBinTime") === 'clear_7days'){
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 7 days';
  } else if (localStorage.getItem("SelectedClearBinTime") === 'clear_14days'){
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 14 days';
  } else if (localStorage.getItem("SelectedClearBinTime") === 'clear_30days'){
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'After 30 days';
  } else{
    document.getElementById('SelectedClearBinTimeText').innerHTML = 'Never';
  }

    // ---------
document.getElementById('RememberLastLabelSwitch').addEventListener('change', () =>{
  localStorage.setItem('RememberLastLabelS', document.getElementById('RememberLastLabelSwitch').selected)
  });

  if(localStorage.getItem('RememberLastLabelS') && localStorage.getItem('RememberLastLabelS') === 'true'){
  document.getElementById('RememberLastLabelSwitch').selected = true;
  } else{
  document.getElementById('RememberLastLabelSwitch').selected = false;
  }


  // --------------

document.getElementById('displayLinesSlider').addEventListener('input', () =>{
    localStorage.setItem('linesToDisplay', document.getElementById('displayLinesSlider').value);
});

if(localStorage.getItem('linesToDisplay')){
  document.getElementById('displayLinesSlider').value = localStorage.getItem('linesToDisplay')
  } else{
    document.getElementById('displayLinesSlider').value = 3
  }


// colors

const scheme_1 = [ "#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#b71c1c", "#c62828", "#d32f2f", "#e53935", "#f44336" ];
const scheme_2 = [ "#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#880e4f", "#ad1457", "#c2185b", "#d81b60", "#e91e63" ];
const scheme_3 = [ "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#4a148c", "#6a1b9a", "#7b1fa2", "#8e24aa", "#9c27b0" ];
const scheme_4 = [ "#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#311b92", "#4527a0", "#512da8", "#5e35b1", "#673ab7" ];
const scheme_5 = [ "#e8eaf6", "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#1a237e", "#283593", "#303f9f", "#3949ab", "#3f51b5" ];
const scheme_6 = [ "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#2196f3" ];
const scheme_7 = [ "#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#01579b", "#0277bd", "#0288d1", "#039be5", "#03a9f4" ];
const scheme_8 = [ "#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#006064", "#00838f", "#0097a7", "#00acc1", "#00bcd4" ];
const scheme_9 = [ "#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#004d40", "#00695c", "#00796b", "#00897b", "#009688" ];
const scheme_10 = [ "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#1b5e20", "#2e7d32", "#388e3c", "#43a047", "#4caf50" ];
const scheme_11 = [ "#f1f8e9", "#dcedc8", "#c5e1a5", "#aed581", "#9ccc65", "#33691e", "#558b2f", "#689f38", "#7cb342", "#8bc34a" ];
const scheme_12 = [ "#f9fbef", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#827717", "#9e9d24", "#afb42b", "#c0ca33", "#cddc39" ];
const scheme_13 = [ "#fffde8", "#fffac3", "#fff59c", "#fff176", "#ffee58", "#f47f16", "#f9a825", "#fac02e", "#fdd734", "#ffeb3c" ];
const scheme_14 = [ "#fef8e0", "#ffecb2", "#ffe083", "#ffd54f", "#ffc928", "#ff6f00", "#ff8e01", "#ff9f00", "#ffb200", "#fec107" ];
const scheme_15 = [ "#fff2df", "#ffe0b2", "#ffcc80", "#ffb64d", "#ffa827", "#e65100", "#ef6c00", "#f67c01", "#fb8c00", "#ff9700" ];
const scheme_16 = [ "#fbe9e7", "#ffccbb", "#ffab91", "#ff8a66", "#ff7143", "#bf360c", "#d74315", "#e64a19", "#f5511e", "#fe5722" ];
const scheme_17 = [ "#efebe8", "#d7ccc8", "#bcaba4", "#a0887e", "#8c6e63", "#3e2622", "#4d342f", "#5d4038", "#6d4d42", "#795547" ];
const scheme_18 = [ "#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#212121", "#424242", "#616161", "#757575", "#9e9e9e" ];
const scheme_19 = [ "#ebeff2", "#cfd8dd", "#b0bfc6", "#90a4ad", "#78909c", "#273238", "#36474f", "#465a65", "#546f7a", "#607d8b" ];

// amoled

document.getElementById('AMOLEDThemeSwitch').addEventListener('change', () =>{
  localStorage.setItem('useAMOLED',  document.getElementById('AMOLEDThemeSwitch').selected);
//    ShowSnackMessage.ShowSnack("Restart the app to apply the changes", "short");
AndroidFunctionActivityInterface.androidFunction('applyAMOLED');
})


if(localStorage.getItem('useAMOLED') === 'true'){
   document.getElementById('AMOLEDThemeSwitch').selected = true;
} else{
    document.getElementById('AMOLEDThemeSwitch').selected = false;
}


const switchesDataAll = document.querySelectorAll('.switch-save');

switchesDataAll.forEach((sw) =>{
  sw.addEventListener('change', () =>{
    localStorage.setItem(sw.getAttribute('set-value'), sw.selected)
  });


  if(localStorage.getItem(sw.getAttribute('set-value')) && localStorage.getItem(sw.getAttribute('set-value')) === 'true'){
    sw.selected = localStorage.getItem(sw.getAttribute('set-value'))
  } else{
    sw.selected = false
  }

})


