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
    const segredoBotao = document.getElementById('segredo-disfarcado');
    const segredoOverlay = document.getElementById('segredo-overlay');
    const segredoCaixa = document.querySelector('.segredo-caixa');
    const segredoAcoes = document.getElementById('segredo-acoes');
    const segredoSim = document.getElementById('segredo-sim');
    const segredoNao = document.getElementById('segredo-nao');
    const segredoTexto = document.getElementById('segredo-texto');

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

    if (segredoBotao && segredoOverlay && segredoCaixa && segredoAcoes && segredoSim && segredoNao) {
        let fugas = 0;

        segredoBotao.addEventListener('click', abrirSegredo);
        segredoNao.addEventListener('click', fecharSegredo);
        segredoSim.addEventListener('mouseenter', fugirDoUsuario);
        segredoSim.addEventListener('focus', fugirDoUsuario);
        segredoSim.addEventListener('click', fugirDoUsuario);
        segredoSim.addEventListener('touchstart', fugirDoUsuario, { passive:false });

        segredoOverlay.addEventListener('click', (e) => {
            if (e.target === segredoOverlay) fecharSegredo();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && segredoOverlay.classList.contains('ativo')) {
                fecharSegredo();
            }
        });

        function abrirSegredo() {
            fugas = 0;
            segredoTexto.textContent = 'escolha com sabedoria.';
            if (segredoSim.parentElement !== segredoAcoes) {
                segredoAcoes.insertBefore(segredoSim, segredoNao);
            }
            segredoSim.style.position = '';
            segredoSim.style.left = '';
            segredoSim.style.top = '';
            segredoSim.style.zIndex = '';
            segredoSim.classList.remove('fugindo');
            segredoOverlay.classList.add('ativo');
            segredoOverlay.setAttribute('aria-hidden', 'false');
        }

        function fecharSegredo() {
            segredoOverlay.classList.remove('ativo');
            segredoOverlay.setAttribute('aria-hidden', 'true');
        }

        function fugirDoUsuario(e) {
            if (e.type === 'touchstart') e.preventDefault();

            const botaoRect = segredoSim.getBoundingClientRect();
            const margem = 18;
            const maxLeft = Math.max(margem, window.innerWidth - botaoRect.width - margem);
            const maxTop = Math.max(margem, window.innerHeight - botaoRect.height - margem);

            const left = Math.round(margem + Math.random() * (maxLeft - margem));
            const top = Math.round(margem + Math.random() * (maxTop - margem));

            fugas++;
            if (segredoSim.parentElement !== segredoOverlay) {
                segredoOverlay.appendChild(segredoSim);
            }
            segredoSim.style.position = 'fixed';
            segredoSim.style.left = `${left}px`;
            segredoSim.style.top = `${top}px`;
            segredoSim.style.zIndex = '1301';
            segredoSim.classList.add('fugindo');

            const frases = [
                'opa, nao tao facil assim.',
                'quase... mas o segredo corre rapido.',
                'ta determinado hein.',
                'o botao esta timido hoje.'
            ];

            segredoTexto.textContent = frases[Math.min(fugas - 1, frases.length - 1)];
            setTimeout(() => segredoSim.classList.remove('fugindo'), 180);
        }
    }

});
