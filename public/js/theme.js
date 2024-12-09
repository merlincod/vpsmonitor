class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
        if (window.chartManager) {
            window.chartManager.updateChartTheme(this.theme);
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        if (window.chartManager) {
            window.chartManager.updateChartTheme(this.theme);
        }
    }

    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
}

const themeManager = new ThemeManager();