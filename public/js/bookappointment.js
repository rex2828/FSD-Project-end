let selected_all = document.querySelectorAll(".selected")

let today = new Date()
let dd = today.getDate()
let mm = today.getMonth() + 1
let yyyy = today.getFullYear()
if (dd < 10) {
    dd = "0" + dd.toString();
}
if (mm < 10) {
    mm = "0" + mm.toString();
}
let output_today = yyyy + "-" + mm + "-" + dd;
let dob_field = document.getElementById("patient-dob");
dob_field.setAttribute("max", output_today);

let input_dob = new Date(dob_field.value);
dob_field.addEventListener("change", function (e) {
    input_dob = new Date(dob_field.value);
    if (input_dob > today) {
        dob_field.value = output_today;
    }
    document.getElementById("patient-age").value = getAge();
    if (document.getElementById("patient-age").value == "NaN") {
        document.getElementById("patient-age").value = ""
    }
});

function getAge() {
    if (Math.floor((today - input_dob) / 1000 / 60 / 60 / 24 / 365.25) + 1 < 0) {
        return 0;
    }
    if (today.getDate() == input_dob.getDate() & today.getMonth() == input_dob.getMonth()) {
        return Math.floor((today - input_dob) / 1000 / 60 / 60 / 24 / 365.25) + 1;
    }
    return Math.floor((today - input_dob) / 1000 / 60 / 60 / 24 / 365.25);
}

let tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
let tom_dd = tomorrow.getDate();
let tom_mm = tomorrow.getMonth() + 1;
let tom_yyyy = tomorrow.getFullYear();
if (tom_dd < 10) {
    tom_dd = "0" + tom_dd.toString();
}
if (tom_mm < 10) {
    tom_mm = "0" + tom_mm.toString();
}
let output_tomorrow = tom_yyyy + "-" + tom_mm + "-" + tom_dd;
let appoint_date_field = document.getElementById("appointment-date");
appoint_date_field.setAttribute("min", output_tomorrow);

let input_appoint_date = new Date(appoint_date_field.value);
appoint_date_field.addEventListener("change", function (e) {
    input_appoint_date = new Date(appoint_date_field.value);
    if (input_appoint_date < tomorrow) {
        appoint_date_field.value = output_tomorrow;
    }
});

function filter_list(search_term, options_list = null) {
    search_term = search_term.toLowerCase();
    if (options_list != null) {
        options_list.forEach(option => {
            let search_get_text = option.firstElementChild.nextElementSibling.innerText.toLowerCase()
            if (search_term.length == 0) {
                option.style.display = "inherit"
            }
            else if (search_get_text.indexOf(search_term) != -1) {
                option.style.display = "inherit"
            }
            else {
                option.style.display = "none"
            }
        })
    }
}


selected_all.forEach(selected => {
    let options_container = selected.previousElementSibling;
    let options_list = options_container.querySelectorAll(".option")
    let selected_current = selected.querySelector(".selected-current")
    if (selected.parentElement.querySelector(".search-box")) {
        options_container.style.marginTop = "117px";
    }
    let data_index
    let current_active

    selected.addEventListener("click", () => {
        if (options_container.classList.contains("active")) {
            options_container.classList.remove("active")
        }
        else {
            current_active = document.querySelector(".options-container.active")

            if (current_active) {
                current_active.classList.remove("active")
            }

            options_container.classList.add("active")
        }

        options_list = options_container.querySelectorAll(".option");
        options_list.forEach(o => {
            o.addEventListener("click", () => {
                selected_current.innerHTML = o.querySelector("label p").innerHTML;
                data_index = o.querySelector("label p").getAttribute("data-index")
                options_container.setAttribute("data-index", data_index)
                options_container.classList.remove("active")
            })
        })

        if (selected.parentElement.querySelector(".search-box")) {
            let search_box = selected.nextElementSibling.querySelectorAll(".search-box input")
            search_box.forEach(search => {
                search.value = "";
                search.focus();
                filter_list("", options_list);
                search.addEventListener("keyup", function (e) {
                    filter_list(e.target.value, options_list);
                })
            })
        }
    })
})