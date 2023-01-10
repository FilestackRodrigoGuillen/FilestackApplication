window.addEventListener('DOMContentLoaded', function(){
    location.hash = "#joboffer";
    ///////////////////////////////HTML ELEMENTS
    //MODULES
    this.profilemodule = document.getElementById("profilemodule");
    this.contactmodule = document.getElementById("contactmodule");
    this.aboutusmodule = document.getElementById("aboutusmodule");
    this.joboffersmodule = document.getElementById("joboffersmodule");
    //TABS
    this.profiletab = document.getElementById("profiletab");
    this.contacttab = document.getElementById("contacttab");
    this.abouttab = document.getElementById("abouttab");
    this.jobofferstab = document.getElementById("joboffertab");
    //ELEMENTS
    this.btn_postulate = document.getElementById("postulate");

    this.name_workerinfo = document.getElementById("name_workerinfo");
    this.age_workerinfo = document.getElementById("age_workerinfo");
    this.email_workerinfo = document.getElementById("email_workerinfo");
    this.phone_workerinfo = document.getElementById("phone_workerinfo");
    this.update_workerinfo = document.getElementById("update_workerinfo");


    this.name_workerinfo.value = localStorage.getItem('name');
    this.age_workerinfo.value = localStorage.getItem('age');
    this.email_workerinfo.value = localStorage.getItem('email');
    this.phone_workerinfo.value = localStorage.getItem('phone');

    console.log(localStorage.getItem('phone'));


    //VARIABLES
    this.selectedstate = "";
    this.selectedcity = "";

    ////////////////////////////////EVENTS
    window.addEventListener('hashchange', () => this.changemodule());
    document.querySelector('.modal__close-bar span').addEventListener('click',tooglemodal);
    this.btn_postulate.addEventListener('click',()=>{this.postulate()});

    this.joboffersarray = [];
    this.skillsarray = [];
    this.statesflag = 0;

    this.update_workerinfo.addEventListener('click',()=> this.updatedata());

    this.getjoboffers();

    
});

function tooglemodal(type){
    document.querySelector('.modal').classList.toggle('modal-hidden');

};

function postulate(){
    tooglemodal();
}

function changemodule(){
    this.hidemodules();
    switch (location.hash){
        case '#profile':
            this.profilemodule.style.display = "flex";
            this.profiletab.classList.add("active");
            if(this.statesflag == 0){
                getStates();
                this.statesflag = 1;
            }
        break;
        case '#joboffer':
            this.joboffersmodule.style.display = "block";
            this.jobofferstab.classList.add("active");
        break;
        case '#contact':
            this.contactmodule.style.display = "flex";
            this.contacttab.classList.add("active");
        break;
        case '#about':
            this.aboutusmodule.style.display = "flex";
            this.abouttab.classList.add("active");
        break;
    }
    console.log(location.hash);
}


function hidemodules(){
    this.profilemodule.style.display = "none";
    this.contactmodule.style.display = "none";
    this.aboutusmodule.style.display = "none";
    this.joboffersmodule.style.display = "none";

    this.profiletab.classList.remove("active");
    this.contacttab.classList.remove("active");
    this.abouttab.classList.remove("active");
    this.jobofferstab.classList.remove("active");
}

function updatedata(){
    this.name_workerinfo = document.getElementById("name_workerinfo");
    this.age_workerinfo = document.getElementById("age_workerinfo");
    this.email_workerinfo = document.getElementById("email_workerinfo");
    this.phone_workerinfo = document.getElementById("phone_workerinfo");
    if(this.name_workerinfo.value && this.age_workerinfo.value && this.email_workerinfo.value && this.phone_workerinfo){
        let user = {};
        user.name = this.name_workerinfo.value;
        user.age = this.age_workerinfo.value;
        user.email = this.email_workerinfo.value;
        user.phone = this.phone_workerinfo.value;
        user.state = this.selectedstate;
        user.city = this.selectedcity;
        user.id = localStorage.getItem('userid');
        this.updaterequest(user);
    }else{
        alert("YOU NEED TO FILL UP THE DATA");
    }
}

