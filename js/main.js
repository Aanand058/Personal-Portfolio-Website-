/*
Name: Aanand Aman
Student Id: 166125211
Email: aaman8@myseneca.ca
WEB222 Final Assessment

During this Assessment, I tried including js validations which professor taught us but it was only validating
the phone number and not the postal code simultaneously. So I did some research and found these youtube vidoes and made my 
code with the help of theese video.
Links:  https://www.youtube.com/watch?v=In0nB0ABaUk&ab_channel=WebDevSimplified
        https://www.youtube.com/watch?v=WLUCzSaH5kI&ab_channel=CodeWithHarry

*/


//Other Msg Validation
function otherMsgInputBox() {
    let create= document.createElement('br');
    create.id = 'b1';

    let createOne = document.createElement('br');
    createOne.id = 'b2';

    let createTwo = document.createElement('br');
    createTwo.id = 'b3';

    const label = document.createElement("label");

    const otherTxt = document.createTextNode("Other Purpose Message: ");
    label.appendChild(otherTxt);
    label.id = 'msgLabel';

    const input = document.createElement("input");

    input.id = 'msgInput';
    input.type = 'text';
    input.placeholder = 'Enter your message';
    input.classList.add('format')

    document.querySelector(".radio-btns").appendChild(create);
    document.querySelector(".radio-btns").appendChild(createOne);

    document.querySelector(".radio-btns").appendChild(label);

    document.querySelector(".radio-btns").appendChild(createTwo);
    document.querySelector(".radio-btns").appendChild(input);
}

//Removes the othermsg box if the user de-select the other option
function remOtherMsgInputBox() {

    let msgHead = document.getElementById('msgLabel');
    let msgInput = document.getElementById('msgInput');

    let div = document.querySelector(".radio-btns");

    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(msgInput);
    div.removeChild(msgHead);

}

let jobRadioFunc = document.getElementById('job');

let schoolRadioFunc = document.getElementById('school');

let otherRadioFunc = document.getElementById('other');

var clicked = 0;

jobRadioFunc.addEventListener('click', function() {
    if (clicked > 0) {
        remOtherMsgInputBox();
        clicked = 0;
    }
});

schoolRadioFunc.addEventListener('click', function() {
    if (clicked > 0) {
        remOtherMsgInputBox();
        clicked = 0;
    }
});

otherRadioFunc.addEventListener('click', function() {
    if (clicked == 0) {
        otherMsgInputBox();
        clicked++;
    }
});



//Form Validation
const form = document.getElementById('contact-form');

const errorElement = document.getElementById('errors');

form.addEventListener('submit', (e) => {

    errMessage = [];

    postCodeValidate();
    messageValidate();
    phoneNoValidate();

    if (clicked > 0) {
        otherMsgValidate();
    }
    if (errMessage.length > 0) {
        e.preventDefault();
        errorElement.innerText = errMessage.join('\r\n');
    }
})

//Postal Code Validation using regex
function postCodeValidate() {
    let postalCode = document.getElementById('postCode');
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (!(postalCode.value.match(validRegex))) {
        errMessage.push("*Enter a valid Postal Code.");
    }
}


//Message Validation where length should be greater than 15
function messageValidate() {
    const message = document.getElementById('message');

        if (message.value.length < 15) {
            errMessage.push("*Message should be 15 characters or more. ");
        }
    }


//Phone Number Validation
function phoneNoValidate(){
let phoneNumber = document.getElementById('PhoneNo');

let regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

if(!(phoneNumber.value.match(regex))) {
    errMessage.push("*Enter a valid Phone Number");
}
}

// OtherMessage Validation where length should be greater than 15
function otherMsgValidate() {
    let msgOther = document.getElementById('msgInput');

    if (msgOther.value.length < 15) {
        errMessage.push("*Message (Other) should be 15 characters or more.")
    }
}

