


var url = "https://api.openweathermap.org/data/2.5/onecall?lat=41.2180592&lon=1.7052336&appid=0d9c10c5a3c178421490bf45919685b9";

onload=function crearTablas(){
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            document.getElementById("tabladias").style.display="none";
            var pestañahoras = document.getElementById("horas");
            var pestañadias = document.getElementById("dias");

            pestañahoras.onclick=function(){
                document.getElementById("tablatiempo").style.display="block";
                document.getElementById("tabladias").style.display="none";
            }

            pestañadias.onclick=function(){
                document.getElementById("tablatiempo").style.display="none";
                document.getElementById("tabladias").style.display="block";
            }




            var divtiempoactual = document.getElementById("tiempoactual");
            var divtiempogrados = document.getElementById("tiempogrados");
            var divtiempofoto = document.getElementById("tiempofoto");
            var divtiempohumedad = document.getElementById("humedad");
            var divtiempoviento = document.getElementById("viento");
            var divtiempomin = document.getElementById("tiempomin");
            var divtiempomax = document.getElementById("tiempomax");
            

            var tiempoactual = Math.round(data.current.temp - 273.15)+"°";
            var humedadactual = data.current.humidity+"%";
            var tiempoconvertido = Math.round(data.current.wind_speed * 3.6);
            var iconoactual = '<img src=\"http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
            var vientoactual = tiempoconvertido+"km/h";
            var tiempomin = Math.round(data.daily[0].temp.min - 273.15)+"°";
            var tiempomax = Math.round(data.daily[0].temp.max - 273.15)+"°";
            
            divtiempoactual.innerHTML = data.timezone + ": ";
            divtiempogrados.innerHTML =  tiempoactual;
            divtiempofoto.innerHTML = iconoactual;
            divtiempohumedad.innerHTML= "Humedad: "+humedadactual;
            divtiempoviento.innerHTML="Viento: "+vientoactual;
            divtiempomin.innerHTML = tiempomin;
            divtiempomax.innerHTML = tiempomax;
            
            var tblBody = document.createElement("tbody");
            var d = new Date();
            var horassiguientes = 24 - d.getHours();
            var horaactual = d.getHours();
            
            if(horaactual<"18"&&horaactual>="7"){
                document.getElementById("titulos").style.backgroundColor = "black";
                document.getElementById("titulos").style.color = "white";   
                document.getElementById("titulotiempo").style.backgroundColor = "black";
                document.getElementById("titulotiempo").style.color = "white";          
            }else{
                document.getElementById("titulos").style.backgroundColor = "grey";
                document.getElementById("titulos").style.color = "black";
                document.getElementById("titulotiempo").style.backgroundColor = "grey";
                document.getElementById("titulotiempo").style.color = "white";   
            }

            for(var i=0; i<horassiguientes; i++){     
                var hilera = document.createElement("tr");
                for(var j=0; j<5; j++){
                    
                    var celda = document.createElement("td");
                    var horas = d.getHours()+i;
                    var temperatura = Math.round(data.hourly[i].temp - 273.15);
                    var icono = '<img src=\"http://openweathermap.org/img/wn/'+data.hourly[i].weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
                    var viento = Math.round(data.hourly[i].wind_speed * 3.6)+"km/h";
                    switch(j){
                        case 0: celda.innerHTML = horas+":00";
                        if(horas<"18"&&horas>="7"){
                            if (i%2==0) {
                                celda.style.backgroundColor="#DFDFDF";
                            } else {
                                celda.style.backgroundColor="#C3C3C3";
                            }                             
                        }else{
                            celda.style.color = "white";
                            if (i%2==0) {
                                celda.style.backgroundColor="#3F3F3F";
                            
                            } else {
                                celda.style.backgroundColor="#222222";
                            }
                        }
                        celda.style.fontSize="20px";
                        celda.style.fontWeight="bold";
                        break;
                        case 1: celda.innerHTML = temperatura+"°";
                            if (i%2==0) {
                                celda.style.backgroundColor="#FFB66C";
                            
                            } else {
                                celda.style.backgroundColor="#FFCC99";
                            }
                            celda.style.fontSize="18px";
                        break;
                        case 2: celda.innerHTML = icono;
                            if (i%2==0) {
                                celda.style.backgroundColor="#FFFF87";
                            
                            } else {
                                celda.style.backgroundColor="#FFFF66";
                            }
                            celda.style.fontSize="18px";
                        break;
                        case 3: celda.innerHTML = data.hourly[i].humidity+"%";
                            if (i%2==0) {
                                celda.style.backgroundColor="#99FFFF";
                            
                            } else {
                                celda.style.backgroundColor="#C0FFFF";
                            }
                            celda.style.fontSize="18px";
                        break;
                        case 4: celda.innerHTML = viento;
                        if (i%2==0) {
                            celda.style.backgroundColor="FAFAFA";
                        
                        } else {
                            celda.style.backgroundColor="#EFEFEF";
                        }
                        celda.style.fontSize="18px";
                        break;
                    }   
                    hilera.appendChild(celda);  
                }
                tblBody.appendChild(hilera);
            }


            var tblBody2 = document.createElement("tbody");
            var diaactual = d.getDate();

            for(var k=0; k<7; k++){     
                var hilera2 = document.createElement("tr");
                for(var l=0; l<5; l++){
                    var celda2 = document.createElement("td");
                    hilera2.appendChild(celda2);
                }
                tblBody2.appendChild(hilera2);
            }
            


            document.getElementById("tablatiempo").appendChild(tblBody);
            document.getElementById("tabladias").appendChild(tblBody2);


        }, error: function(err) {
          alert("Algo ha ido mal al obtener los datos.");
        }

    });
}