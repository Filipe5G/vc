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