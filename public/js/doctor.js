const searchInput = document.getElementById('search');
const doctorCardTemplate = document.getElementById('doctor-row-template');
const doctorCardContainer = document.getElementById('doctor-row-container');
const table = document.querySelector('table');
const sortSelector = document.getElementById('sort-selector');
const locationSelector = document.getElementById('location-selector');
const currentRecords = document.getElementById('current-records');
const totalRecords = document.getElementById('total-records');

let doctors = [];

let fetchRes = fetch("/api/doctors/getdoctors");
fetchRes.then(res =>
    res.json()).then(d => {
        let approvedDoctors = d.filter((doctor) => {
            return doctor.approved === true
        })
        doctors = approvedDoctors.map(doctor => {
            const card = doctorCardTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector("#doctor-name");
            const edu = card.querySelector("#doctor-edu");
            const location = card.querySelector("#doctor-location");
            const fee = card.querySelector("#doctor-fee");
            const category = card.querySelector("#doctor-category");
            const rating = card.querySelector("#doctor-rating");
            const img = card.querySelector("#doctor-img");
            const btn = card.querySelector('#bookappointmentBtn');
            btn.setAttribute("onclick", `location.href = '/bookappointment?id=${doctor._id}';`);
            img.setAttribute("src", doctor.pic);
            name.textContent = doctor.name;
            name.setAttribute("href", `/doctorprofile?id=${doctor._id}`);
            edu.textContent = doctor.edu;
            location.textContent = doctor.clinicaddress;
            fee.textContent = doctor.fee;
            category.textContent = doctor.category;
            rating.textContent = doctor.rating;
            doctorCardContainer.append(card);
            return { name: doctor.name, edu: doctor.edu, category: doctor.category, location: doctor.clinicaddress.split(",")[0], element: card }
        });
        totalRecords.innerHTML = `<b>${doctors.length}</b>`
    })


searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    doctors.forEach(doctor => {
        const isVisible = doctor.name.toLowerCase().includes(value) || doctor.edu.toLowerCase().includes(value) || doctor.category.toLowerCase().includes(value);
        doctor.element.classList.toggle('hide', !isVisible);
    })
})

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        aColTextInt = parseFloat(aColText);
        bColTextInt = parseFloat(bColText);
        return aColTextInt > bColTextInt ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // re-add the newly sorted rows
    tBody.append(...sortedRows);
}


sortSelector.addEventListener('change', () => {
    if (sortSelector.value === "1") {
        sortTableByColumn(table, 5, false);
    }
    else if (sortSelector.value === "2") {
        sortTableByColumn(table, 3);
    }
})


locationSelector.addEventListener('change', () => {
    doctors.forEach((doctor) => {
        doctor.element.classList.remove('hide');
        if (doctor.location != locationSelector.value) {
            doctor.element.classList.add('hide');
        }
        else if (locationSelector.value) {
            doctor.element.classList.remove("hide");
        }
    })
})