
onload=function crearTablas(){

    var tblBody = document.createElement("tbody");

    var d = new Date();

    
    var horassiguientes = 24 - d.getHours();
    for(var i=0; i<horassiguientes; i++){     
        var hilera = document.createElement("tr");
        for(var j=0; j<5; j++){
            var celda = document.createElement("td");

            switch(j){
                case 0: celda.innerHTML = d.getHours()+i;
                break;

                case 1: celda.innerHTML = "Valor temperatura";
                break;

                case 2: celda.innerHTML = "Valor humedad";
                break;

                case 3: celda.innerHTML = "Valor tiempo";
                break;

                case 4: celda.innerHTML = "Valor viento";
                break;
            }   
            hilera.appendChild(celda);
            
        }

        tblBody.appendChild(hilera);
    }
    document.getElementById("tablatiempo").appendChild(tblBody);
    
       

}
