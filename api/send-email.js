const nodemailer = require('nodemailer');
const formidable = require('formidable');  // Para manejar archivos
const fs = require('fs');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Parsear el formulario usando formidable para manejar archivos
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error procesando el formulario' });
            }

            const { nombre, apellido, email, mensaje } = fields;
            const archivo = files.archivo;

            // Configuración de Nodemailer
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tominetorgamer@gmail.com', // Reemplaza con tu correo
                    pass: 'Tomasromero2003%',       // Reemplaza con tu contraseña
                },
            });

            // Opciones del correo electrónico
            let mailOptions = {
                from: email,
                to: 'Tomasromero200310@gmail.com',  // El correo al que llegarán los mensajes
                subject: 'Nuevo mensaje con archivo adjunto',
                text: `
                    Nombre: ${nombre}
                    Apellido: ${apellido}
                    Email: ${email}
                    Mensaje: ${mensaje}
                `,
                attachments: [
                    {
                        filename: archivo.originalFilename,
                        content: fs.createReadStream(archivo.filepath)  // Lee el archivo
                    }
                ]
            };

            // Enviar el correo
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Correo enviado con éxito' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al enviar el correo' });
            }
        });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
