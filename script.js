document.addEventListener('DOMContentLoaded', () => {
    // 1. SELETORES GERAIS
    const header = document.querySelector('#main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav__list a');
    const revealElements = document.querySelectorAll('.reveal');

    // 2. LÓGICA DO HEADER (Scroll Otimizado)
    // O uso de { passive: true } melhora a performance de rolagem no mobile
    window.addEventListener('scroll', () => {
        header.classList.toggle('nav--scrolled', window.scrollY > 80);
    }, { passive: true });

    // 3. MENU MOBILE & TRAVA DE SCROLL
    const toggleMenu = (forceClose = false) => {
        const isActive = forceClose ? false : navList.classList.toggle('active');
        navToggle?.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    navToggle?.addEventListener('click', () => toggleMenu());

    // Fecha ao clicar nos links (Delegado para melhor performance)
    navList?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') toggleMenu(true);
    });

    // 4. MARCADOR DE PÁGINA ATIVA (Lógica Simplificada)
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('./', '');
        const isHome = (currentPath === '/' || currentPath.includes('index.html')) && href.includes('index.html');
        const isCurrentPage = href !== '' && currentPath.includes(href);

        if (isHome || isCurrentPage) {
            link.classList.add('active');
        }
    });

    // 5. INTERSECTION OBSERVER (Animações de Entrada)
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px" 
        });

        revealElements.forEach(el => observer.observe(el));
    }
});