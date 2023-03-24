class security{
    
    constructor(){
        this.CryptoJS = require("crypto-js");
    }

    generatesecurity(){

        const secret = 'QWJCSTHHDJANHAW4ODDRD3IPTE';
    
        const call = ['pick', 'read', 'convert', 'store', 'runWorkflow'];
        const expiry = Math.floor(Date.now() / 1000) + 3600;
        
        const policy = {
        call,
        expiry,
        };

        const policy64 = btoa(JSON.stringify(policy));

        const hash = this.CryptoJS.HmacSHA256(policy64, secret);
        const signature = hash.toString(this.CryptoJS.enc.Hex);

        const clientOptions={
            security:{
                policy:policy64,
                signature:signature
            }
        };

        return clientOptions;
    
    }
}

module.exports = security;