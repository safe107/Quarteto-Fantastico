// Easter egg da Kemilly: clique 3x no gif -> pede senha -> abre a tela
// "My Favorite Place".
//
// Pra trocar a senha, edite a constante SENHA abaixo (tudo em minúsculo,
// a comparação ignora maiúsculas/minúsculas e espaços nas pontas).

const SENHA = 'bobona';

document.addEventListener('DOMContentLoaded', () => {

    const gif = document.getElementById('gif-secreto');
    const senhaOverlay = document.getElementById('senha-overlay');
    const senhaInput = document.getElementById('senha-input');
    const senhaBotao = document.getElementById('senha-botao');
    const senhaFechar = document.getElementById('senha-fechar');
    const senhaErro = document.getElementById('senha-erro');
    const secretaOverlay = document.getElementById('secreta-overlay');
    const secretaFechar = document.getElementById('secreta-fechar');

    if (!gif || !senhaOverlay || !secretaOverlay) return;

    let cliques = 0;
    let timeoutId = null;

    gif.addEventListener('click', () => {

        cliques++;

        // zera a contagem se passar muito tempo entre os cliques
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { cliques = 0; }, 1500);

        if (cliques >= 3) {
            cliques = 0;
            abrirSenha();
        }

    });

    function abrirSenha() {
        senhaErro.classList.remove('mostrar');
        senhaInput.value = '';
        senhaOverlay.classList.add('ativo');
        setTimeout(() => senhaInput.focus(), 100);
    }

    function fecharSenha() {
        senhaOverlay.classList.remove('ativo');
    }

    function tentarSenha() {
        const valor = senhaInput.value.trim().toLowerCase();

        if (valor === SENHA) {
            fecharSenha();
            abrirSecreta();
        } else {
            senhaErro.classList.add('mostrar');
            senhaInput.value = '';
            senhaInput.focus();
        }
    }

    function abrirSecreta() {
        secretaOverlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }

    function fecharSecreta() {
        secretaOverlay.classList.remove('ativo');
        document.body.style.overflow = '';
    }

    senhaBotao.addEventListener('click', tentarSenha);

    senhaInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') tentarSenha();
    });

    senhaFechar.addEventListener('click', fecharSenha);

    senhaOverlay.addEventListener('click', (e) => {
        if (e.target === senhaOverlay) fecharSenha();
    });

    secretaFechar.addEventListener('click', fecharSecreta);

});
