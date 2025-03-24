import { argbFromHex, hexFromArgb, themeFromSourceColor, applyTheme} from '../material-color-utilities.mjs';

document.addEventListener("DOMContentLoaded", function () {
    const colorPickerElement = document.querySelector("#colorPicker");

    if (!colorPickerElement) {
        console.warn("Color picker element not found!");
        return;
    }

    const setColorPickerWidth = () => {
        colorPicker.resize(Math.min(document.querySelector('.customthemeSlider').offsetWidth - 120, 300));
    };

    const colorPicker = new iro.ColorPicker(colorPickerElement, {
        width: Math.min(document.querySelector('.customthemeSlider').offsetWidth - 120, 300),
        color: localStorage.getItem('materialThemeColorSource') || '#ff0000',
    });


    window.addEventListener('resize', setColorPickerWidth);


//    const iroSlider = document.querySelector(".IroSlider");
//    if (iroSlider) {
//        iroSlider.style.height = "40px";
//        iroSlider.style.borderRadius = "50px";
//    }
//
//    const iroGradient = document.querySelector(".IroSliderGradient");
//    if (iroGradient) {
//        iroGradient.style.height = "100%";
//        iroGradient.style.borderRadius = "50px";
//    }
//
//    const iroHandle = document.querySelector(".IroHandle");
//    if (iroHandle) {
//
//        iroHandle.style.top = "-2px";
//        iroHandle.style.left = "-2px";
//
//        const circles = iroHandle.querySelectorAll("circle");
//        circles[0]?.setAttribute("r", "12");
//        circles[0]?.setAttribute("stroke-width", "2");
//        circles[0]?.setAttribute("stroke", "#000");
//
//        circles[1]?.setAttribute("r", "10");
//        circles[1]?.setAttribute("stroke-width", "2");
//        circles[1]?.setAttribute("stroke", "#fff");
//    }



    colorPicker.on("input:end", function (color) {
        themeConfig(color.hexString, 'coloring');
    });
});



export function themeConfig(color, isSlider, isDynamic){
    const sourceColor = argbFromHex(color);
    const theme = themeFromSourceColor(sourceColor);
    const darkScheme = theme.schemes.dark;
    const lightScheme = theme.schemes.light;

    if(isDynamic){
    } else{
    localStorage.setItem('materialThemeColorSource', color)
    }

    if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
        setCustomTheme(darkScheme, theme.palettes, '', isSlider);
        document.documentElement.setAttribute('colorTheme', 'dark');
    } else{
        setCustomTheme(lightScheme, theme.palettes, 'light', isSlider);
        document.documentElement.setAttribute('colorTheme', 'light');

    }

    if(document.querySelector('.colorPrevSeed')){
          document.querySelector('.colorPrevSeed').style.backgroundColor = color
    }

}

window.themeConfig = themeConfig;


