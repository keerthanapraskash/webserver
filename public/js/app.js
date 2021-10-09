console.log("client side js file is loaded");

fetch('http://localhost:3000/weather?address=alappuzha').then((Response)=>{
    Response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.forcast);
            console.log(data.placeName)
            console.log(data);

        }
        
    })
})