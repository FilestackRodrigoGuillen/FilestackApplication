window.addEventListener('DOMContentLoaded', function(){
    location.hash = "#joboffer";
    ///////////////////////////////HTML ELEMENTS/////////
    //MODULES
    this.newoffermodule = document.getElementById("jobmodule");
    this.profileodule = document.getElementById("profilemodule");
    this.contactmodule = document.getElementById("contactmodule");
    this.aboutusmodule = document.getElementById("aboutusmodule");
    this.joboffersmodule = document.getElementById("joboffersmodule");
    //TABS
    this.newoffertab = document.getElementById("newoffertab");
    this.profiletab = document.getElementById("profiletab");
    this.contacttab = document.getElementById("contacttab");
    this.abouttab = document.getElementById("abouttab");
    this.jobofferstab = document.getElementById("joboffertab");
    //ELEMENTS
    this.addskill = document.getElementById("addskill");
    this.locationdiv = document.getElementById("locationdiv");
    this.btnsendoffer = document.getElementById("sendoffer");
    this.et_name = document.getElementById("jobname");
    this.et_salary = document.getElementById("jobsalary");
    this.et_jabdescription = document.getElementById("jobdescription");

    this.name_companyinfo = document.getElementById("name_companyinfo");
    this.age_companyinfo = document.getElementById("age_companyinfo");
    this.email_companyinfo = document.getElementById("email_companyinfo");
    this.phone_companyinfo = document.getElementById("phone_companyinfo");
    this.update_companyinfo = document.getElementById("update_companyinfo");

    console.log(localStorage.getItem('name'));

    this.name_companyinfo.value = localStorage.getItem('name');
    this.age_companyinfo.value = localStorage.getItem('age');
    this.email_companyinfo.value = localStorage.getItem('email');
    this.phone_companyinfo.value = localStorage.getItem('phone');

    document.querySelector('.modaloffer__close-bar span').addEventListener('click',()=>this.toogleoffermodal());


    
    ///////////////////////////////VARIABLES/////////////
    this.skilltype = 0;
    this.mandatoryskills = [];
    this.softskills = [];
    this.type = "";
    this.selectedcity = "";
    this.stateselected = "";

    //this.getcountries();

    const tooglemodal = (type) => {
        document.querySelector('.modal').classList.toggle('modal-hidden');
        this.skilltype = type;
    };
    

    const placemodal = (type) => {
        if(type === 'r'){
            this.locationdiv.style.display = "none";
        }else{
            this.locationdiv.style.display = "flex";
        }
        this.type = type;
    };
    

    this.statesflag = 0;

    //EVENTS
    window.addEventListener('hashchange', () => this.changemodule());
    document.querySelector('#mandatory').addEventListener('click',() => tooglemodal(1));
    document.querySelector('#soft').addEventListener('click',() => tooglemodal(2));
    document.querySelector('.modal__close-bar span').addEventListener('click',tooglemodal);

    document.querySelector('#remote').addEventListener('change',() => placemodal('r'));
    document.querySelector('#presencial').addEventListener('change',() => placemodal('p'));
    document.querySelector('#hybrid').addEventListener('change',() => placemodal('h'));

    this.addskill.addEventListener("click", () => this.faddskill());
    this.btnsendoffer.addEventListener("click",() => this.sendoffer());

    this.update_companyinfo.addEventListener('click',()=> this.updatedata());


    this.workeroffersarray = ["adsfads","dsafdsf","dasfdsfafdsa","asdfdsffds","dsfadsafadsf"];
    this.getWokerOfferCardInfo();


    
});

function toogleoffermodal(){
    document.querySelector('.offermodal').classList.toggle('offermodal-hidden');
}

function sendoffer(){
    if(this.et_jabdescription.value && this.et_name.value && this.et_salary.value && this.type){
        let offerobject = {};
        offerobject.jobname = this.et_name.value;
        offerobject.jobsalary = this.et_salary.value;
        offerobject.jobdescription = this.et_jabdescription.value;
        offerobject.jobtype = this.type;
        offerobject.mandatoryskills = this.mandatoryskills;
        offerobject.softskills = this.softskills;
        this.insertoffer(offerobject);
        console.log("SENDING OFFER");
    }else{
        alert("YOU NEED TO FILL UP ALL THE FILEDS TO SEND THE OFFER");
    }
}

function updatedata(){
    if(this.name_companyinfo.value && this.age_companyinfo.value && this.email_companyinfo.value && this.phone_companyinfo){
        let user = {};
        user.name = this.name_companyinfo.value;
        user.age = this.age_companyinfo.value;
        user.email = this.email_companyinfo.value;
        user.phone = this.phone_companyinfo.value;
        if(this.selectstateitem.value){
            user.state = this.selectstateitem.value;
            console.log(this.selectstateitem.value);
        }else{
            user.state = 'not';
        }
        
        user.city = this.selectedcity;
        user.id = localStorage.getItem('userid');
        updaterequest(user);
    }else{
        alert("YOU NEED TO FILL UP THE DATA");
    }
}

