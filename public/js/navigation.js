class NavigationManager {
    constructor() {
        this.currentView = 'dashboard';
        this.init();
    }

    init() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                if (view) {
                    this.switchView(view);
                }
            });
        });
    }

    switchView(view) {
        document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
        document.getElementById(`${view}-view`).style.display = 'block';

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-view') === view) {
                item.classList.add('active');
            }
        });

        this.currentView = view;
        if (view === 'stats') {
            statsManager.refreshStats();
        }
    }
}

const navigationManager = new NavigationManager();