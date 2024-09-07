const nodemailer = require('nodemailer');
const formidable = require('formidable');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ error: 'Error al procesar el formulario' });
            }

            const { nombre, apellido, motivo, email, mensaje } = fields;
            const archivoAdjunto = files.file?.filepath;

            // Configurar el transporte de nodemailer
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER, // Asegúrate de configurar esta variable en Vercel
                    pass: process.env.EMAIL_PASS, // Asegúrate de configurar esta variable en Vercel
                },
            });

            // Opciones del correo
            let mailOptions = {
                from: email,
                to: process.env.EMAIL_USER, // Tu correo personal donde recibirás los mensajes
                subject: `Nuevo mensaje de ${nombre} ${apellido}`,
                text: `Motivo: ${motivo}\n\nMensaje:\n${mensaje}\n\nCorreo de contacto: ${email}`,
                attachments: [
                    {
                        filename: files.file?.originalFilename,
                        path: archivoAdjunto, // Ruta del archivo cargado
                    },
                ],
            };

            // Intentar enviar el correo
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Correo enviado con éxito' });
            } catch (error) {
                console.error('Error al enviar el correo:', error);
                res.status(500).json({ error: 'Error al enviar el correo' });
            }
        });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}

export const config = {
    api: {
        bodyParser: false, // Esto permite que formidable maneje el cuerpo de la solicitud
    },
};

