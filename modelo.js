document.addEventListener('DOMContentLoaded', () =>{
    let modelo;

    toxicity.load(0.5).then(m => {
        modelo = m;
        document.getElementById('resultado').innerText = "Modelo Cargado. Ingresá un texto";
    });

    document.getElementById('btnAnalizar').addEventListener('click', () =>{
        const texto = document.getElementById('texto').value;
        if(!modelo || texto.trim() === "") return;

        modelo.classify([texto]).then(predicciones =>{
            let salida = `<strong>Texto:</strong> "${texto}"<br><strong>Resultados:</strong><ul>`;
            predicciones.forEach(pred =>{
                const match = pred.results[0].match;
                salida += `<li>${pred.label}: <strong>${match ? "Si" : "No"}</strong></li>`;
            });
            salida += "</ul>";
            document.getElementById('resultado').innerHTML = salida;
        })
    })
})
