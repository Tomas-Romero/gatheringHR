const btn = document.getElementById('button');

// Inicializa EmailJS con tu Public Key
emailjs.init('1aGgAZcb-YIMJn_6_');

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...'; // Cambia el texto del botón mientras envías el formulario

    const serviceID = 'tomasromero200310'; // Puedes probar con 'default_service'
    const templateID = 'sitiowebgatheringhr'; // Asegúrate de que este Template ID sea correcto

    // Envía el formulario utilizando sendForm
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email'; // Restaura el texto del botón
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Tu mensaje ha sido enviado exitosamente.',
                confirmButtonText: 'OK'
            });
            document.getElementById('contact-form').reset(); // Resetea el formulario tras el envío
        }, (err) => {
            btn.value = 'Send Email'; // Restaura el texto del botón en caso de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje: ' + JSON.stringify(err),
                confirmButtonText: 'OK'
            });
        });
});

  