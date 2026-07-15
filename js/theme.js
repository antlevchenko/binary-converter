'use strict';

export { toggleDarkMode };

function toggleDarkMode(body) {
    body.classList.toggle('dark');
    body.classList.toggle('light');

    const currentTheme = body.classList.contains('dark');

    if (currentTheme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}