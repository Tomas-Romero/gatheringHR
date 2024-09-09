document.addEventListener('DOMContentLoaded', function () {
    // Reemplaza 'YOUR_API_KEY' con tu clave de API y 'YOUR_SPREADSHEET_ID' con el ID de tu hoja de cálculo
    const apiKey = 'AIzaSyD6sy-LdBLxt_h2vUuhq5saheNVpu0FT-k';
    const sheetId = '100B6C5smdHZ8aEPEq9kNM1JphVzLmimeoQpEQ_PtiTs';
    const range = 'vacantes!A:E'; // Ajusta el rango si es necesario

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            const vacantesContainer = document.getElementById('vacantes-container');
            const rows = data.values;

            if (rows.length > 0) {
                // Extrae la cabecera
                const headers = rows[0];

                // Itera sobre cada fila de datos
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const vacanteDiv = document.createElement('div');
                    vacanteDiv.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:bg-blue-100', 'transition-all', 'duration-300');

                    vacanteDiv.innerHTML = `
                        <h2 class="md:text-2xl text-base font-bold mb-2 text-[#282D46]">Puesto: ${row[0]}</h2>
                        <p class="text-base"><strong class="text-xs md:text-base text-[#282D46]">Requisitos:</strong><br>-${row[1].replace(/\n/g, '<br>-')}</p>
                        <p class="text-base"><strong class="text-xs md:text-base text-[#282D46]">Funciones:</strong><br>-${row[2].replace(/\n/g, '<br>-')}</p>
                        <p class="text-base"><strong class="text-xs md:text-base text-[#282D46]">Beneficios:</strong><br>-${row[3].replace(/\n/g, '<br>-')}</p>
                        <p class="text-base"><strong class="text-xs md:text-base text-[#282D46]">Sueldo:</strong><br>${row[4].replace(/\n/g, '<br>')}</p>
                    `;

                    vacantesContainer.appendChild(vacanteDiv);
                }
            } else {
                vacantesContainer.innerHTML = '<p>No hay vacantes disponibles.</p>';
            }
        })
        .catch(error => console.error('Error al cargar las vacantes:', error));
});
    