async function updaterequest(user){
    const response = await fetch("http://localhost:3900/updateuser",{
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

async function getStates(){
    console.log("GET STATES");
    const response = await fetch("http://localhost:3900/getstates",{
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        var select = document.getElementById("states_company");
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
            this.stateselected = localStorage.getItem('state');
            getcities(localStorage.getItem('state'));
        }else{
            select.selectedIndex = "-1"
        }
        this.selectstateitem = select;
        
    })
}

function cities(value){
    this.getcities(value);
    this.stateselected = value;
    console.log("se selecciono el estado"+ this.stateselected);
}

async function getcities(value){
    url = "http://localhost:3900/getcities?state_code="+value
    console.log(url);
    const response = await fetch("http://localhost:3900/getcities?state_code="+value,{
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        var cities = document.getElementById("city_company");
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
            this.stateselected = "";
            this.selectedcity = localStorage.getItem('city');
        }else{
            cities.selectedIndex = "-1"
        }
        cities.addEventListener("change", () => this.selectedcity = cities.value);
    })
}

async function insertoffer(offerobject){
    const response = await fetch("http://localhost:3900/insertoffer",{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerobject),
    }).then(()=>{
        alert("JOB POSTED");
        const mcontainer = document.getElementById("mandatorycontainer");
        const scontainer = document.getElementById("softcontainer");
        mcontainer.innerHTML = '';
        scontainer.innerHTML = '';
        this.et_name.value = '';
        this.et_salary.value = '';
        this.et_jabdescription.value = '';
        document.querySelector('#remote').checked=false
        document.querySelector('#presencial').checked=false
        document.querySelector('#hybrid').checked=false

    }
    );
}

function faddskill(){
    let skillname = document.getElementById("skillname");
    const mcontainer = document.getElementById("mandatorycontainer");
    const scontainer = document.getElementById("softcontainer");
    let text = ``;
    if(skillname.value.length > 0){
        if(this.skilltype == 1){
            this.mandatoryskills.push(skillname.value);
            for(let i=0; i<this.mandatoryskills.length; i++){
                text += `<p>${this.mandatoryskills[i]}</p>`;
                mcontainer.innerHTML = text;
            }
        }
        if(this.skilltype == 2){
            this.softskills.push(skillname.value);
            for(let i=0; i<this.softskills.length; i++){
                text += `<p>${this.softskills[i]}</p>`;
                scontainer.innerHTML = text;
            }
        }
        document.querySelector('.modal').classList.toggle('modal-hidden');
        skillname.value = "";
    }else{
        alert("YOU NEED TO FILL UP THE FIELD FIRST");
    }
}

function changemodule(){
    this.hidemodules();
    switch (location.hash){
        case '#profile':
            this.profileodule.style.display = "flex";
            this.profiletab.classList.add("active");
            console.log("GO TO STATES");
            if(this.statesflag == 0){
                this.statesflag = 1;
                getStates();
            }
        break;
        case '#joboffer':
            this.joboffersmodule.style.display = "block";
            this.jobofferstab.classList.add("active");
        break;
        case '#newoffer':
            this.newoffermodule.style.display = "flex";
            this.newoffertab.classList.add("active");
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
    this.newoffermodule.style.display = "none";
    this.profileodule.style.display = "none";
    this.contactmodule.style.display = "none";
    this.aboutusmodule.style.display = "none";
    this.joboffersmodule.style.display = "none";
    

    this.newoffertab.classList.remove("active");
    this.profiletab.classList.remove("active");
    this.contacttab.classList.remove("active");
    this.abouttab.classList.remove("active");
    this.jobofferstab.classList.remove("active");
}

async function getWokerOfferCardInfo(){
    const response = await fetch("http://localhost:3900/getworkeroffercardsinfo", {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        
        this.workeroffersarray = data;
        //console.log(data);
        this.addWorkerOfferCards();
    })
}

function modalinfo(index){
    this.toogleoffermodal();
    let workeroffer = this.workeroffersarray[index];
    let name = document.getElementById("offermodal_jobname");
    let email = document.getElementById("offermodal_email");
    let phone = document.getElementById("offermodal_phone");
    let btn_check_curriculum = document.getElementById("worker_curriculum");
    let btn_check_video = document.getElementById("worker_video");
    let btn_check_photo = document.getElementById("worker_photo");
    name.textContent = "WORKER'S NAME: "+workeroffer.name;
    email.textContent = "EMAIL: "+workeroffer.email;
    phone.textContent = "PHONE: "+workeroffer.phone;

    //EVENTS
    btn_check_curriculum.addEventListener("click",()=>this.openLinkInNewTab("https://cdn.filestackcontent.com/slide/"+workeroffer.curriculum_handler));
    btn_check_video.addEventListener("click",()=>this.openLinkInNewTab(workeroffer.video));
    btn_check_photo.addEventListener("click",()=>this.openLinkInNewTab(workeroffer.photo));
}

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

function addWorkerOfferCards(){
    for (const index in this.workeroffersarray){
        let workeroffer = this.workeroffersarray[index];
        console.log(workeroffer);
        //GENERATING ELEMENTS
        var CardsContainer = document.getElementById("workeroffersmodule");
        //CARD
        const card = document.createElement("div");
        card.className = "card";
        //IMAGE
        const img = document.createElement("img");
        img.src = workeroffer.photo;
        img.style.width = "200px"
        img.style.height = "200px"
        //CARD CONTAINER
        const cardContainer = document.createElement("div");
        cardContainer.className = "cardcontainer"
        //OFFER INFO
        const offerInfoDiv = document.createElement("div");
        offerInfoDiv.className = "offerinfodivstyle";
        const Name = document.createElement("h1");
        Name.textContent = workeroffer.name;
        const phone = workeroffer.phone;
        const email = document.createElement("h4")
        email.textContent = workeroffer.email;
        phone.textContent = workeroffer.phone;
        email.textContent = workeroffer.email;
        offerInfoDiv.append(Name);
        offerInfoDiv.append(phone);
        offerInfoDiv.append(email);

        cardContainer.append(offerInfoDiv);

        card.append(img);
        card.append(cardContainer);
        card.addEventListener("click",()=>{
            this.modalinfo(index);  
        });

        CardsContainer.appendChild(card);
    }

    
}
