const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-btn');

const userInfo = JSON.parse(localStorage.getItem('user-info'));
if (userInfo !== null) {
    window.location.replace('/');
}

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


loginButton.addEventListener('click', () => {

    const valid = validateEmail() && validatePassword();

    if (valid) {
        let data = {
            email: loginEmail.value,
            password: loginPassword.value,
        }

        fetch("/api/users/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json()
        })
            .then(data => {
                if (data.status === 'success') {
                    localStorage.setItem('user-info', JSON.stringify(data));
                    window.location.replace('/');
                } else {
                    console.log(data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
    } else {
        alert('invalid data');
    }


})



