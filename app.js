document.addEventListener("DOMContentLoaded", () => {
    const loginView = document.getElementById('loginView');
    const siuView = document.getElementById('siuView');
    const loginForm = document.getElementById('loginForm');
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Navegación principal
    const navTabs = document.querySelectorAll('.nav-tab');
    const subViews = document.querySelectorAll('.sub-view');

    // Navegación interna (Clases)
    const tabNotas = document.getElementById('tabNotas');
    const tabHorario = document.getElementById('tabHorario');
    const contentNotas = document.getElementById('contentNotas');
    const contentHorario = document.getElementById('contentHorario');

    // Acción para entrar al SIU
    function iniciarSesion() {
        loginView.classList.add('hidden');
        siuView.classList.remove('hidden');
        
        // Al entrar siempre restauramos el estado inicial: ver la Bienvenida
        navTabs.forEach(t => t.classList.remove('active'));
        subViews.forEach(view => view.classList.add('hidden'));
        document.getElementById('welcomeSubView').classList.remove('hidden');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            iniciarSesion();
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            iniciarSesion();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            siuView.classList.add('hidden');
            loginView.classList.remove('hidden');
        });
    }

    // --- MANEJADOR DE CAMBIO DE PESTAÑAS (CORREGIDO PARA CUALQUIER SUB-VISTA) ---
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-target');

            subViews.forEach(view => {
                // Si la vista actual es la que queremos abrir Y NO es la bienvenida genérica, la mostramos
                if (view.id === target && target !== 'welcomeSubView') {
                    view.classList.remove('hidden');
                } else {
                    // Oculta absolutamente todo lo demás (incluyendo el robot de bienvenida)
                    view.classList.add('hidden');
                }
            });
        });
    });

    // Pestaña de regreso al Inicio (Casa 🏠)
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            subViews.forEach(view => view.classList.add('hidden'));
            document.getElementById('welcomeSubView').classList.remove('hidden');
        });
    }

    // --- PESTAÑAS INTERNES DE MIS CLASES ---
    if (tabNotas && tabHorario) {
        tabNotas.addEventListener('click', () => {
            tabNotas.classList.add('active');
            tabHorario.classList.remove('active');
            contentNotas.classList.remove('hidden');
            contentHorario.classList.add('hidden');
        });

        tabHorario.addEventListener('click', () => {
            tabHorario.classList.add('active');
            tabNotas.classList.remove('active');
            contentHorario.classList.remove('hidden');
            contentNotas.classList.add('hidden');
        });
    }
});