var usu_id = $('#usu_idx').val();
var rol_id = $('#rol_idx').val();  // Obtén el rol del usuario

$(document).ready(function(){

    // Si es administrador, obten el total de usuarios
    if (rol_id == 2) {  // Suponiendo que 2 es el rol de administrador
        $.post("../../controller/usuario.php?op=total_usuarios", function (data) {
            data = JSON.parse(data);
            $('#lbltotalusuarios').html(data.total);
        });
    }

    // Si es un usuario regular, obten el total de cursos
    if (rol_id == 1) {  // Suponiendo que 1 es el rol de usuario
        $.post("../../controller/usuario.php?op=total", { usu_id : usu_id }, function (data) {
            data = JSON.parse(data);
            $('#lbltotal').html(data.total);
        });
    }

    // Verificación del rol para definir el comportamiento
    if (rol_id == 2) { // Si es administrador
        $('#cursos_data').DataTable({
            "aProcessing": true,
            "aServerSide": true,
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
            ],
            "ajax": {
                url: "../../controller/usuario.php?op=listar_certificados_admin", // Endpoint para admin
                type: "POST"
            },
            "bDestroy": true,
            "responsive": true,
            "bInfo": true,
            "iDisplayLength": 10,
            "order": [[ 0, "asc" ]],
            "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sSearch":         "Buscar:",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                }
            }
        });
    } else { // Si es un usuario normal
        $('#cursos_data').DataTable({
            "aProcessing": true,
            "aServerSide": true,
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
            ],
            "ajax": {
                url: "../../controller/usuario.php?op=listar_cursos_top10", // Endpoint para usuarios
                type: "POST",
                data: { usu_id: usu_id } // Pasamos el ID del usuario
            },
            "bDestroy": true,
            "responsive": true,
            "bInfo": true,
            "iDisplayLength": 10,
            "order": [[ 0, "desc" ]],
            "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sSearch":         "Buscar:",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                }
            }
        });
    }
});

function certificado(curd_id){
    console.log(curd_id);
    window.open('../Certificado/index.php?curd_id='+ curd_id, '_blank');
}
