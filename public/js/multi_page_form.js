const fname = document.getElementById('first-name');
const lname = document.getElementById('last-name');
const patient_mobile = document.getElementById('patient-mobile');
const patient_dob = document.getElementById('patient-dob');
const age = document.getElementById('patient-age');
const email = document.getElementById('patient-email');
const gender = document.getElementById('patient-sex');
const state = document.getElementById('patient-state');
const city = document.getElementById('patient-city');
const app_reason = document.getElementById('appointment-reason');


const app_date = document.getElementById('appointment-date');
const app_time = document.getElementById('appointment-time');

const doctorid = window.location.href.split("=")[1];

let fill_prev_btn = document.getElementById("fill-prev-btn");
let sub_next_btn = document.getElementById("sub-next-btn");
let patient_info = document.getElementById("patient-info");
let doctor_info = document.getElementById("doctor-info");

const patient_sex_select = patient_info.querySelector("#patient-sex").innerHTML;
const patient_state_select = patient_info.querySelector("#patient-state").innerHTML;
const patient_city_select = patient_info.querySelector("#patient-city").innerHTML;
const default_border = "1px solid rgba(0, 0, 0, 0.3)";
const error_border = "2px solid red";

fill_prev_btn.addEventListener("click", function (e) {
    if (!patient_info.classList.contains("hide") & doctor_info.classList.contains("hide")) {
        fetch('/api/users/me')
            .then(response => response.json())
            .then(data => {
                const name = data.name;
                const mob = data.mobile;
                const emailval = data.email;
                const usergender = data.gender;
                const firstname = name.split(" ")[0]
                const lastname = name.split(" ")[1]
                fname.value = firstname
                lname.value = lastname
                email.value = emailval
                patient_mobile.value = mob
                console.log(gender)
                gender.innerText = usergender
            });

    }
    else if (patient_info.classList.contains("hide")) {
        patient_info.classList.remove("hide")
        doctor_info.classList.add("hide")
        document.querySelectorAll(".options-container").forEach(element => {
            element.style.display = "initial"
        });
        document.querySelectorAll(".search-box").forEach(element => {
            element.style.display = "initial"
        });
        sub_next_btn.querySelector(".button-text").innerHTML = "Next"
        fill_prev_btn.querySelector(".button-text").innerHTML = "Auto Fill"
        document.getElementById("appointment-date").removeAttribute("required")
        document.getElementById("appointment-time").removeAttribute("required")
    }
    else if (!patient_info.classList.contains("hide") & !doctor_info.classList.contains("hide")) {
        patient_info.classList.add("hide")
        doctor_info.classList.remove("hide")
        document.querySelectorAll(".form-field").forEach(element => {
            element.removeAttribute("readonly")
            document.getElementById("patient-age").setAttribute("readonly", true)
            document.getElementById("doctor-name").setAttribute("readonly", true)
            document.getElementById("doctor-specialization").setAttribute("readonly", true)
            document.getElementById("appointment-loc-state").setAttribute("readonly", true)
            document.getElementById("appointment-loc-city").setAttribute("readonly", true)
        });
        document.querySelectorAll(".form-area").forEach(element => {
            element.removeAttribute("readonly")
        });
        sub_next_btn.querySelector(".button-text").innerHTML = "Next"
        fill_prev_btn.querySelector(".button-text").innerHTML = "Back"
    }
});

sub_next_btn.addEventListener("click", async function (e) {
    if (!patient_info.classList.contains("hide") & !doctor_info.classList.contains("hide")) {
        e.preventDefault()
        obj = {
            name: fname.value + ' ' + lname.value,
            mobile: patient_mobile.value,
            email: email.value,
            gender: gender.innerText,
            state: state.innerText,
            city: city.innerText,
            reason: app_reason.value,
            dob: patient_dob.value,
            age: age.value,
            appointmentDate: app_date.value,
            appointmentTime: app_time.value
        }
        const res = await fetch(`/api/bookappointment?id=${doctorid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        const data = await res.json();
        if (data.status === 'ok') {
            console.log(data);
            // location.assign(`/payment?=${data._id}`);
        }
        else {
            console.log('booking error!');
        }

        fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { id: 1, docId: window.location.search.slice(4) },
            ),
        })
            .then(res => {
                if (res.ok) { return res.json() }
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ status, url }) => {
                window.location = url
            })
            .catch(err => {
                console.error(err.error)
            })

    }
    else if (patient_info.classList.contains("hide") & !doctor_info.classList.contains("hide")) {
        if (document.getElementById("appointment-form-main").checkValidity()) {
            e.preventDefault()
            patient_info.classList.remove("hide")
            doctor_info.classList.remove("hide")
            document.querySelectorAll(".options-container").forEach(element => {
                element.style.display = "none"
            });
            document.querySelectorAll(".search-box").forEach(element => {
                element.style.display = "none"
            });
            document.querySelectorAll(".form-field").forEach(element => {
                element.setAttribute("readonly", true)
            });
            document.querySelectorAll(".form-area").forEach(element => {
                element.setAttribute("readonly", true)
            });
            sub_next_btn.querySelector(".button-text").innerHTML = "Book Appointment"
            fill_prev_btn.querySelector(".button-text").innerHTML = "Back"
        }
    }
    else if (doctor_info.classList.contains("hide")) {
        if (document.getElementById("appointment-form-main").checkValidity()) {
            e.preventDefault()
            if (patient_info.querySelector("#patient-sex").innerHTML == patient_sex_select) {
                patient_info.querySelector("#patient-sex").parentElement.style.border = error_border
            }
            else if (patient_info.querySelector("#patient-state").innerHTML == patient_state_select) {
                patient_info.querySelector("#patient-state").parentElement.style.border = error_border
            }
            else if (patient_info.querySelector("#patient-city").innerHTML == patient_city_select) {
                patient_info.querySelector("#patient-city").parentElement.style.border = error_border
            }
            else {
                patient_info.classList.add("hide")
                doctor_info.classList.remove("hide")
                sub_next_btn.querySelector(".button-text").innerHTML = "Next"
                fill_prev_btn.querySelector(".button-text").innerHTML = "Back"
                document.getElementById("appointment-date").setAttribute("required", true)
                document.getElementById("appointment-time").setAttribute("required", true)
            }
        }
    }
});

patient_info.querySelector("#patient-sex").parentElement.addEventListener("click", () => {
    patient_info.querySelector("#patient-sex").parentElement.style.border = default_border;
})

patient_info.querySelector("#patient-state").parentElement.addEventListener("click", () => {
    patient_info.querySelector("#patient-state").parentElement.style.border = default_border;
})

patient_info.querySelector("#patient-city").parentElement.addEventListener("click", () => {
    patient_info.querySelector("#patient-city").parentElement.style.border = default_border;
})