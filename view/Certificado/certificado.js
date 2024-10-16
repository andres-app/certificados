const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* Inicializamos la imagen */
const image = new Image();
const imageqr = new Image();

$(document).ready(function () {
    var curd_id = getUrlParameter('curd_id');

    $.post("../../controller/usuario.php?op=mostrar_curso_detalle", { curd_id: curd_id }, function (data) {
        data = JSON.parse(data);

        // Verifica si total_horas está presente
        console.log(data);

        // Solo dibujar la imagen de fondo después de que esté cargada
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Ahora dibujar el resto del contenido del certificado
            ctx.font = '40px Arial';
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            var x = canvas.width / 2;
            ctx.fillText(data.usu_nom + ' ' + data.usu_apep + ' ' + data.usu_apem, x, 270);

            ctx.font = '30px Arial';
            ctx.fillText(data.cur_nom, x, 380);

            // Agregar horas del curso
            ctx.font = '15px Arial';
            ctx.fillText('Total de horas lectivas: ' + data.total_horas + ' horas', x, 450);

            // Formatear fechas a DD/MM/AAAA
            const fechaInicio = formatearFecha(data.cur_fechini);
            const fechaFin = formatearFecha(data.cur_fechfin);

            ctx.font = '15px Arial';
            ctx.fillText('Desde el: ' + fechaInicio + ' / ' + 'Hasta el: ' + fechaFin, x, 480);

            // Dibujar el código QR después de que esté cargado
            imageqr.onload = function () {
                ctx.drawImage(imageqr, 400, 500, 100, 100);
            };
            imageqr.src = "../../public/qr/" + curd_id + ".png";

            $('#cur_descrip').html(data.cur_descrip);
        };
        image.src = data.cur_img; // Asignar el src de la imagen solo después de definir onload
    });
});

/* Función para formatear la fecha en formato DD/MM/AAAA con UTC */
function formatearFecha(fecha) {
    const dateObj = new Date(fecha);
    const dia = ('0' + dateObj.getUTCDate()).slice(-2); // Usamos getUTCDate
    const mes = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // Usamos getUTCMonth
    const anio = dateObj.getUTCFullYear(); // Usamos getUTCFullYear
    return `${dia}/${mes}/${anio}`;
}


/* Recarga por defecto solo 1 vez */
window.onload = function () {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
};

$(document).on("click", "#btnpng", function () {
    let lblpng = document.createElement('a');
    lblpng.download = "Certificado.png";
    lblpng.href = canvas.toDataURL();
    lblpng.click();
});

$(document).on("click", "#btnpdf", function () {
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
