// Año dinámico en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// Búsqueda / filtro de apps
const filtro = document.getElementById('filtroApps');
const items = Array.from(document.querySelectorAll('#listaApps .app-item'));
if (filtro && items.length) {
    const filtrar = () => {
        const q = filtro.value.trim().toLowerCase();
        items.forEach(it => {
            const text = it.innerText.toLowerCase();
            const tags = (it.dataset.tags || '').toLowerCase();
            const hit = !q || text.includes(q) || tags.includes(q);
            it.style.display = hit ? '' : 'none';
        });
    };
    filtro.addEventListener('input', filtrar);
}


// Ver todas: limpia filtro
const btnVerTodo = document.getElementById('btnVerTodo');
if (btnVerTodo && filtro) {
    btnVerTodo.addEventListener('click', () => {
        filtro.value = '';
        filtro.dispatchEvent(new Event('input'));
        filtro.focus();
    });
}


// Toggle tema claro/oscuro con persistencia
const btnTheme = document.getElementById('btnTheme');
const root = document.documentElement; // <html>
const THEME_KEY = 'ops-theme';


const applyTheme = (t) => {
    root.setAttribute('data-bs-theme', t);
    if (btnTheme) {
        btnTheme.innerHTML = t === 'dark'
            ? '<i class="bi bi-brightness-high"></i> Tema'
            : '<i class="bi bi-moon-stars"></i> Tema';
    }
};


const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved || 'light');


if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        const cur = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, cur);
        applyTheme(cur);
    });
}