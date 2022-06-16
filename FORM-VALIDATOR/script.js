const form = document.getElementById('form');
const userName = document.getElementById('user-name');
const email = document.getElementById('email');
const pwd = document.getElementById('password');
const pwdConfirm = document.getElementById('password-confirm');
const formInputs = form.querySelectorAll('input');
const inputIndex = {};
const inputArr = [];

// form submit event listener
// 1.require all
// 2.length:user-name\pwd\pwd-confirm; email:validate
// 3.compare:pwd\pwd-confirm
form.addEventListener('submit', e => {
  e.preventDefault();
  formInputs.forEach((input, index) => {
    inputArr[index] = {
      ele: input,
      checkFlag: true
    }
    inputIndex[input.id] = index;
  });
  checkRequire(inputArr);
  checkLength(inputArr[inputIndex[userName.id]], 3, 15);
  checkLength(inputArr[inputIndex[pwd.id]], 6, 20);
  checkLength(inputArr[inputIndex[pwdConfirm.id]], 6, 20);
  checkEmail(inputArr[inputIndex[email.id]]);
  comparePwd(inputArr[inputIndex[pwd.id]], inputArr[inputIndex[pwdConfirm.id]]);
});

//compare pwd and pwd-confirm
function comparePwd(pwd, pwdConfirm) {
  if (pwd.checkFlag && pwdConfirm.checkFlag) {
    if (pwd.ele.value !== pwdConfirm.ele.value) {
      showError(pwdConfirm.ele, `${spliceMsg(pwd.ele.id)} must same to the password`)
    }
  }
}

//check email address valid
function checkEmail(input) {
  if (input.checkFlag) {
    const validResult = String(input.ele.value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!validResult) {
      showError(input.ele, `${spliceMsg(input.ele.id)} is not valid email address`);
    }
  }
}

// check input value length
function checkLength(input, min, max) {
  if (input.checkFlag) {
    if (input.ele.value.length < min) {
      showError(input.ele, `${spliceMsg(input.ele.id)} is more than ${min} character`);
      input.checkFlag = false;
    } else if (input.ele.value.length > max) {
      showError(input.ele, `${spliceMsg(input.ele.id)} is less than ${max} character`);
      input.checkFlag = false;
    }
  }
}

// check input value empty
function checkRequire(inputArr) {
  inputArr.forEach(input => {
    if (input.checkFlag) {
      if (input.ele.value === '') {
        showError(input.ele, `${spliceMsg(input.ele.id)} is required`);
        input.checkFlag = false;
      } else {
        showSuccess(input.ele);
      }
    }
  });
}

// show success effect
function showSuccess(input) {
  input.parentElement.className = 'form-control success';
}

// show error effect
function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = msg;
}

// splice error msg
function spliceMsg(inputId) {
  let labelName = inputId.split('-').join(' ');
  return labelName.charAt(0).toUpperCase() + labelName.slice(1);
}