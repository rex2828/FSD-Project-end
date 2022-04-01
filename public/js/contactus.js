const btn = document.getElementById('btn');
const username = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');




btn.addEventListener('click', function (e) {
    e.preventDefault();
    Email.send
        ({
            Host: "smtp.gmail.com",
            Username: "gulshan190210@gmail.com",
            Password: "chsrzdcllsobsdge",
            To: 'gulshan190210@gmail.com',
            From: email.value,
            Subject: "New Enquiry",
            Body: "Name: " + username.value + "<br>Email: " + email.value + "<br>Mobile: " + phone.value + "<br>Query: " + message.value,
        }).then
        (
            message => alert("Message Sent Successfully")
        );

    const data = {
        name: username.value,
        email: email.value,
        phone: phone.value,
        message: message.value
    }
    fetch("/api/postContactData", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            if (data) {
                username.innerText = ''
            }
        });

})


