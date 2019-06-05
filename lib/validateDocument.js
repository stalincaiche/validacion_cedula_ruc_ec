/**
 * @author Ing. Stalin Caiche Morán <stalin.caiche@gmail.com>
 * @license GNU General Public License v3.0
 */
class validateDocument {

    document;
    documentValido;
    documentValidoCedula;
    documentValidoRuc;

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
                    return this.validateCedula( this.document );
                } else {
                    // validamos que el documento sea un ruc
                    // el ruc tiene 13 dígitos
                    if ( this.document.toString().length == 13 ){
                        // es un ruc
                        return this.validateRuc( this.document );
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
        /* Obtenemos los dos primeros digitos de la cédula  */
        /* Estos indican el número de la provincia por lo que no puede ser mayor a 24 ni menor a 0 */
        var prov = cedula.substring(0,2);
        if ( prov >= 1 && prov <= 24 ){
            /* Verificamos que el tercer dígito debe ser menor a 6  */
            var tercer = cedula.substring(2,3);
            if ( tercer >= 0 || tercer <=5 ){
                /* dígito verificador */
                // obtenemos el último dígito con substring
                var ultimo_digito = cedula.substring(9,10);
                // sumamos todos los dígitos pares
                var digitos_pares = parseInt(cedula.substring(1,2)) +
                    parseInt(cedula.substring(3,4)) +
                    parseInt(cedula.substring(5,6)) +
                    parseInt(cedula.substring(7,8)) ;
                var digitos_impares = 0;
                // sumamos los dígitos imapares
                // a cada dígito impar lo multiplicamos por 2, si el resultado es mayor a 9, se le resta 9 al resultado.
                var digito_uno      = parseInt(cedula.substring(0,1)) * 2;
                digitos_impares = (digito_uno > 9)?(digito_uno-9):digito_uno;
                var digito_tres      = parseInt(cedula.substring(2,3)) * 2;
                var digitos_impares  = digitos_impares + ((digito_tres > 9)?(digito_tres-9):digito_tres);
                var digito_cinco      = parseInt(cedula.substring(4,5)) * 2;
                var digitos_impares  = digitos_impares + ((digito_cinco > 9)?(digito_cinco-9):digito_cinco)  ;
                var digito_siete      = parseInt(cedula.substring(6,7)) * 2;
                var digitos_impares  = digitos_impares + ((digito_siete > 9)?(digito_siete-9):digito_siete);
                var digito_nueve      = parseInt(cedula.substring(8,9)) * 2;
                var digitos_impares  = digitos_impares + ((digito_nueve > 9)?(digito_nueve-9):digito_nueve);

                // sumamos los digitos pares e impares
                var suma_digitos = digitos_pares + digitos_impares;

                // obtenemos el primer dígito de la suma
                var primer_digito_suma = String(suma_digitos).substring(0,1);

                // obtenemos la decena
                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                // restamos la decena menos la suma total es igual al dígito validador
                // digito validador = decena - suma digitos.
                var digito_validador = decena - suma_digitos;

                // Si el dígito validador es igual a 10
                // le asignamos 0 al digito validador.
                digito_validador = (digito_validador == 10)?0:digito_validador;

                // el digito validador debe ser igual al último digito de la cédula.
                if( digito_validador == ultimo_digito ){
                    return { 'type' : 'success', 'msn': this.documentValidoCedula };
                }else{
                    return { 'type' : 'error', 'msn': this.documentValido };
                }

            }else{
                // el tercer dígito es incorrecto
                return { 'type' : 'error', 'msn': this.documentValido };
            }
        }else{
            // los dos primeros dígitos son incorrectos
            return { 'type' : 'error', 'msn': this.documentValido };
        }
    }

    validateRuc( ruc ){
        // verificamos que los 3 útimos dígitos del ruc sean 001
        var ultimos_digitos = ruc.substring(10,13);

        if ( ultimos_digitos != '001' ){
            return { 'type' : 'error', 'msn': this.documentValido };
        }

        // Los dos primeros dígitos no pueden ser mayores a 24.
        var primeros_digitos = ruc.substring(0,2);

        if ( primeros_digitos > 24 ){
            return { 'type' : 'error', 'msn': this.documentValido };
        }

        return { 'type' : 'success', 'msn': this.documentValidoRuc };
    }

    getMsn(){
        this.documentValido = "Por favor ingrese un documento válido.";
        this.documentValidoCedula = "Cédula correcta";
        this.documentValidoRuc = "Ruc correcto";
    }


}
