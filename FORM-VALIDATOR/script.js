const form = document.getElementById('form');
const userNameEle = document.getElementById('user-name');
const emailEle = document.getElementById('email');
const pwdEle = document.getElementById('password');
const pwdConfirmEle = document.getElementById('password-confirm');
const minCharacter = 6;
const maxCharacter = 15;
const RegEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const errorMsgObj = {
  'required': 'is need required',
  'characterLength': 'is more than 6 and less than 20 character',
  'mailValid': 'error email address',
  'pwdConfirm': 'the two password does not same'
}

function initInputCheckStatus(...inputArr) {
  inputArr.forEach(input => {
    input.checkNext = true;
  });
};

function addStatusClass(...inputArr) {
  inputArr.forEach(input => {
    if (input.checkNext) {
      input.parentElement.className = 'input-box success';
    } else {
      input.parentElement.className = 'input-box error';
    }
  })
};

function addErrMsg(ele, type) {
  ele.checkNext = false;
  const small = ele.parentElement.querySelector('small');
  const label = ele.parentElement.querySelector("label");
  switch (type) {
    case 'required':
      small.innerText = `${label.innerText} ${errorMsgObj.required}`;
      break;
    case 'characterLength':
      small.innerText = `${label.innerText} ${errorMsgObj.characterLength}`;
      break;
    case 'mailValid':
      small.innerText = `${errorMsgObj.mailValid}`;
      break;
    case 'pwdConfirm':
      small.innerText = `${errorMsgObj.pwdConfirm}`;
      break;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  initInputCheckStatus(userNameEle, emailEle, pwdEle, pwdConfirmEle);
  checkRequired(userNameEle, emailEle, pwdEle, pwdConfirmEle);
  checkCharacterLength(userNameEle, pwdEle, pwdConfirmEle);
  checkEmailAddress(emailEle);
  checkPwdConfirm(pwdEle, pwdConfirmEle);
  addStatusClass(userNameEle, emailEle, pwdEle, pwdConfirmEle);
});

function checkRequired(...inputArr) {
  inputArr.forEach(input => {
    if (input.checkNext) {
      if (input.value === '') {
        addErrMsg(input, 'required');
      }
    }
  });
};

function checkCharacterLength(...inputArr) {
  inputArr.forEach(input => {
    if (input.checkNext) {
      if (input.value.length < minCharacter || input.value.length > maxCharacter) {
        addErrMsg(input, 'characterLength');
      }
    }
  });
};

function checkEmailAddress(...inputArr) {
  inputArr.forEach(input => {
    if (input.checkNext) {
      if (!String(input.value).toLowerCase().match(RegEmail)) {
        addErrMsg(input, 'mailValid');
      }
    }
  });
};

function checkPwdConfirm(pwdEle, pwdConfirmEle) {
  if (pwdEle.checkNext && pwdConfirmEle.checkNext) {
    if (pwdEle.value !== pwdConfirmEle.value) {
      addErrMsg(pwdConfirmEle, 'pwdConfirm');
    }
  }
};
