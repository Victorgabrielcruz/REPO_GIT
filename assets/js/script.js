const toggleModeBtn = document.getElementById('toggleModeBtn');
const body = document.body;
const footer = document.querySelector('.footer');

// Verificar o estado atual do modo (light ou dark)
const isDarkMode = () => body.classList.contains('dark-mode');

// Função para alternar entre light e dark mode
const toggleMode = () => {
    body.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode-footer'); // Adicionar classe para footer no modo dark
    // Salvar o estado do modo no localStorage para persistência
    localStorage.setItem('darkMode', isDarkMode() ? 'true' : 'false');

    // Mudar a classe da navbar de bg-light para bg conforme o modo
    const navbarBrand = document.querySelector('.navbar-brand');
    navbarBrand.classList.toggle('bg');
    navbarBrand.classList.toggle('bg-light');

    // Remover a classe bg-light da navbar quando estiver no modo dark
    navbarBrand.classList.remove('bg-dark');
};

// Adicionar evento de clique ao botão
toggleModeBtn.addEventListener('click', toggleMode);

// Verificar se o usuário já tinha escolhido o dark mode anteriormente
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'true') {
    body.classList.add('dark-mode');
    footer.classList.add('dark-mode-footer'); // Adicionar classe para footer no modo dark
    // Se o modo dark estiver ativado, mudar a classe da navbar para bg e remover bg-light
    const navbarBrand = document.querySelector('.navbar-brand');
    navbarBrand.classList.add('bg');
    navbarBrand.classList.remove('bg-light');
}
function isMobile() {
    return window.innerWidth < 576;
}

// Função para remover ou adicionar a classe 'd-flex align-items-start' do elemento com ID 'perfil' dependendo do tamanho da tela
function toggleFlexClassOnMobile() {
    let perfilDiv = document.getElementById('perfil');
    if (perfilDiv) {
        if (isMobile()) {
            // Se for um dispositivo móvel, remova a classe
            perfilDiv.classList.remove('d-flex', 'align-items-start');
        } else {
            // Se não for um dispositivo móvel, adicione a classe de volta
            perfilDiv.classList.add('d-flex', 'align-items-start');
        }
    }
}

// Verificar e aplicar a classe ao carregar a página e redimensionar a tela
window.addEventListener('DOMContentLoaded', toggleFlexClassOnMobile);
window.addEventListener('resize', toggleFlexClassOnMobile);

