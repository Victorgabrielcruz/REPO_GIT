const toggleModeBtn = document.getElementById('toggleModeBtn');
const body = document.body;

// Verificar o estado atual do modo (light ou dark)
const isDarkMode = () => body.classList.contains('dark-mode');

// Função para alternar entre light e dark mode
const toggleMode = () => {
    body.classList.toggle('dark-mode');
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
    // Se o modo dark estiver ativado, mudar a classe da navbar para bg e remover bg-light
    const navbarBrand = document.querySelector('.navbar-brand');
    navbarBrand.classList.add('bg');
    navbarBrand.classList.remove('bg-light');
}
