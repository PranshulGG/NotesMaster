function sendThemeToAndroid(status, nav, flag, flagAnimAndroid) {
    AndroidInterface.updateStatusBarColor(status, nav, flag, flagAnimAndroid);
};


let Themeflag = '0'

function checkThemeFlag(){
    if(localStorage.getItem('useDarkTheme') && localStorage.getItem('useDarkTheme') === 'true'){
        Themeflag = '0'
    } else{
        Themeflag = '1'
    } 
}

checkThemeFlag()

// -----------------

function navigateActivity(name) {
    OpenActivityInterface.OpenActivity(name);
};

// ----------

function ActivityBack(){
    BackActivityInterface.CloseActivity();
}

// dialog colors

function getColorWithOpacity(varName, opacity) {
    let color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    if (color.startsWith('#')) {
      if (color.length === 4) {
        color = '#' + [...color.slice(1)].map(c => c + c).join('');
      }
      return `#${opacity}${color.slice(1)}`;
    }

    return color;
 }

const colorsDialogsOpenSurface = () => ({
//   Dialog : "#9C040101",
   Dialog : getColorWithOpacity('--lightDialog', '9C'),
   Dialog_dark : getColorWithOpacity('--Surface-Container-Lowest', '80')

});


const colorsDialogsOpenContainer = () => ({
//   Dialog : "#B0231917",
   Dialog : getColorWithOpacity('--On-Surface', 'B0'),
   Dialog_dark : getColorWithOpacity('--Surface-Container-Low', '70')
});



// get colors

function GetDialogOverlayContainerColor() {
    const theme = document.documentElement.getAttribute('theme');
    if (!theme) return null; 

    if (localStorage.getItem('useDarkTheme') === 'true') {
        return 'Dialog_dark';
    } else {
        return 'Dialog';
    }
}

//font

function applyAppFont(){
    if(localStorage.getItem('SelectedAPPfont') === 'roboto'){
        document.documentElement.setAttribute('sys-font', 'roboto');
    } else{
        document.documentElement.setAttribute('sys-font', ' ');
    }
}

applyAppFont();


