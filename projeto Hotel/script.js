async function enviarPorEmail() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Dados do formulário
    const numeroQuarto = document.getElementById("numeroQuarto").value;
    const numeroOcupantes = document.getElementById("numeroOcupantes").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    // Criar conteúdo como planilha
    const campos = [
        ["Número do Quarto", numeroQuarto],
        ["Número de Ocupantes", numeroOcupantes],
        ["Nome Completo", nome],
        ["CPF", cpf],
        ["E-mail", email],
        ["Check-in", checkIn],
        ["Check-out", checkOut]
    ];

    let startY = 30;
    doc.setFontSize(18);
    doc.text("Ficha de Reserva - Hotel", 105, 20, null, null, "center");
    doc.setFontSize(12);

    campos.forEach(([label, valor], index) => {
        let y = startY + index * 15;
        doc.rect(20, y, 170, 12);
        doc.text(`${label}:`, 25, y + 8);
        doc.text(valor, 90, y + 8);
    });

    // Converter PDF em Blob
    const pdfBlob = doc.output("blob");

    // Criar FormData para envio
    const formData = new FormData();
    formData.append("pdf", pdfBlob, "reserva_hotel.pdf");
    formData.append("email", email); // email do hóspede

    // Enviar para o servidor (backend)
    const response = await fetch("http://localhost:3000/enviar-email", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        alert("E-mail enviado com sucesso!");
    } else {
        alert("Erro ao enviar o e-mail.");
    }
}
