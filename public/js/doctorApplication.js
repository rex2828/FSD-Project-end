const dname = document.getElementById('d-name');
const dcategory = document.getElementById('d-category');
const l1 = document.getElementById('L1');
const l2 = document.getElementById('L2');
const l3 = document.getElementById('L3');
const fee = document.getElementById('d-fee');
const edu = document.getElementById('d-edu');
const exp = document.getElementById('d-exp');
const address = document.getElementById('d-address');
const email = document.getElementById('d-email');
const mobile = document.getElementById('d-mobile');
const d_add_btn = document.getElementById('doctor-add-btn');
const doctorAddForm = document.getElementById('doctor-add-form');


d_add_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = []
    if (l1.checked) {
        lang.push(l1.value)
    }
    if (l2.checked) {
        lang.push(l2.value)
    }
    if (l3.checked) {
        lang.push(l3.value)
    }
    data = {
        name: dname.value,
        category: dcategory.value,
        languages: lang,
        fee: fee.value,
        edu: edu.value,
        experience: exp.value,
        email: email.value,
        mobile: mobile.value,
        clinicaddress: address.value,
    }
    console.log(data);
    fetch("/api/doctors/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            if (data) {
                location.assign('/verified?m1=Application Submitted&m2=We are currenly reviewing your application')
            }
        }).catch(() => {
            console.log('error')
        });

})
