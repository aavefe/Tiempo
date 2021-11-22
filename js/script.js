
var temperatura = [];
var precipitaciones = [];
var viento = [];
var tiempotodo = ["Despejado","Nublado","Lluvia","Mucha lluvia","Muy nublado"];
var tiempo = [];
var numtemperatura;
var numprecipitaciones;
var numviento;

for(i=0;i<24;i++){
    numtemperatura = Math.floor((Math.random() * (26-1))+1);
    numprecipitaciones = Math.floor((Math.random() * (81-1))+1);
    numviento = Math.floor((Math.random() * (31-1))+1);
    var aleatoriotiempo = tiempotodo[Math.floor(Math.random() * tiempotodo.length)];
    temperatura.push(numtemperatura);
    precipitaciones.push(numprecipitaciones);
    viento.push(numviento);
    tiempo.push(aleatoriotiempo);
}

onload=function crearTablas(){
    var tblBody = document.createElement("tbody");
    var d = new Date();
    var horassiguientes = 24 - d.getHours();
    for(var i=0; i<horassiguientes; i++){     
        var hilera = document.createElement("tr");
        for(var j=0; j<5; j++){
            var celda = document.createElement("td");
            var horas = d.getHours()+i
            switch(j){
                case 0: celda.innerHTML = horas+":00";
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#EBEBEB"}
                    ],1000)
                    celda.style.backgroundColor = "#EBEBEB";
                    
                break;
                case 1: celda.innerHTML = temperatura[i]+"°";
                    if(temperatura[i]>="20"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#FFB757"}
                        ],1000)
                        celda.style.backgroundColor = "#FFB757";
                    }if(temperatura[i]<"20"&&temperatura[i]>="15"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#FFF557"}
                        ],1000)
                        celda.style.backgroundColor = "#FFF557";
                    }if(temperatura[i]<"15"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#86FFE8"}
                        ],1000)
                        celda.style.backgroundColor = "#86FFE8";
                    }
                break;
                case 2: celda.innerHTML = tiempo[i];
                    switch(celda.innerHTML){
                        case "Despejado": 
                        celda.innerHTML = '<img src=\"../img/Despejado.png" width=\"50px\" height=\"50px\">';

                            if(horas > "19"){
                                celda.innerHTML = '<img src=\"../img/Despejado luna.png" width=\"50px\" height=\"50px\">';
                            }
                        break;
                        case "Nublado": celda.innerHTML = '<img src=\"../img/Nublado.png" width=\"70px\" height=\"50px\">';
                            if(horas > "19"){
                                celda.innerHTML = '<img src=\"../img/Nublado luna.png" width=\"50px\" height=\"50px\">';
                            }
                        break;
                        case "Lluvia": celda.innerHTML = '<img src=\"../img/Lluvia.png" width=\"50px\" height=\"50px\">';
                        break;
                        case "Muy nublado": celda.innerHTML = '<img src=\"../img/Muy nublado.png" width=\"70px\" height=\"50px\">';
                        break;
                        case "Mucha lluvia": celda.innerHTML = '<img src=\"../img/Mucha lluvia.png" width=\"50px\" height=\"50px\">';
                        break;
                    }
                    if(temperatura[i]>="20"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#FFB757"}
                        ],1000)
                        celda.style.backgroundColor = "#FFB757";
                    }if(temperatura[i]<"20"&&temperatura[i]>="15"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#FFF557"}
                        ],1000)
                        celda.style.backgroundColor = "#FFF557";
                    }if(temperatura[i]<"15"){
                        celda.animate([
                            {backgroundColor: "transparent"},
                            {backgroundColor: "#86FFE8"}
                        ],1000)
                        celda.style.backgroundColor = "#86FFE8";
                    }
                break;
                case 3: celda.innerHTML = precipitaciones[i]+"%";
                if(temperatura[i]>="20"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#FFB757"}
                    ],1000)
                    celda.style.backgroundColor = "#FFB757";
                }if(temperatura[i]<"20"&&temperatura[i]>="15"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#FFF557"}
                    ],1000)
                    celda.style.backgroundColor = "#FFF557";
                }if(temperatura[i]<"15"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#86FFE8"}
                    ],1000)
                    celda.style.backgroundColor = "#86FFE8";
                }
                break;
                case 4: celda.innerHTML = viento[i]+"km/h";
                if(temperatura[i]>="20"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#FFB757"}
                    ],1000)
                    celda.style.backgroundColor = "#FFB757";
                }if(temperatura[i]<"20"&&temperatura[i]>="15"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#FFF557"}
                    ],1000)
                    celda.style.backgroundColor = "#FFF557";
                }if(temperatura[i]<"15"){
                    celda.animate([
                        {backgroundColor: "transparent"},
                        {backgroundColor: "#86FFE8"}
                    ],1000)
                    celda.style.backgroundColor = "#86FFE8";
                }
                break;
            }   
            hilera.appendChild(celda);  
        }

        tblBody.appendChild(hilera);
    }
    document.getElementById("tablatiempo").appendChild(tblBody);
    
       

}
