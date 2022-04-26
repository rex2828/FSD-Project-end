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

// const file = document.querySelector("#file");

// file.addEventListener("change", function () {
//     const choosedFile = this.files[0];
//     if (choosedFile) {
//         const reader = new FileReader();
//         reader.addEventListener("load", function () {
//             img.setAttribute("src", reader.result);
//         });
//         reader.readAsDataURL(choosedFile);
//     }
// });

const appointmentContainer = document.getElementById('appointments');
const getappointments = async () => {
    const res = await fetch('/api/getappointments');
    const data = await res.json();
    if (data.length > 0) {
        let html = '';
        data.forEach(appointment => {
            html += `<div>Patient's Name: ${appointment.name.toUpperCase()} <br>Doctor's Name: ${appointment.doctor.name} <br>Appointment Date: ${new Date(appointment.appointmentDate).toDateString()}<br>Appointment Time: ${appointment.appointmentTime}</div><hr>`
        });
        appointmentContainer.innerHTML = html;
    } else {
        appointmentContainer.innerHTML = 'Currently no appointments.';
    }
}

const saveProfile = document.getElementById('saveProfile');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const username = document.getElementById('username');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');




saveProfile.addEventListener('click', async (e) => {
    e.preventDefault();
    const obj = {
        name: fullname.innerText,
        email: email.innerText,
        username: username.innerText,
        mobile: mobile.innerText,
        address: address.innerText
    }

    const res = await fetch('/api/users/updateuser', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(obj)
    });
    const data = await res.json();
})

getappointments();

document.getElementById('uploadbtn').addEventListener('click', (e) => {
    const loaded = document.getElementById('image-input').value !== "";
    if (!loaded) {
        e.preventDefault();
        alert('upload an image');
    }
})
