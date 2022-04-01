const userInfo = JSON.parse(localStorage.getItem('user-info'));
if (userInfo === null) {
    window.location.replace('/login');
}


const paymentBtn = document.getElementById('payment-btn');
paymentBtn.addEventListener('click', () => {
    alert('To be implemented!')
})