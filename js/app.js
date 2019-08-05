const cotizador = new API('92af5d2c45fe94a8ed6c9198e181c874e7ee1a4c28282a54829ba43f74b483ba');
const ui = new Interfaz();



const formulario = document.getElementById('formulario');



formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'alert bg-danger text-center');
    } else {
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            })
    }
});
