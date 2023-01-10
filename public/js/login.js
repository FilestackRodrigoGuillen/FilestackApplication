window.addEventListener('DOMContentLoaded',function(){

    //ELEMENTS
    this.email = document.getElementById("emailadress_login");
    this.password = document.getElementById("password_login");
    this.login_button = document.getElementById("button_login");

    this.login_button.addEventListener('click', ()=>this.login());

})

function login(){
    if(this.email.value && this.password.value){
        console.log(this.email.value);
        console.log(this.password.value);
        this.loginpost(this.email.value,this.password.value);
    }else{
        alert("YOU NEED TO FILL UP ALL THE FIELDS IN ORDER TO LOGIN");
    }
}

async function loginpost(email,password){
    let user = {
        email:email,
        password:password
    }
    const response = await fetch("http://192.168.0.5:3900/userlogin",{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });
    response.json().then(data => {
        if(data.length > 0){
            console.log(data);
            localStorage.setItem('userid', data[0].userid);
            localStorage.setItem('email', data[0].email);
            localStorage.setItem('phone', data[0].phone);
            localStorage.setItem('type', data[0].type);
            localStorage.setItem('name', data[0].name);
            localStorage.setItem('age', data[0].age);
            localStorage.setItem('state', data[0].state);
            localStorage.setItem('city', data[0].city);



            console.log(localStorage.getItem('state'));
            console.log(localStorage.getItem('city'));

            if(localStorage.getItem('type') == 'w'){
                window.location.href = 'http://192.168.0.5:3900/worker';
            }else if(localStorage.getItem('type') == 'c'){
                window.location.href = 'http://192.168.0.5:3900/company';
            }
            
              
        }else{
            alert("YOUR EMAIL OR PASSWORD ARE INCORRECT");
        }
    })
}