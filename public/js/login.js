const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-btn');

const userInfo = JSON.parse(localStorage.getItem('user-info'));
if (userInfo !== null) {
    window.location.replace('/')
}

loginButton.addEventListener('click', () => {

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
})