async function updaterequest(user){
    const response = await fetch("http://192.168.0.5:3900/updateuser",{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });
    response.json().then(() => {
        localStorage.setItem('userid', user.id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('phone', user.phone);
        localStorage.setItem('name', user.name);
        localStorage.setItem('age', user.age);
        localStorage.setItem('state', user.state);
        localStorage.setItem('city', user.city);
        alert("USER UPDATED");
    })

}

function addJobOfferCards(){
    for (const index in this.joboffersarray){
        let joboffer = this.joboffersarray[index];
        //GENERATING ELEMENTS
        var CardsContainer = document.getElementById("joboffersmodule");
        //CARD
        const card = document.createElement("div");
        card.className = "card";
        //IMAGEN
        const img = document.createElement("img");
        img.src = "/img/factory.png";
        img.style.width = "200px"
        img.style.height = "200px"
        //CARD CONTAINER
        const cardContainer = document.createElement("div");
        cardContainer.className = "cardcontainer"
        //OFFER INFO
        const offerInfoDiv = document.createElement("div");
        offerInfoDiv.className = "offerinfodivstyle";
        const comName = document.createElement("h1");
        comName.textContent = "Filestack"
        const looking = document.createElement("p");
        const jobName = document.createElement("label")
        jobName.textContent = joboffer.name;
        looking.textContent = "Looking for"
        offerInfoDiv.append(comName);
        offerInfoDiv.append(looking);
        offerInfoDiv.append(jobName);
        //DESCRIPTION
        const offerDescription = document.createElement("div");
        offerDescription.className = "cutoff-text"
        const description = document.createElement("p");
        description.textContent = joboffer.description;
        offerDescription.append(description);

        cardContainer.append(offerInfoDiv);
        cardContainer.append(offerDescription);

        card.append(img);
        card.append(cardContainer);
        card.addEventListener("click",()=>{
            console.log(index)
            this.modalinfo(index);
        });

        CardsContainer.appendChild(card);
    }
}

async function modalinfo(index){
    let jobname = document.getElementById("modal_jobname");
    let salary = document.getElementById("modal_salary");
    let description = document.getElementById("modal_jobdescription");
    let mandatory_skills = document.getElementById("modal_mandatoryskills");
    let soft_skills = document.getElementById("modal_softskills");
    jobname.textContent = "JOB NAME : "+this.joboffersarray[index].name;
    salary.textContent = "SALARY : " +this.joboffersarray[index].salary;
    description.textContent = this.joboffersarray[index].description;
    this.tooglemodal();
    var data = await this.getskills(this.joboffersarray[index].joboffer_id);
    
    while (mandatory_skills.hasChildNodes()) {
        mandatory_skills.removeChild(mandatory_skills.firstChild);
    }
    while (soft_skills.hasChildNodes()) {
        soft_skills.removeChild(soft_skills.firstChild);
    }
    if(data){
        let title = document.createElement("h4");
        let title2 = document.createElement("h4");
        title.textContent = "Mandatory Skills";
        mandatory_skills.appendChild(title);
        title2.textContent = "Soft Skills"
        soft_skills.appendChild(title2);
        for(let i in data){
            let skill = data[i];
            let p = document.createElement("p");
            p.textContent = skill.name
            if(skill.type === "m"){
                console.log("mandatory");
                console.log(p)
                mandatory_skills.append(p);
            }else if(skill.type === "s"){
                console.log("soft");
                console.log(p)
                soft_skills.append(p);
            }
        }
    }
    
}

async function getStates(){
    const response = await fetch("http://192.168.0.5:3900/getstates",{
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        var select = document.getElementById("states");
        for(let i in data){
            let opt = document.createElement('option');
            opt.value = data[i].state_code;
            opt.text = data[i].state;
            select.add(opt);
            
        }
        select.addEventListener("change", () => this.cities(select.value));
        if(localStorage.getItem('state')){
            console.log("GETTING CITIES");
            select.value = localStorage.getItem('state');
            this.selectedstate = localStorage.getItem('state');
            getcities(localStorage.getItem('state'));
        }else{
            select.selectedIndex = "-1"
        }
    })
}

function cities(value){
    this.getcities(value);
    this.selectedstate = value;
}

async function getcities(value){
    url = "http://192.168.0.5:3900/getcities?state_code="+value
    console.log(url);
    const response = await fetch("http://192.168.0.5:3900/getcities?state_code="+value,{
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        var cities = document.getElementById("cities");
        var i, L = cities.options.length - 1;
        for(i = L; i >= 0; i--) {
            cities.remove(i);
        }
        for(let i in data){
            let opt = document.createElement('option');
            opt.value = data[i].city;
            opt.text = data[i].city;
            cities.add(opt); 
        }
        if(localStorage.getItem('city') !== 'not'){
            console.log("Seeting city");
            cities.value = localStorage.getItem('city');
            this.selectedcity = localStorage.getItem('city');
        }
        cities.addEventListener("change", () => this.selectedcity = cities.value);
    })
}

async function getjoboffers(){
    console.log("SELECT");
    const response = await fetch("http://192.168.0.5:3900/getoffers", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
        /*body: `{
        "Id": 78912,
        "Customer": "Jason Sweet",
        "Quantity": 1,
        "Price": 18.00
        }`,*/
    });
    response.json().then(data => {
        
        this.joboffersarray = data;
        console.log(data);
        this.addJobOfferCards();
    })
}

async function getskills(joboffer_id){
    console.log("EL ID ES "+joboffer_id);
    const response = await fetch("http://192.168.0.5:3900/getskills", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({joboffer_id}),
    });
    /*await response.json().then(data => {
        console.log(data);
        this.skillsarray = data;
        return data

    })*/

    var data = await response.json();
    console.log(data);
    return data;
}