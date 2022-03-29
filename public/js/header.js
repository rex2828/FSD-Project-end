const loginRegisterBtn = document.getElementById('login-register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = JSON.parse(localStorage.getItem('user-info'));

logoutBtn.classList.add('hidden');

if (userInfo) {
    logoutBtn.classList.remove('hidden');
    username = userInfo.username;
    loginRegisterBtn.innerText = username;
    loginRegisterBtn.setAttribute('href', '/userprofile');
}
logoutBtn.addEventListener('click', () => {
    localStorage.clear();
})


