'use strict';

const body = document.body;
const themeButtonEl = document.querySelector('[data-js-theme-btn]');

body.classList.remove('dark');

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.remove('dark');
}

function toggleDarkMode() {
    body.classList.toggle('dark');
    body.classList.toggle('light');

    const currentTheme = body.classList.contains('dark');

    if (currentTheme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light')
    }
}

themeButtonEl.addEventListener('click', toggleDarkMode);