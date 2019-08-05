class Interfaz  {


    constructor(){
        this.init();
    }



    init(){
        this.construirSelect();
    }



    construirSelect(){
        cotizador.obtenerMonedasApi()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda');
                for (const [key, value] of Object.entries(monedas.monedas.Data)){
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }


    mostrarMensaje (mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    mostrarResultado(resultado, moneda, criptomoneda){
        const resultadoAnterior = document.querySelector('#resultado div');
        if (resultadoAnterior ) {
            resultadoAnterior.remove();
        } 
        const datosMoneda =  resultado[criptomoneda][moneda];
        let precio = datosMoneda.PRICE.toFixed(3);
        let fechaActualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-UY');
        let templateHTML = `
        <div class="card bg-warning">    
            <div class="card-body text-light">
            <h2 class="card-tittle">Resultado:</h2><br>
            <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio} </p>
            <br><p>Variacion ultimo dia %${datosMoneda.CHANGEPCTDAY.toFixed(3)}</p>
            <br><p>Ultima actualización ${fechaActualizacion}</p>
            </div>
        </div>
        `
        this.mostrarSpinner('block');
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;   
            this.mostrarSpinner('none'); 
        }, 1000);
        
    }

    mostrarSpinner(estado){
        const spiner = document.querySelector('.contenido-spinner');
        spiner.style.display = estado;
    }
}