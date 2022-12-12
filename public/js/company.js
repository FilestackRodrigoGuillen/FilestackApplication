window.addEventListener('DOMContentLoaded', function(){
    ///////////////////////////////HTML ELEMENTS
    //MODULES
    this.newoffermodule = document.getElementById("jobmodule");
    this.profileodule = document.getElementById("profilemodule");
    this.contactmodule = document.getElementById("contactmodule");
    this.aboutusmodule = document.getElementById("aboutusmodule");
    //TABS
    this.newoffertab = document.getElementById("newoffertab");
    this.profiletab = document.getElementById("profiletab");
    this.contacttab = document.getElementById("contacttab");
    this.abouttab = document.getElementById("abouttab");


    //EVENTS
    window.addEventListener('hashchange', () => this.changemodule());
});

function changemodule(){
    this.hidemodules();
    switch (location.hash){
        case '#profile':
            this.profileodule.style.display = "flex";
            this.profiletab.classList.add("active");
        break;
        case '#joboffer':
            
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

    this.newoffertab.classList.remove("active");
    this.profiletab.classList.remove("active");
    this.contacttab.classList.remove("active");
    this.abouttab.classList.remove("active");
}