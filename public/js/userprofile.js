JSON.parse(localStorage.getItem('user-info'));
if (userInfo === null) {
    window.location.replace('/login');
}


const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const username = document.getElementById('username');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');
const profilefullname = document.getElementById('profilefullname');
const profileaddress = document.getElementById('profileaddress');


fullname.innerText = userInfo.name;
email.innerText = userInfo.email;
username.innerText = userInfo.username;
mobile.innerText = userInfo.mobile === undefined ? '-' : userInfo.mobile;
address.innerText = userInfo.address === undefined ? '-' : userInfo.address;
fullname.innerText = userInfo.name;
profilefullname.innerText = userInfo.name;
profileaddress.innerText = userInfo.address === undefined ? '-' : userInfo.address;



// Editing and saving the profile
document.getElementById("editProfile").addEventListener("click", func1);
function func1() {
    var elements = document.getElementsByClassName("edit");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("contenteditable", "true");
    }
}

document.getElementById("saveProfile").addEventListener("click", func2);
function func2() {
    var elements = document.getElementsByClassName("edit");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("contenteditable", "false");
    }
}
// Uploading a pic
const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");
imgDiv.addEventListener("mouseenter", function () {
    uploadBtn.style.display = "block";
});
imgDiv.addEventListener("mouseleave", function () {
    uploadBtn.style.display = "none";
});
file.addEventListener("change", function () {
    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
    }
});









