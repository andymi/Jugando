$(function () {
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false
    });
  });
function descargarExcel(){
        //Creamos un Elemento Temporal en forma de enlace
        var tmpElemento = document.createElement('a');
        // obtenemos la información desde el div que lo contiene en el html
        // Obtenemos la información de la tabla
        var data_type = 'data:application/vnd.ms-excel';
        var tabla_div = document.getElementById('example1');
        var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
        tmpElemento.href = data_type + ', ' + tabla_html;
        //Asignamos el nombre a nuestro EXCEL
        tmpElemento.download = 'Ficha_Animal.xls';
        // Simulamos el click al elemento creado para descargarlo
        tmpElemento.click();
}

function reporteAnimal(){
  var i = "/reportes/animal/";
  var j = document.getElementById("rpAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reportePesaje(){
  var i = "/reportes/pesaje/";
  var j = document.getElementById("pesoAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteSanitacion(){
  var i = "/reportes/sanitacion/";
  var j = document.getElementById("saniAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteConsumo(){
  var i = "/reportes/consumo/";
  var j = document.getElementById("consuAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteVacunacion(){
  var i = "/reportes/vacunacion/";
  var j = document.getElementById("vacuAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteCompraAni(){
  var i = "/reportes/compraA/";
  var j = document.getElementById("compraAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteVentaAni(){
  var i = "/reportes/ventasAnimal/";
  var j = document.getElementById("ventaAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteTraslado(){
  var i = "/reportes/trasladoAnimal/";
  var j = document.getElementById("trasladoAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteIngreso(){
  var i = "/reportes/ingresoA/";
  var j = document.getElementById("ingresoAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteSalida(){
  var i = "/reportes/salidaA/";
  var j = document.getElementById("salidaAnimal").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteAcceso(){
  var i = "/reportes/ingresoC/";
  var j = document.getElementById("ingresoEmple").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteCompraInsu(){
  var i = "/reportes/compraI/";
  var j = document.getElementById("compraInsumo").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}
function reporteCompraServi(){
  var i = "/reportes/compraS/";
  var j = document.getElementById("compraServi").value;
  var sum = i+j;
  console.log("---------------------------------",sum);
  window.location=sum;
}