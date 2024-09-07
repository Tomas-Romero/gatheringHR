document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);

    // Enviar los datos del formulario al backend
    const response = await fetch('../api/send-email', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Correo enviado con éxito');
    } else {
        alert('Error al enviar el correo');
    }
});