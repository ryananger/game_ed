rain = document.createElement('audio');
rain.src = 'resources/rain.mp3';
rain.setAttribute('preload', 'auto');
rain.setAttribute('controls', 'none');

document.body.appendChild(rain);

rain.volume = 0.05;