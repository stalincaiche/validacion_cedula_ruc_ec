
function validate_document() {

    var documento = $('#document').val();

    // instanciamos la clase validate y llamamos el método init
    var objValidate = new validateDocument( documento );
    var resValidate = objValidate.init();

    // borramos la información de las cajas de mensaje
    $('.alert-success').html('');
    $('.alert-danger').html('');

    // validamos si la respuesta en un error o un success
    if( resValidate.type == 'error' ){
        $('.alert-danger').append( resValidate.msn );
        $('.alert-success').removeClass("show").addClass("hide");
        $('.alert-danger').removeClass("hide").addClass("show");
    }else{
        $('.alert-success').append( resValidate.msn );
        $('.alert-danger').removeClass("show").addClass("hide");
        $('.alert-success').removeClass("hide").addClass("show");
    }
}
