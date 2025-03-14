const changeAppPinCodeBtn = document.getElementById('changeAppPinCodeBtn');

changeAppPinCodeBtn.addEventListener('click', () =>{
    if(localStorage.getItem('applabelAccessPin')){

    } else{
        ShowSnackMessage.ShowSnack('No saved pin found', 'short');
    }
});

const oldPinInput = document.getElementById('oldPinInput');
const newPinInput = document.getElementById('newPinInput');
const changePinCode = document.getElementById('changePinCode');
const changePinCodeDialog = document.getElementById('changePinCodeDialog');


changePinCode.addEventListener('click', () =>{
    if(oldPinInput.value === localStorage.getItem('applabelAccessPin')){
        localStorage.setItem('applabelAccessPin', newPinInput.value)
        window.history.back();
        ShowSnackMessage.ShowSnack('Pin changed!', 'short');
    } else{
        oldPinInput.error = true;
        ShowSnackMessage.ShowSnack('Wrong pin', 'short');
    }
});


document.getElementById('changeAppPinCodeBtn').addEventListener('click', () =>{
    changePinCodeDialog.show();
    window.history.pushState({ changePinCodeDialogOpen: true }, "");
    if (document.getElementById("headUser-1").scrollTop >= 50) {
        sendThemeToAndroid(colorsDialogsOpenContainer()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
      } else {
        sendThemeToAndroid(colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], colorsDialogsOpenSurface()[GetDialogOverlayContainerColor()], '0colorOnly', '225');
      }
      oldPinInput.value = ''
      newPinInput.value = ''
        oldPinInput.error = false;

})


window.addEventListener("popstate", function (event) {
    if (document.getElementById("changePinCodeDialog").open) {
      document.getElementById("changePinCodeDialog").close();
    }
  });

  document
    .getElementById("changePinCodeDialog")
    .addEventListener("cancel", () => {
      document
        .getElementById("changePinCodeDialog")
        .addEventListener("closed", () => {
          window.history.back();
        });
    });

  document.getElementById("changePinCodeDialog").addEventListener("close", () => {
    if (document.getElementById("headUser-1").scrollTop >= 50) {
      sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface-Container'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')
    } else {
      sendThemeToAndroid(getComputedStyle(document.documentElement).getPropertyValue('--Surface'), getComputedStyle(document.documentElement).getPropertyValue('--Surface'), Themeflag, '210')

    }
  });

//  -------

function notSupported(){
    document.getElementById("useFingerItem").disabled = true;
    document.getElementById("overLineTextFinger").innerHTML = 'Not supported'
    document.getElementById("overLineTextFinger").style.color = "var(--Error)"

}