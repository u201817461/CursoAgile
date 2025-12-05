const resultDiv = document.getElementById('result');
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const calculateBtn = document.getElementById('calculateBtn');

// Ajuste de tamaño del canvas
canvas.width = 320;
canvas.height = 200;

let chartData = [];

calculateBtn.addEventListener('click', calcularVelocidad);

function calcularVelocidad() {
    const d = parseFloat(document.getElementById('distance').value);
    const t = parseFloat(document.getElementById('time').value);

    // Validación de datos
    if (isNaN(d) || isNaN(t)) {
        alert('Por favor, ingrese valores numéricos.');
        return;
    }
    if (d < 0 || t <= 0) {
        alert('La distancia debe ser >= 0 y el tiempo > 0.');
        return;
    }

    const v = d / t;
    resultDiv.innerHTML = `Velocidad: <strong>${v.toFixed(2)} m/s</strong>`;

    // Guardar datos para graficar
    chartData.push({ d, t, v });
    if(chartData.length > 10) chartData.shift(); // Mantener últimos 10 cálculos

    dibujarGrafico();
}

function dibujarGrafico() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 30;
    const width = canvas.width - padding*2;
    const height = canvas.height - padding*2;

    const maxV = Math.max(...chartData.map(c => c.v), 10);

    // Dibujar eje
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + height);
    ctx.lineTo(padding + width, padding + height);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Dibujar puntos
    chartData.forEach((point, index) => {
        const x = padding + (index / (chartData.length-1 || 1)) * width;
        const y = padding + height - (point.v / maxV) * height;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#007bff';
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(`${point.v.toFixed(1)} m/s`, x-15, y-10);
    });

    // Etiquetas ejes
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('Velocidad (m/s)', 5, padding-10);
    ctx.fillText('Historial de cálculos', padding + width/4, padding + height + 25);
}
