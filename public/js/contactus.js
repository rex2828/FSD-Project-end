let btn = document.getElementById('btn');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    Email.send
        ({
            Host: "smtp.gmail.com",
            Username: "gulshan190210@gmail.com",
            Password: "chsrzdcllsobsdge",
            To: 'gulshan190210@gmail.com',
            From: document.getElementById('email').value,
            Subject: "New Enquiry",
            Body: "Name: " + document.getElementById('name').value + "<br>Email: " + document.getElementById('email').value + "<br>Mobile: " + document.getElementById('phone').value + "<br>Query: " + document.getElementById('message').value,
        }).then
        (
            message => alert("Message Sent Successfully")
        );
})