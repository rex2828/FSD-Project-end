const userInfo = JSON.parse(localStorage.getItem('user-info'));
if (userInfo !== null) {
    window.location.replace('/');
}

const registerBtn = document.getElementById('registerBtn');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const terms_check = document.getElementById('terms-check');


function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return true;
    }

    return false;
}

function validatePassword() {
    if ((password.value).length >= 8) {
        return true;
    }
    return false;
}

function validateCPassword() {
    if ((confirmpassword.value).length >= 8) {
        return true;
    }
    return false;
}

function validateUsername() {
    if ((username.value).length >= 3) {
        return true;
    }
    return false;
}

function validateFname() {
    if (fname.value.trim() !== "") {
        return true;
    }
    return false;
}

function validateLname() {
    if (lname.value.trim() !== "") {
        return true;
    }
    return false;
}


email.addEventListener('input', () => {
    if (validateEmail()) {
        email.classList.remove('is-invalid');
    }
    else {
        email.classList.add('is-invalid');
    }
})

password.addEventListener('input', () => {
    if (validatePassword()) {
        password.classList.remove('is-invalid');
    }
    else {
        password.classList.add('is-invalid');
    }
})

confirmpassword.addEventListener('input', () => {
    const chk = confirmpassword.value === password.value;
    if (validateCPassword() && chk) {
        confirmpassword.classList.remove('is-invalid');
    }
    else {
        confirmpassword.classList.add('is-invalid');
    }
})

username.addEventListener('input', () => {
    if (validateUsername()) {
        username.classList.remove('is-invalid');
    }
    else {
        username.classList.add('is-invalid');
    }
})

lname.addEventListener('input', () => {
    if (validateLname()) {
        lname.classList.remove('is-invalid');
    }
    else {
        lname.classList.add('is-invalid');
    }
})

fname.addEventListener('input', () => {
    if (validateFname()) {
        fname.classList.remove('is-invalid');
    }
    else {
        fname.classList.add('is-invalid');
    }
})


registerBtn.addEventListener('click', (e) => {

    let gender_value = null;
    let inputElements = document.getElementsByClassName('form-check-input');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            gender_value = inputElements[i].value;
            break;
        }
    }



    if (validateEmail() && validateFname() && validateLname() && validatePassword() && validateUsername() && gender_value && confirmpassword.value === password.value) {
        let data = {
            name: fname.value + ' ' + lname.value,
            username: username.value,
            gender: gender_value,
            email: email.value,
            password: password.value,
        }

        fetch("/api/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    localStorage.setItem('user-info', JSON.stringify(data));
                    window.location.replace('/');
                }
            });
    } else {

        alert('invalid data!');
    }
})







