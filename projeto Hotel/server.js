const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post("/enviar-email", upload.single("pdf"), async (req, res) => {
    const email = req.body.email;
    const pdfBuffer = req.file.buffer;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "SEU_EMAIL@gmail.com",
                pass: "SUA_SENHA_DE_APLICATIVO", // Não use senha normal
            },
        });

        const info = await transporter.sendMail({
            from: '"Hotel Reserva" <vsoares96@gmail.com>',
            to: email,
            subject: "Sua Reserva de Hotel",
            text: "Segue anexo sua reserva.",
            attachments: [
                {
                    filename: "reserva_hotel.pdf",
                    content: pdfBuffer,
                },
            ],
        });

        console.log("E-mail enviado:", info.messageId);
        res.status(200).send("Enviado");
    } catch (error) {
        console.error("Erro ao enviar:", error);
        res.status(500).send("Erro ao enviar e-mail");
    }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
