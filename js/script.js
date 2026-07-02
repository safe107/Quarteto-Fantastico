// Controla o botão de tocar/pausar música de fundo.
// Funciona em qualquer página que tenha:
//   - um <audio id="bg-music">
//   - um botão com id="music-button"

document.addEventListener('DOMContentLoaded', () => {

    const musicButton = document.getElementById('music-button');
    const bgMusic = document.getElementById('bg-music');

    if (!musicButton || !bgMusic) return;

    musicButton.addEventListener('click', () => {

        if (bgMusic.paused) {
            bgMusic.play().catch(() => {
                // Alguns navegadores bloqueiam autoplay/erro se o arquivo
                // de música ainda não foi adicionado em /audio.
                console.warn('Não foi possível tocar a música. Verifique se o arquivo foi adicionado na pasta /audio.');
            });
            musicButton.textContent = '⏸ Pausar música';
            musicButton.classList.add('tocando');
        } else {
            bgMusic.pause();
            musicButton.textContent = '▶ Tocar música';
            musicButton.classList.remove('tocando');
        }

    });

});