function setCustomTheme(scheme, palettes, type, isSlider) {
    const root = document.documentElement;

    const getTone = (p, tone) => hexFromArgb(p.tone(tone));


    root.style.setProperty('--Surface-Container-Lowest', getTone(palettes.neutral, type === 'light' ? 100 : 4));
    root.style.setProperty('--Surface-Container-Low', getTone(palettes.neutral, type === 'light' ? 96 : 10));
    root.style.setProperty('--Surface-Container', getTone(palettes.neutral, type === 'light' ? 94 : 12));
    root.style.setProperty('--Surface-Container-High', getTone(palettes.neutral, type === 'light' ? 92 : 17));
    root.style.setProperty('--Surface-Container-Highest', getTone(palettes.neutral, type === 'light' ? 90 : 22));

    root.style.setProperty('--Primary', getTone(palettes.primary, type === 'light' ? 40 : 80));
    root.style.setProperty('--On-Primary', getTone(palettes.primary, type === 'light' ? 100 : 20));
    root.style.setProperty('--Primary-Container', getTone(palettes.primary, type === 'light' ? 90 : 30));
    root.style.setProperty('--On-Primary-Container', getTone(palettes.primary, type === 'light' ? 10 : 90));

    root.style.setProperty('--Secondary', getTone(palettes.secondary, type === 'light' ? 40 : 80));
    root.style.setProperty('--On-Secondary', getTone(palettes.secondary, type === 'light' ? 100 : 20));
    root.style.setProperty('--Secondary-Container', getTone(palettes.secondary, type === 'light' ? 90 : 30));
    root.style.setProperty('--On-Secondary-Container', getTone(palettes.secondary, type === 'light' ? 10 : 90));

    root.style.setProperty('--Tertiary', getTone(palettes.tertiary, type === 'light' ? 40 : 80));
    root.style.setProperty('--On-Tertiary', getTone(palettes.tertiary, type === 'light' ? 100 : 20));
    root.style.setProperty('--Tertiary-Container', getTone(palettes.tertiary, type === 'light' ? 90 : 30));
    root.style.setProperty('--On-Tertiary-Container', getTone(palettes.tertiary, type === 'light' ? 10 : 90));

    root.style.setProperty('--Error', getTone(palettes.error, type === 'light' ? 40 : 80));
    root.style.setProperty('--On-Error', getTone(palettes.error, type === 'light' ? 100 : 20));
    root.style.setProperty('--Error-Container', getTone(palettes.error, type === 'light' ? 90 : 30));
    root.style.setProperty('--On-Error-Container', getTone(palettes.error, type === 'light' ? 10 : 90));

    root.style.setProperty('--Surface', getTone(palettes.neutral, type === 'light' ? 98 : 6));

    root.style.setProperty('--Inverse-Surface', getTone(palettes.neutral, type === 'light' ? 20 : 90));
    root.style.setProperty('--Inverse-On-Surface', getTone(palettes.neutral, type === 'light' ? 95 : 20));
    root.style.setProperty('--Inverse-Primary', getTone(palettes.primary, type === 'light' ? 80 : 40));

    root.style.setProperty('--On-Surface', getTone(palettes.neutral, type === 'light' ? 10 : 90));
    root.style.setProperty('--On-Surface-Variant', getTone(palettes.neutralVariant, type === 'light' ? 30 : 80));

    root.style.setProperty('--Outline', getTone(palettes.neutralVariant, type === 'light' ? 50 : 60));
    root.style.setProperty('--Outline-Variant', getTone(palettes.neutralVariant, type === 'light' ? 80 : 30));
    root.style.setProperty('--lightDialog', getTone(palettes.neutralVariant, 0.4));



    root.style.setProperty('--Scrim', '#000000');
    root.style.setProperty('--Shadow', '#000000');




    if(isSlider){

        if (document.getElementById("chooseMaterialColorDialog").open){
            if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
                if (document.getElementById("headUser-1").scrollTop >= 50) {
                     sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
                  } else {
                    sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
                  }
       }

       return;
    }

        if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
             if(document.getElementById("headUser-1").scrollTop >= 50){
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
          } else{
                sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '0')
          }
    } else{
         if(document.getElementById("headUser-1").scrollTop >= 50){
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')
         } else{
            sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), '1')

       }
    }
}

}


//dialog

  document.addEventListener('DOMContentLoaded', () =>{



    const customOpenAnimation = {
      dialog: [
          [
              // Dialog fades in
              [{ 'transform': 'scale(1.1)' }, { 'transform': 'scale(1)' }],
              { duration: 150, easing: 'ease-out' },
          ],
      ],
      scrim: [
          [
              // Scrim fades in
              [{ opacity: 0 }, { opacity: 0.6 }],
              { duration: 170, easing: 'ease-in' },
          ],
      ],
      container: [
          [
              // Container fades in
              [{ opacity: 0 }, { opacity: 1 }],
              { duration: 170, easing: 'ease-in' },
          ],
      ],
  };

  const customCloseAnimation = {
      dialog: [
          [
              // Dialog fades out
              [{ 'transform': 'scale(1)' }, { 'transform': 'scale(1.05)' }],
              { duration: 150, easing: 'ease-in' },
          ],
      ],
      scrim: [
          [
              // Scrim fades out
              [{ opacity: 0.6 }, { opacity: 0 }],
              { duration: 190, easing: 'ease-out' },
          ],
      ],
      container: [
          [
              [{ opacity: 1 }, { opacity: 0 }],
              { duration: 190, easing: 'ease-in' },
          ],
      ],
  };

  const dialogs = document.querySelectorAll('md-dialog');

  dialogs.forEach((dialog) => {
      dialog.getOpenAnimation = () => customOpenAnimation;
      dialog.getCloseAnimation = () => customCloseAnimation;
  });


});


