import page from './modules/page';

document.addEventListener('DOMContentLoaded', () => {
    page.loadTheme(page.getCurrentTheme());
    page.loadPage();
});