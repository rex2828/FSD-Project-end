const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-btn');

function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail.value)) {
        return true;
    }
    return false;
}

function validatePassword() {
    if ((loginPassword.value).length >= 8) {
        return true;
    }
    return false;
}


loginEmail.addEventListener('input', () => {
    if (validateEmail()) {
        loginEmail.classList.remove('is-invalid');
    }
    else {
        loginEmail.classList.add('is-invalid');
    }
})

loginPassword.addEventListener('input', () => {
    if (validatePassword()) {
        loginPassword.classList.remove('is-invalid');
    }
    else {
        loginPassword.classList.add('is-invalid');
    }
})


loginButton.addEventListener('click', async () => {

    const valid = validateEmail() && validatePassword();

    if (valid) {
        let obj = {
            email: loginEmail.value,
            password: loginPassword.value,
        }

        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        const data = await res.json();


        if (data.status === 'SUCCESS') {
            location.assign('/');
        } else {
            alert(data.message)
        }

    } else {
        alert('invalid data');
    }


})






