
onload=function crearTablas(){
    var contenedor = document.getElementById("contenedor");


   
    var tblBody = document.createElement("tbody");

    var d = new Date();

    
    var horassiguientes = 24 - d.getHours();
    
    
    for(var i=0; i<horassiguientes; i++){
        
        var hilera = document.createElement("tr");
        
        var textocelda = document.createTextNode(d.getHours()+i);
       
        
        
        for(var j=0; j<5; j++){
            var celda = document.createElement("td");
            if(j==0){
                celda.appendChild(textocelda);
            }
            
            
            
            hilera.appendChild(celda);
            
        }

        tblBody.appendChild(hilera);
    }
    document.getElementById("tablatiempo").appendChild(tblBody);
    
       

}
