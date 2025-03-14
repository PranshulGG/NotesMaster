const verifyInputPinBtn = document.getElementById('verifyInputPinBtn');
const temp_pass_createDiv = document.getElementById('temp_pass_createDiv');
const main_pass_createDiv = document.getElementById('main_pass_createDiv');


function inputNum(num) {
    if(!temp_pass_createDiv.hidden){
    if(document.getElementById("temp_pass_create").value.length > 6){
        return
    } else if (document.getElementById("temp_pass_create").value.length < 3){
        verifyInputPinBtn.disabled = true;
    } else{
        verifyInputPinBtn.disabled = false;
    }
    document.getElementById("temp_pass_create").value += num;
    localStorage.setItem('temp_pin_code', document.getElementById("temp_pass_create").value)
} else{
    if(document.getElementById("main_pass_create").value.length > 6){
        return
    } else if (document.getElementById("main_pass_create").value.length < 3){
        verifyInputPinBtn.disabled = true;
    } else{
        verifyInputPinBtn.disabled = false;
    }
    document.getElementById("main_pass_create").value += num;
}
}

function clearPinInput() {
    if(!temp_pass_createDiv.hidden){
    document.getElementById("temp_pass_create").value = ''
    localStorage.setItem('temp_pin_code', document.getElementById("temp_pass_create").value)
    if(document.getElementById("temp_pass_create").value.length > 6){
        return
    } else if (document.getElementById("temp_pass_create").value.length < 3){
        verifyInputPinBtn.disabled = true;
    } else{
        verifyInputPinBtn.disabled = false;
    }
} else{
    document.getElementById("main_pass_create").value = ''
    if(document.getElementById("main_pass_create").value.length > 6){
        return
    } else if (document.getElementById("main_pass_create").value.length < 3){
        verifyInputPinBtn.disabled = true;
    } else{
        verifyInputPinBtn.disabled = false;
    }
}

}


function verifyInputPin(){
    if(!temp_pass_createDiv.hidden){
    temp_pass_createDiv.hidden = true;
    main_pass_createDiv.hidden = false;
    verifyInputPinBtn.disabled = true;
    } else{
        if(localStorage.getItem('temp_pin_code') === document.getElementById("main_pass_create").value){
            localStorage.setItem('applabelAccessPin', document.getElementById("main_pass_create").value)
            ShowSnackMessage.ShowSnack('Pin saved!', 'short');
            setTimeout(() =>{
                ActivityBack();
            }, 1000)
        } else{
            ShowSnackMessage.ShowSnack('Wrong pin', 'short');
        }
    }
};

function resetLockConfig(){
    if(localStorage.getItem('temp_pin_code')){
        localStorage.removeItem('temp_pin_code');
    }

    temp_pass_createDiv.hidden = false;
    main_pass_createDiv.hidden = true;
    verifyInputPinBtn.disabled = true;
    document.getElementById("temp_pass_create").value = ''
    document.getElementById("main_pass_create").value = ''
}
