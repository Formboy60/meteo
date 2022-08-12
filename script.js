
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position){
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        

        // récup ville //
        fetch(`https://api.meteo-concept.com/api/location/city?token=64c4a206efcd2c91674a1056e47a5b429e73a0c218683edb133fa73a7e150e1a&latlng=${lat},${lng}`)
        .then((response) => response.json())
        .then((res)=>{
            data = res
            insee = data.city.insee
            console.log(insee)
            quart(insee)
           
        })

       

        // par quart de jour //
        function quart(insee){            
                fetch(`https://api.meteo-concept.com/api/forecast/daily/periods?token=64c4a206efcd2c91674a1056e47a5b429e73a0c218683edb133fa73a7e150e1a&insee=${insee}`)
                .then((response) => response.json())
                .then((res)=>{
                    data = res
                    console.log(data)
                    display(data)
                })                      
        }      

        function display(data){   
            document.querySelector(`.jour${i}`).innerHTML=  ''
                for(let i = 0; i<4; i++) {    
                    for(let j = 0; j<4; j++){
                        document.querySelector(`.jour${i}`).innerHTML +=`
                        <div class='section${j}'>
                            <p class"date"> date : ${data.forecast[i][j].datetime}</p>
                            <p class='temp'>température : ${data.forecast[i][j].temp2m}°C</p>
                            <p class='pluie'>pluie : ${data.forecast[i][j].probarain}%</p>
                            <p class='vent'>direction du vent : ${data.forecast[i][j].dirwind10m}°</p>
                        </div>
                        `  
                    }     
                }
            }

        
    })
}
   

   

 

   



 
   
