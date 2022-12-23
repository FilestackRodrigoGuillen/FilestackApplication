window.addEventListener('DOMContentLoaded', function(){
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

    const tooglemodal = (type) => {
        document.querySelector('.modal').classList.toggle('modal-hidden');
        console.log(type);
    };
    document.querySelector('#mandatory').addEventListener('click',() => tooglemodal(1));
    document.querySelector('#soft').addEventListener('click',() => tooglemodal(2));
    document.querySelector('.modal__close-bar span').addEventListener('click',tooglemodal);

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