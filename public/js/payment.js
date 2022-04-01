const userInfo = JSON.parse(localStorage.getItem('user-info'));
if (userInfo === null) {
    window.location.replace('/login');
}
