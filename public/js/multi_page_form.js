let fill_prev_btn = document.getElementById("fill-prev-btn");
let sub_next_btn = document.getElementById("sub-next-btn");
let patient_info = document.getElementById("patient-info");
let doctor_info = document.getElementById("doctor-info");

const patient_sex_select = patient_info.querySelector("#patient-sex").innerHTML;
const patient_state_select = patient_info.querySelector("#patient-state").innerHTML;
const patient_city_select = patient_info.querySelector("#patient-city").innerHTML;
const default_border = "1px solid rgba(0, 0, 0, 0.3)";
const error_border = "2px solid red";

fill_prev_btn.addEventListener("click", function(e) {
    if (!patient_info.classList.contains("hide") & doctor_info.classList.contains("hide")) {
        alert("To Be Implemented")
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

sub_next_btn.addEventListener("click", function(e) {
    if (!patient_info.classList.contains("hide") & !doctor_info.classList.contains("hide")) {
        e.preventDefault()
        alert("To Be Implementd")
    }
    else if (patient_info.classList.contains("hide") & !doctor_info.classList.contains("hide")) {
        if(document.getElementById("appointment-form-main").checkValidity()) {
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
        if(document.getElementById("appointment-form-main").checkValidity()) {
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