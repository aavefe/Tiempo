onload=function(){
    document.getElementById("todo").style.display= "none";
}

navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    crearTablas();
},
function(error) {
    if (error.code == error.PERMISSION_DENIED)
        document.getElementById("todo").style.display = "none";
        alert("Tienes que permitir la localización en esta WEB.");
        location.reload();
    });

function crearTablas(){
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=0d9c10c5a3c178421490bf45919685b9";
    var url2 = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+latitude+"&longitude="+longitude;
    $.ajax({
        url: url2,
        method: 'GET',
        success: function(data2) {
            $.ajax({
                url: url,
                method: 'GET',
                success: function(data) {
                    document.getElementById("cargando").style.display = "none";
                    document.getElementById("todo").style.display ="block";
                    document.getElementById("tabladias").style.display="none";
                    document.getElementById("tablamañana").style.display="none";
        
                    var pestañahoras = document.getElementById("horas");
                    var pestañadias = document.getElementById("dias");
                    var pestañamañana = document.getElementById("mañana");
                    pestañahoras.style.backgroundColor="#3A3939";
        
                    pestañahoras.onclick=function horasVisible(){
                        document.getElementById("tablatiempo").style.display="table";
                        document.getElementById("tabladias").style.display="none";
                        document.getElementById("tablamañana").style.display="none";
                        pestañahoras.style.backgroundColor = "#3A3939";
                        pestañadias.style.backgroundColor = "black";
                        pestañamañana.style.backgroundColor="black";
                    }

                    pestañamañana.onclick=function mañanaVisible(){
                        document.getElementById("tablatiempo").style.display="none";
                        document.getElementById("tabladias").style.display="none";
                        document.getElementById("tablamañana").style.display="table";
                        pestañahoras.style.backgroundColor = "black";
                        pestañadias.style.backgroundColor = "black";
                        pestañamañana.style.backgroundColor="#3A3939";
                    }

                    pestañadias.onclick=function diasVisible(){
                        document.getElementById("tablatiempo").style.display="none";
                        document.getElementById("tabladias").style.display="table";
                        document.getElementById("tablamañana").style.display="none";
                        pestañahoras.style.backgroundColor = "black";
                        pestañadias.style.backgroundColor = "#3A3939";
                        pestañamañana.style.backgroundColor="black";
                    }
        
                    var divtiempoactual = document.getElementById("tiempoactual");
                    var divtiempogrados = document.getElementById("tiempogrados");
                    var divtiempofoto = document.getElementById("tiempofoto");
                    var divtiempohumedad = document.getElementById("humedad");
                    var divtiempoviento = document.getElementById("viento");
                    var divtiempomin = document.getElementById("tiempomin");
                    var divtiempomax = document.getElementById("tiempomax");
                    var alertasdiv = document.getElementById("alertas");
                    
                    var tiempoactual = Math.round(data.current.temp - 273.15)+"°";
                    var humedadactual = data.current.humidity+"%";
                    var tiempoconvertido = Math.round(data.current.wind_speed * 3.6);
                    var iconoactual = '<img src=\"http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
                    var vientoactual = tiempoconvertido+"km/h";
                    var tiempomin = Math.round(data.daily[0].temp.min - 273.15)+"°";
                    var tiempomax = Math.round(data.daily[0].temp.max - 273.15)+"°";
                    
                    divtiempoactual.innerHTML = data2.locality + " / "+data2.countryName + ": ";
                    divtiempogrados.innerHTML =  tiempoactual;
                    divtiempofoto.innerHTML = iconoactual;
                    divtiempohumedad.innerHTML= "Humedad: "+humedadactual;
                    divtiempoviento.innerHTML="Viento: "+vientoactual;
                    divtiempomin.innerHTML = tiempomin;
                    divtiempomax.innerHTML = tiempomax;

                    if(data.alertas != undefined){
                        var alertas = data.alerts[0].event;
                        alertasdiv.innerHTML = alertas;
                    }
                    
                    var tblBody = document.createElement("tbody");
                    var d = new Date();
                    var horassiguientes = 24 - d.getHours();
                    var horaactual = d.getHours();
                    
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
                                    if(horas<"18"&&horas>"7"){
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
                                    celda.style.width="95px";
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
                                        celda.style.backgroundColor="#FAFAFA";
                                    
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
                    for(var k=0; k<7; k++){     
                        var hilera2 = document.createElement("tr");
                        for(var l=0; l<5; l++){
                            var temperaturamindaily = Math.round(data.daily[k].temp.min - 273.15);
                            var temperaturamaxdaily = Math.round(data.daily[k].temp.max - 273.15);
                            var iconodaily = '<img src=\"http://openweathermap.org/img/wn/'+data.daily[k].weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
                            var humedaddaily = data.daily[k].humidity+"%";
                            var vientodaily = Math.round(data.daily[k].wind_speed * 3.6)+"km/h";
                            var celda2 = document.createElement("td");
                            var semanas = d.getDay()+k;
                            var diassemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
                            
                            switch(l){
                                case 0: 
                                    if(semanas >= 8){
                                        celda2.innerHTML = diassemana[semanas-8];
                                    }else{
                                        celda2.innerHTML = diassemana[semanas-1];
                                    }
                                    
                                    if (k%2==0) {
                                        celda2.style.backgroundColor="#DFDFDF";
                                    } else {
                                        celda2.style.backgroundColor="#C3C3C3";
                                    } 
                                    celda2.style.fontSize="20px";
                                    celda2.style.fontWeight="bold";
                                    celda2.style.width="95px";
                                break;
                                case 1: celda2.innerHTML = temperaturamindaily+"°" + " / " + temperaturamaxdaily+"°";
                                    if (k%2==0) {
                                        celda2.style.backgroundColor="#FFB66C";
                                    
                                    } else {
                                        celda2.style.backgroundColor="#FFCC99";
                                    }
                                    celda2.style.fontSize="18px";
                                break;
                                case 2: celda2.innerHTML = iconodaily;
                                    if (k%2==0) {
                                        celda2.style.backgroundColor="#FFFF87";
                                    
                                    } else {
                                        celda2.style.backgroundColor="#FFFF66";
                                    }
                                    celda2.style.fontSize="18px";
                                break;
                                case 3: celda2.innerHTML = humedaddaily;
                                    if (k%2==0) {
                                        celda2.style.backgroundColor="#99FFFF";
                                    
                                    } else {
                                        celda2.style.backgroundColor="#C0FFFF";
                                    }
                                    celda2.style.fontSize="18px";
                                break;
                                case 4: celda2.innerHTML = vientodaily;
                                    if (k%2==0) {
                                        celda2.style.backgroundColor="#FAFAFA";
                                    
                                    } else {
                                        celda2.style.backgroundColor="#EFEFEF";
                                    }
                                    celda2.style.fontSize="18px";
                                break;
                            }
                            hilera2.appendChild(celda2);
                        }
                        tblBody2.appendChild(hilera2);
                    }

                    var tblBody3 = document.createElement("tbody");
                    for(var m=0; m<24; m++){     
                        var hilera3 = document.createElement("tr");
                        for(var n=0; n<5; n++){
                            var celda3 = document.createElement("td");
                            var diasiguiente=25-d.getHours();
                            switch(n){
                                case 0: celda3.innerHTML = m+":00";
                                if(m<"18"&&m>"7"){
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#DFDFDF";
                                    } else {
                                        celda3.style.backgroundColor="#C3C3C3";
                                    }                             
                                }else{
                                    celda3.style.color = "white";
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#3F3F3F";
                                    
                                    } else {
                                        celda3.style.backgroundColor="#222222";
                                    }
                                }
                                    celda3.style.fontSize="20px";
                                    celda3.style.fontWeight="bold";
                                    celda3.style.width="95px";
                                break;
                                case 1: celda3.innerHTML = Math.round(data.hourly[diasiguiente+m-1].temp - 273.15)+"°";
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#FFB66C";
                                    
                                    } else {
                                        celda3.style.backgroundColor="#FFCC99";
                                    }
                                    celda3.style.fontSize="18px";
                                break;
                                case 2: celda3.innerHTML = '<img src=\"http://openweathermap.org/img/wn/'+data.hourly[diasiguiente+m-1].weather[0].icon+'@2x.png" width=\"70px\" height=\"70px\">';
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#FFFF87";
                                    
                                    } else {
                                        celda3.style.backgroundColor="#FFFF66";
                                    }
                                    celda3.style.fontSize="18px";
                                break;
                                case 3: celda3.innerHTML = data.hourly[diasiguiente+m-1].humidity+"%";
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#99FFFF";
                                    
                                    } else {
                                        celda3.style.backgroundColor="#C0FFFF";
                                    }
                                    celda3.style.fontSize="18px";
                                break;
                                case 4: celda3.innerHTML = Math.round(data.hourly[diasiguiente+m-1].wind_speed * 3.6)+"km/h";
                                    if (m%2==0) {
                                        celda3.style.backgroundColor="#FAFAFA";
                                    
                                    } else {
                                        celda3.style.backgroundColor="#EFEFEF";
                                    }
                                    celda3.style.fontSize="18px";
                                break;
                            }   
                            hilera3.appendChild(celda3);  
                        }
                        tblBody3.appendChild(hilera3);
                    }
        
                    document.getElementById("tablatiempo").appendChild(tblBody);
                    document.getElementById("tabladias").appendChild(tblBody2);
                    document.getElementById("tablamañana").appendChild(tblBody3);
        

                }, error: function(err2) {
                  
                  alert("Algo ha ido mal al obtener los datos.");
                }
            });

        }, error: function(err) {
          alert("Algo ha ido mal al obtener los datos.");
        }

    });
}
    