appointments = []
const appointmentContainer = document.getElementById('appointment-container')
const appointmentCardTemplate = document.getElementById('appointment-template')
fetch('/api/doctors/doctorappointments').then(res => res.json())
    .then(d => {
        console.log(d)
        appointments = d.map(appointment => {
            const card = appointmentCardTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector(".user-name")
            const age = card.querySelector('.user-age')
            const gender = card.querySelector('.user-gender')
            const state = card.querySelector('.user-state')
            const city = card.querySelector('.user-city')
            const btn = card.querySelector('.appointment-delete-btn')

            name.textContent = appointment.name
            age.textContent = appointment.age
            gender.textContent = appointment.gender
            city.textContent = appointment.city
            state.textContent = appointment.state
            btn.setAttribute('onclick', `location.href = '/api/deleteAppointment?id=${appointment._id}';`)
            appointmentContainer.append(card);
            const avatar = card.querySelector(".avatar")
            avatar.setAttribute('onclick', `this.parentElement.parentElement.classList.toggle("active")`)
        });
    })