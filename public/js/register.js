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


registerBtn.addEventListener('click', (e) => {
    let gender_value = null;
    let inputElements = document.getElementsByClassName('form-check-input');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            gender_value = inputElements[i].value;
            break;
        }
    }

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
})


