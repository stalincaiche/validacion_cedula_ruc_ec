/**
 * @author Ing. Stalin Caiche Morán <stalin.caiche@gmail.com>
 * @license GNU General Public License v3.0
 */
class validateDocument {

    document;
    documentValido;

    constructor( documento ){
        this.getMsn();
        this.document = documento;
    }



    init(){

        if ( this.document.toString().trim() != '' ){
            if ( !isNaN( parseInt( this.document ) ) ) {
                // validamos que sea una cédula
                // la cédula debe tener 10 dígitos
                if ( this.document.toString().length == 10 ){
                    // es una cédula
                    this.validateCedula( this.document );
                } else {
                    // validamos que el documento sea un ruc
                    // el ruc tiene 13 dígitos
                    if ( this.document.toString().length == 13 ){
                        // es un ruc
                        this.validateRuc( this.document );
                    } else {
                        // el número ingresado no pertenece ni a una cédula ni a un ruc
                        return { 'type': 'error', 'msn': this.documentValido };
                    }
                }
            }else{
                // el documento no es numérico
                return { 'type': 'error', 'msn': this.documentValido };
            }

        } else {
            // el campo esta vacio
            return { 'type' : 'error', 'msn': this.documentValido };
        }
    }

    validateCedula( cedula ){

    }

    validateRuc( ruc ){

    }

    getMsn(){
        this.documentValido = "Por favor ingrese un documento válido.";
    }


}
