const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* Inicializamos la imagen */
const image = new Image();
const imageqr = new Image();

$(document).ready(function(){
    var curd_id = getUrlParameter('curd_id');

    $.post("../../controller/usuario.php?op=mostrar_curso_detalle", { curd_id : curd_id }, function (data) {
        data = JSON.parse(data);
        
        // Verifica si total_horas está presente
        console.log(data);

        /* Luego de verificar, continúa con el código de generación del certificado */
        image.src = data.cur_img;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = '40px Arial';
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        var x = canvas.width / 2;
        ctx.fillText(data.usu_nom + ' ' + data.usu_apep + ' ' + data.usu_apem, x, 270);

        ctx.font = '30px Arial';
        ctx.fillText(data.cur_nom, x, 380);

        // Formatear fechas a DD/MM/AAAA
        const fechaInicio = formatearFecha(data.cur_fechini);
        const fechaFin = formatearFecha(data.cur_fechfin);

        ctx.font = '15px Arial';
        ctx.fillText('Desde el: ' + fechaInicio + ' / ' + 'Hasta el: ' + fechaFin, x, 490);

        // Agregar horas del curso
        ctx.font = '15px Arial';
        ctx.fillText('Total de horas: ' + data.total_horas, x, 450);

        imageqr.src = "../../public/qr/" + curd_id + ".png";
        ctx.drawImage(imageqr, 400, 500, 100, 100);

        $('#cur_descrip').html(data.cur_descrip);
    });    

});

/* Función para formatear la fecha en formato DD/MM/AAAA */
function formatearFecha(fecha) {
    const dateObj = new Date(fecha);
    const dia = ('0' + dateObj.getDate()).slice(-2);
    const mes = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Los meses en JavaScript son de 0-11
    const anio = dateObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

/* Recarga por defecto solo 1 vez */
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

$(document).on("click","#btnpng", function(){
    let lblpng = document.createElement('a');
    lblpng.download = "Certificado.png";
    lblpng.href = canvas.toDataURL();
    lblpng.click();
});

$(document).on("click","#btnpdf", function(){
    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF('l', 'mm');
    doc.addImage(imgData, 'PNG', 30, 15);
    doc.save('Certificado.pdf');
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
