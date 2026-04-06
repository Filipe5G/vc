/**
 * Lógica do Header: Adiciona classe ao rolar a página
 */
const header = document.querySelector('#main-nav');
window.addEventListener('scroll', () => {
    header.classList.toggle('nav--scrolled', window.scrollY > 80);
});

/**
 * Intersection Observer: Animação de entrada dos elementos
 * Aplica a classe 'revealed' quando o elemento entra na tela
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealOnScroll.unobserve(entry.target); // Para a animação após o primeiro reveal
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));


const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        // Bloqueia o scroll do corpo quando o menu está aberto
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Fechar menu ao clicar em um link (importante para One Page)
document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});