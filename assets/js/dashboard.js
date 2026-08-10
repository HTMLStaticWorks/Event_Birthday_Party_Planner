/**
 * Catering Event & Birthday Party Planner
 * Dashboard JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
});

function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('show')) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // Auto-close sidebar when a nav pill tab is selected (mobile/tablet ≤ 991px)
    const navPillBtns = document.querySelectorAll('#v-pills-tab .nav-link');
    navPillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    });
}
