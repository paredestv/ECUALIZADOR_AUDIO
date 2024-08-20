// script.js
// Seleccionamos el audio y los controles
const audioPlayer = document.getElementById('audio-player');
const bassControl = document.getElementById('bass');
const midControl = document.getElementById('mid');
const trebleControl = document.getElementById('treble');

const bassValue = document.getElementById('bass-value');
const midValue = document.getElementById('mid-value');
const trebleValue = document.getElementById('treble-value');

// Crear el contexto de audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audioPlayer);

// Crear filtros para bajos, medios y agudos
const bassFilter = audioContext.createBiquadFilter();
bassFilter.type = 'lowshelf';
bassFilter.frequency.value = 200;

const midFilter = audioContext.createBiquadFilter();
midFilter.type = 'peaking';
midFilter.frequency.value = 1000;
midFilter.Q.value = 1;

const trebleFilter = audioContext.createBiquadFilter();
trebleFilter.type = 'highshelf';
trebleFilter.frequency.value = 3000;

// Conectar los filtros
audioSource.connect(bassFilter);
bassFilter.connect(midFilter);
midFilter.connect(trebleFilter);
trebleFilter.connect(audioContext.destination);

// Función para actualizar el valor de los controles
function updateValues() {
    bassValue.textContent = bassControl.value;
    midValue.textContent = midControl.value;
    trebleValue.textContent = trebleControl.value;

    // Ajustar los valores de ganancia de los filtros
    bassFilter.gain.value = bassControl.value - 50;
    midFilter.gain.value = midControl.value - 50;
    trebleFilter.gain.value = trebleControl.value - 50;
}

// Escuchar los cambios en los controles
[bassControl, midControl, trebleControl].forEach(control => {
    control.addEventListener('input', updateValues);
});

// Iniciar el contexto de audio al reproducir
audioPlayer.addEventListener('play', () => {
    audioContext.resume();
});
