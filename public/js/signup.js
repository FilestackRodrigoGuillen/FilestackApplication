window.addEventListener('DOMContentLoaded', function(){
    this.btn_signup = document.getElementById("signup");
    //EVENTS
    this.btn_signup.addEventListener("click", () => this.signup());
});

function signup(){
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");
    let confirm = document.getElementById("confirm");
    let worker = document.getElementById("woker");
    let company = document.getElementById("company");

    if(name.value.length > 0 && age.value.length && email.value.length
        && phone.value.length && password.value.length && confirm.value.length){
            if(password.value === confirm.value){
                let signup_object = {};
                if(worker.checked || company.checked){
                    signup_object.name = name.value;
                    signup_object.age = parseInt(age.value);
                    signup_object.email = email.value;
                    signup_object.password = password.value;
                    signup_object.confirm = confirm.value;
                    signup_object.phone = parseInt(phone.value);
                    if(worker.checked){signup_object.type = "w";}
                    if(company.checked){signup_object.type = "c";}
                    this.signuprequest(signup_object);
                }else{
                    alert("You need to define if you are a worker or a company");
                }
            }else{
                alert("Informarion not complete");
            }
    }else{
        alert("Informarion not complete");
    }
    
}

async function signuprequest(signup_object) {
    console.log(signup_object);
    const response = await fetch("http://localhost:3900/signupuser", {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(signup_object),
    /*body: `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
    }`,*/
    });

    response.json().then(data => {
        console.log(data);
    });
}