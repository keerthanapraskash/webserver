console.log("client side js file is loaded");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    //changed http://localhost:3000/weather?address='+location to 
    fetch('/weather?address='+location).then((Response)=>{
        Response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error;
            }else{
                console.log(data.forcast);
                console.log(data.placeName)
                console.log(data);

                messageOne.textContent = data.placeName;
                messageTwo.textContent = data.forcast;
    
            }
            
        })
    })

    
});