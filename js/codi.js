$(document).ready(function(){
	
	window.pos_celda=undefined;	
	window.num_fil=undefined;
	window.num_col=undefined;

	function tablero_nuevo(){
		var casillas="";
		for(var i=0; i<num_fil; i++) {
			casillas="<tr>"+casillas;
			for (var j=0; j<num_col; j++) {
				
				casillas = casillas+"<td> "+pos_celda[i][j]+" </td>";
			}
			casillas=casillas+"</tr>";
		}return casillas;
	}
	$("#creaTabla").click(function(){
		$("#tablero").show();
		$("#recuento").show();
		$("#juega").show();
		$("#input_fil-col").hide();
		num_fil = parseInt(document.getElementById("num_fil").value);
		num_col = parseInt(document.getElementById("num_col").value);
		
		if ((num_fil>=7) && (num_fil<=200) && (num_col>=7) && (num_col<=200)) {
			
			pos_celda=new Array(parseInt(num_fil));
			for(var i=0; i<num_fil; i++) {
				pos_celda[i]=new Array(parseInt(num_col));
					for (var s=0; s<num_col; s++){
						pos_celda[i][s]= "___";
				}
			}
			coloca_barco(submarino);
		}else {
			alert("Solo tableros desde 7x7 hasta 200x200");
		}
		
	});

	$("#juega_casilla").click(function(){
		var ataca_fil = parseInt(document.getElementById("ataca_fil").value);
		var ataca_col = parseInt(document.getElementById("ataca_col").value);

		pos_celda[ataca_fil][ataca_col]=ataca_fil+"X"+ataca_col;
		$("#tabla tbody").html(tablero_nuevo());
	});



	window.submarino=new Array(1);
	window.destructor=new Array(2);
	window.crucero=new Array(3);
	window.acorazado=new Array(4);
	window.portaaviones=new Array(5);

	window.barcos=new Array(submarino,destructor,crucero,acorazado,portaaviones);

	window.coloca_barco = function(barco){
		console.log(barco);
		
		if (barco==submarino){
			var fila = Math.floor((Math.random() * document.getElementById("num_fil").value) + 0);
			var colum = Math.floor((Math.random() * document.getElementById("num_col").value) + 0);
			console.log(fila);
			console.log(colum);
			if (pos_celda[fila][colum]=="___"){
				pos_celda[fila][colum]="_S_";
				$("#tabla tbody").html(tablero_nuevo());
			}else{
				coloca_barco(submarino);
			}
		}
		if (barco==destructor){
			var fila = Math.floor((Math.random() * (document.getElementById("num_fil").value)+1) + 0);
			var colum = Math.floor((Math.random() * (document.getElementById("num_col").value)+1) + 0);
			var direction = Math.floor(Math.random() * 4 + 0);
			console.log(direction);
			var second_cell = null;
			switch(direction) {
				case 0: 
				second_cell = pos_celda[fila-1][colum];
				break;
				case 1:
				second_cell = pos_celda[fila][colum+1];
				break;
				case 2:
				second_cell = pos_celda[fila+1][colum];
				break;
				case 3:
				second_cell = pos_celda[fila][colum-1];
				break;
			}			
			pos_celda[fila][colum]="_D_";
			second_cell="_D_";
			$("#tabla tbody").html(tablero_nuevo());
		}	
	}
	
});