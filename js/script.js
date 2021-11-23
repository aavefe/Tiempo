

// fuente de datos del tiempo: OpenWeatherMap
var url = "https://api.openweathermap.org/data/2.5/onecall?lat=41.2180592&lon=1.7052336&appid=0d9c10c5a3c178421490bf45919685b9";

// cuando cargamos el documento HTML, procedemos a obtener los datos

onload=function crearTablas(){
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {

            function pintaCeldas(){
                if(temperatura>="20"){
                    celda.animate([
                        {backgroundColor: "transparent",
                        color: "transparent"},
                        {backgroundColor: "#FFD295",
                        color: "black"}
                    ],1000)
                    celda.style.backgroundColor = "#FFD295";
                }if(temperatura<"20"&&temperatura>="15"){
                    celda.animate([
                        {backgroundColor: "transparent",
                        color: "transparent"},
                        {backgroundColor: "#FFF991",
                        color: "black"}
                    ],1000)
                    celda.style.backgroundColor = "#FFF991";
                }if(temperatura<"15"){
                    celda.animate([
                        {backgroundColor: "transparent",
                        color: "transparent"},
                        {backgroundColor: "#C5FFF5",
                        color: "black"}
                    ],1000)
                    celda.style.backgroundColor = "#C5FFF5";
                }
            }
            
            var divtiempoactual = document.getElementById("tiempoactual");
            var divtiempogrados = document.getElementById("tiempogrados");
            var divtiempofoto = document.getElementById("tiempofoto");
            var divtiempohumedad = document.getElementById("humedad");
            var divtiempoviento = document.getElementById("viento");

            var tiempoactual = Math.round(data.current.temp - 273.15)+"°";
            var humedadactual = data.current.humidity+"%";
            var vientoactual = data.current.wind_speed+"km/h";

            divtiempoactual.innerHTML = "Temperatura actual en " + data.timezone + ": ";
            divtiempogrados.innerHTML =  tiempoactual;
            divtiempofoto.innerHTML ='<img src=\"http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
            divtiempohumedad.innerHTML= "Humedad: "+humedadactual;
            divtiempoviento.innerHTML="Viento: "+vientoactual;

            var tblBody = document.createElement("tbody");
            var d = new Date();
            var horassiguientes = 24 - d.getHours();
            for(var i=0; i<horassiguientes; i++){     
                var hilera = document.createElement("tr");
                for(var j=0; j<5; j++){
                    var celda = document.createElement("td");
                    var horas = d.getHours()+i;
                    var temperatura = Math.round(data.hourly[i].temp - 273.15);
                    switch(j){
                        case 0: celda.innerHTML = horas+":00";
                        if(horas<"18"&&horas>="7"){
                            celda.animate([
                                {backgroundColor: "transparent",
                                color:"transparent"},
                                {backgroundColor: "#EBEBEB",
                                color: "black"}
                            ],1000)
                            celda.style.backgroundColor = "#EBEBEB";
                        }else{
                            celda.animate([
                                {backgroundColor: "transparent",
                                color: "transparent"},
                                {backgroundColor: "#3F3F3F",
                                color: "white"}
                            ],1000)
                            celda.style.color = "white";
                            celda.style.backgroundColor = "#3F3F3F";
                        }
                        break;
                        case 1: celda.innerHTML = temperatura+"°";
                            pintaCeldas();
                        break;
                        case 2: celda.innerHTML = '<img src=\"http://openweathermap.org/img/wn/'+data.hourly[i].weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
                            pintaCeldas();
                        break;
                        case 3: celda.innerHTML = data.hourly[i].humidity+"%";
                            pintaCeldas();
                        break;
                        case 4: celda.innerHTML = data.hourly[i].wind_speed+"km/h";
                            pintaCeldas();
                        break;
                    }   
                    hilera.appendChild(celda);  
                }
                tblBody.appendChild(hilera);
            }
            document.getElementById("tablatiempo").appendChild(tblBody);
        
          
        }, error: function(err) {
          alert("Algo ha ido mal al obtener los datos.");
        }

    });
}
