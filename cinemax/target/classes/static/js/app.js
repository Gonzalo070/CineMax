/* =====================================================
   CineMax — Main Application Logic
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Initialize ----
    const app = new CineMaxApp();
    app.init();
});

class CineMaxApp {
    constructor() {
        this.movies = [];
        this.featuredMovies = [];
        this.currentHeroIndex = 0;
        this.heroInterval = null;
        this.selectedMovie = null;
        this.selectedDate = null;
        this.selectedShowtime = null;
        this.selectedSeats = new Set();
        this.occupiedSeats = new Set();
        this.ticketPrice = 0;
        this.currentPage = 'home';
        this.countdownInterval = null;

        // Cache DOM elements
        this.els = {
            // Navbar
            navbar: document.getElementById('navbar'),
            hamburger: document.getElementById('hamburger'),
            navLinks: document.getElementById('nav-links'),
            btnLoginNav: document.getElementById('btn-login-nav'),
            userMenu: document.getElementById('user-menu'),
            userInitial: document.getElementById('user-initial'),
            userNameDisplay: document.getElementById('user-name-display'),
            btnLogout: document.getElementById('btn-logout'),

            // Search
            searchToggle: document.getElementById('search-toggle'),
            searchOverlay: document.getElementById('search-overlay'),
            searchInput: document.getElementById('search-input'),
            searchClose: document.getElementById('search-close'),
            searchResults: document.getElementById('search-results'),

            // Theme
            themeToggle: document.getElementById('theme-toggle'),
            moonIcon: document.querySelector('.moon-icon'),
            sunIcon: document.querySelector('.sun-icon'),

            // Hero
            heroBg: document.getElementById('hero-bg'),
            heroTitle: document.getElementById('hero-title'),
            heroDescription: document.getElementById('hero-description'),
            heroMeta: document.getElementById('hero-meta'),
            heroBuyBtn: document.getElementById('hero-buy-btn'),
            heroDetailsBtn: document.getElementById('hero-details-btn'),
            heroIndicators: document.getElementById('hero-indicators'),

            // Movies Grid
            moviesGrid: document.getElementById('movies-grid'),
            genreFilters: document.getElementById('genre-filters'),

            // Modals
            movieModal: document.getElementById('movie-modal'),
            movieDetail: document.getElementById('movie-detail'),
            modalCloseMovie: document.getElementById('modal-close-movie'),

            loginModal: document.getElementById('login-modal'),
            loginForm: document.getElementById('login-form'),
            registerForm: document.getElementById('register-form'),
            formLogin: document.getElementById('form-login'),
            formRegister: document.getElementById('form-register'),
            modalCloseLogin: document.getElementById('modal-close-login'),
            showRegister: document.getElementById('show-register'),
            showLogin: document.getElementById('show-login'),

            purchaseModal: document.getElementById('purchase-modal'),
            modalClosePurchase: document.getElementById('modal-close-purchase'),
            purchaseMovieInfo: document.getElementById('purchase-movie-info'),
            showtimeDates: document.getElementById('showtime-dates'),
            showtimeList: document.getElementById('showtime-list'),
            btnNextSeats: document.getElementById('btn-next-seats'),
            seatsContainer: document.getElementById('seats-container'),
            seatsCount: document.getElementById('seats-count'),
            seatsTotal: document.getElementById('seats-total'),
            btnBackShowtime: document.getElementById('btn-back-showtime'),
            btnNextConfirm: document.getElementById('btn-next-confirm'),
            ticketCard: document.getElementById('ticket-card'),
            btnClosePurchase: document.getElementById('btn-close-purchase'),

            // History
            btnHistory: document.getElementById('btn-history'),
            historyModal: document.getElementById('history-modal'),
            modalCloseHistory: document.getElementById('modal-close-history'),
            historyList: document.getElementById('history-list'),

            // Toast
            toastContainer: document.getElementById('toast-container'),

            // Password toggles
            toggleLoginPass: document.getElementById('toggle-login-pass'),
            toggleRegisterPass: document.getElementById('toggle-register-pass'),

            // Sections / Pages
            heroSection: document.getElementById('hero-section'),
            sectionCartelera: document.getElementById('section-cartelera'),
            sectionComingSoon: document.getElementById('section-coming-soon'),
            sectionPromos: document.getElementById('section-promos'),
            promoBannerHome: document.getElementById('promo-banner-home'),
            comingSoonGrid: document.getElementById('coming-soon-grid'),
            promosGrid: document.getElementById('promos-grid'),
            promoFilters: document.getElementById('promo-filters'),
            promoCta: document.getElementById('promo-cta'),
        };
    }

    async init() {
        // Theme
        this.initTheme();

        // Restore auth session
        const isLoggedIn = AuthService.init();
        this.updateAuthUI(isLoggedIn);

        // Load movies
        this.movies = await ApiService.getMovies();
        this.featuredMovies = this.movies.filter(m => m.featured);

        // Render
        this.renderHero();
        this.renderMoviesGrid(this.movies);
        this.startHeroRotation();

        // Bind events
        this.bindEvents();

        // Pre-render coming soon and promos
        this.renderComingSoon();
        this.renderPromos();
    }

    // ===================== THEME =====================
    initTheme() {
        const savedTheme = localStorage.getItem('cinemax_theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            this.setTheme(prefersLight ? 'light' : 'dark');
        }
    }

    setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.els.moonIcon.classList.remove('hidden');
            this.els.sunIcon.classList.add('hidden');
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.els.moonIcon.classList.add('hidden');
            this.els.sunIcon.classList.remove('hidden');
        }
        localStorage.setItem('cinemax_theme', theme);
    }

    toggleTheme() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        this.setTheme(isLight ? 'dark' : 'light');
    }

    // ===================== AUTH UI =====================
    updateAuthUI(isLoggedIn) {
        if (isLoggedIn) {
            const user = AuthService.getUser();
            this.els.btnLoginNav.classList.add('hidden');
            this.els.userMenu.classList.remove('hidden');
            this.els.userInitial.textContent = user.name.charAt(0).toUpperCase();
            this.els.userNameDisplay.textContent = user.name;
        } else {
            this.els.btnLoginNav.classList.remove('hidden');
            this.els.userMenu.classList.add('hidden');
        }
    }

    // ===================== HERO =====================
    renderHero() {
        if (this.featuredMovies.length === 0) return;

        // Create indicators
        this.els.heroIndicators.innerHTML = this.featuredMovies.map((_, i) =>
            `<div class="hero-indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');

        this.updateHero(0);
    }

    updateHero(index) {
        const movie = this.featuredMovies[index];
        if (!movie) return;

        this.currentHeroIndex = index;

        // Background
        if (movie.backdrop) {
            this.els.heroBg.style.background = `url('${movie.backdrop}') center/cover no-repeat`;
        } else {
            this.els.heroBg.style.background = BACKDROP_GRADIENTS[movie.id - 1] || BACKDROP_GRADIENTS[0];
        }

        // Content
        this.els.heroTitle.textContent = movie.title;
        this.els.heroDescription.textContent = movie.description;

        // Meta
        this.els.heroMeta.innerHTML = `
            <div class="meta-item">
                <span class="meta-icon">⭐</span>
                <span class="rating">${movie.rating}/10</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">🕐</span>
                <span>${movie.duration} min</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">🎬</span>
                <span>${movie.genreLabels.join(', ')}</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">📋</span>
                <span>${movie.classification}</span>
            </div>
        `;

        // Update indicators
        document.querySelectorAll('.hero-indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });

        // Store movie reference for buttons
        this.els.heroBuyBtn.dataset.movieId = movie.id;
        this.els.heroDetailsBtn.dataset.movieId = movie.id;
    }

    startHeroRotation() {
        this.heroInterval = setInterval(() => {
            const nextIndex = (this.currentHeroIndex + 1) % this.featuredMovies.length;
            this.updateHero(nextIndex);
        }, 6000);
    }

    stopHeroRotation() {
        clearInterval(this.heroInterval);
    }

    // ===================== MOVIES GRID =====================
    renderMoviesGrid(movies) {
        this.els.moviesGrid.innerHTML = movies.map((movie, index) => `
            <div class="movie-card" data-movie-id="${movie.id}" style="animation-delay: ${index * 0.05}s">
                <div class="movie-card-poster">
                    ${movie.poster
                        ? `<img src="${movie.poster}" alt="${movie.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
                        : `<div style="width:100%;height:100%;background:${POSTER_GRADIENTS[movie.id - 1] || POSTER_GRADIENTS[0]};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                            <span style="font-size:3rem;">🎬</span>
                            <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);text-align:center;padding:0 8px;">${movie.title}</span>
                        </div>`
                    }
                    ${movie.badge ? `<span class="movie-card-badge">${movie.badge}</span>` : ''}
                    <div class="movie-card-rating">⭐ ${movie.rating}</div>
                    <div class="movie-card-overlay">
                        <div class="movie-card-actions">
                            <button class="btn-primary btn-buy-card" data-movie-id="${movie.id}">Comprar</button>
                            <button class="btn-outline btn-details-card" data-movie-id="${movie.id}">Info</button>
                        </div>
                    </div>
                </div>
                <div class="movie-card-info">
                    <h3 class="movie-card-title">${movie.title}</h3>
                    <div class="movie-card-meta">
                        <span>${movie.genreLabels[0]}</span>
                        <span class="dot"></span>
                        <span>${movie.duration} min</span>
                        <span class="dot"></span>
                        <span>${movie.classification}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterMovies(genre) {
        if (genre === 'all') {
            this.renderMoviesGrid(this.movies);
        } else {
            const filtered = this.movies.filter(m => m.genre.includes(genre));
            this.renderMoviesGrid(filtered);
        }
    }

    // ===================== PAGE NAVIGATION =====================
    navigateTo(page) {
        this.currentPage = page;

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Pages config
        const sections = {
            home: [this.els.heroSection, this.els.sectionCartelera, this.els.promoBannerHome],
            'coming-soon': [this.els.sectionComingSoon],
            promos: [this.els.sectionPromos]
        };

        // Hide all
        Object.values(sections).flat().forEach(el => {
            if (el) el.classList.add('hidden');
        });

        // Show current page's sections
        (sections[page] || []).forEach(el => {
            if (el) el.classList.remove('hidden');
        });

        // Manage hero rotation
        if (page === 'home') {
            this.startHeroRotation();
        } else {
            this.stopHeroRotation();
        }

        // Start/stop countdown for coming soon
        if (page === 'coming-soon') {
            this.startCountdowns();
        } else {
            this.stopCountdowns();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Force navbar background on non-home pages
        if (page !== 'home') {
            this.els.navbar.classList.add('scrolled');
        }
    }

    // ===================== COMING SOON =====================
    renderComingSoon() {
        this.els.comingSoonGrid.innerHTML = COMING_SOON_DATA.map((movie, index) => `
            <div class="coming-soon-card" data-release="${movie.releaseDate}" style="animation-delay: ${index * 0.08}s">
                <div class="cs-card-poster">
                    ${movie.poster
                        ? `<img src="${movie.poster}" alt="${movie.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">`
                        : `<div style="width:100%;height:100%;background:${COMING_SOON_GRADIENTS[index % COMING_SOON_GRADIENTS.length]};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;">
                            <span style="font-size:3.5rem;">🎬</span>
                            <span style="font-size:0.8rem;color:rgba(255,255,255,0.5);text-align:center;padding:0 12px;">${movie.title}</span>
                        </div>`
                    }
                    <div class="cs-card-countdown" data-release="${movie.releaseDate}">
                        <div class="countdown-label">Estrena en</div>
                        <div class="countdown-timer">
                            <div class="countdown-block">
                                <span class="countdown-num" data-days>--</span>
                                <span class="countdown-unit">días</span>
                            </div>
                            <span class="countdown-sep">:</span>
                            <div class="countdown-block">
                                <span class="countdown-num" data-hours>--</span>
                                <span class="countdown-unit">hs</span>
                            </div>
                            <span class="countdown-sep">:</span>
                            <div class="countdown-block">
                                <span class="countdown-num" data-mins>--</span>
                                <span class="countdown-unit">min</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cs-card-info">
                    <div class="cs-card-genres">
                        ${movie.genreLabels.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                    </div>
                    <h3 class="cs-card-title">${movie.title}</h3>
                    <p class="cs-card-description">${movie.description}</p>
                    <div class="cs-card-meta">
                        <span>🕐 ${movie.duration} min</span>
                        <span class="dot"></span>
                        <span>📋 ${movie.classification}</span>
                        <span class="dot"></span>
                        <span>🎬 ${movie.director}</span>
                    </div>
                    <div class="cs-card-release">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span>Estreno: ${new Date(movie.releaseDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    startCountdowns() {
        this.updateCountdowns();
        this.countdownInterval = setInterval(() => this.updateCountdowns(), 60000);
    }

    stopCountdowns() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    updateCountdowns() {
        document.querySelectorAll('.cs-card-countdown').forEach(el => {
            const release = new Date(el.dataset.release);
            const now = new Date();
            const diff = release - now;

            if (diff <= 0) {
                el.querySelector('[data-days]').textContent = '0';
                el.querySelector('[data-hours]').textContent = '0';
                el.querySelector('[data-mins]').textContent = '0';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            el.querySelector('[data-days]').textContent = days;
            el.querySelector('[data-hours]').textContent = hours;
            el.querySelector('[data-mins]').textContent = mins;
        });
    }

    // ===================== PROMOS =====================
    renderPromos(filterType = 'all') {
        const filtered = filterType === 'all'
            ? PROMOS_DATA
            : PROMOS_DATA.filter(p => p.type === filterType);

        this.els.promosGrid.innerHTML = filtered.map((promo, index) => `
            <div class="promo-card" data-promo-id="${promo.id}" style="animation-delay: ${index * 0.06}s">
                <div class="promo-card-header" style="background:${promo.gradient}">
                    <div class="promo-card-logo">
                        <span>${promo.logo}</span>
                    </div>
                    <div class="promo-card-discount">${promo.discount}</div>
                    <div class="promo-card-company">${promo.company}</div>
                    <div class="promo-card-badge-wrapper">
                        <span class="promo-card-type-badge">${promo.type === 'telecom' ? '📱 Compañía' : '💳 Billetera'}</span>
                    </div>
                </div>
                <div class="promo-card-body">
                    <div class="promo-card-day-badge" style="background:${promo.colorLight};color:${promo.color};border:1px solid ${promo.colorBorder}">${promo.badge}</div>
                    <h3 class="promo-card-title">${promo.title}</h3>
                    <p class="promo-card-desc">${promo.description}</p>
                    <div class="promo-card-conditions">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        <span>${promo.conditions}</span>
                    </div>
                    <div class="promo-card-footer">
                        <div class="promo-card-valid">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <span>Válido hasta ${new Date(promo.validUntil).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <button class="btn-promo-use" style="background:${promo.gradient}">Usar Promo</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterPromos(type) {
        this.renderPromos(type);
    }

    // ===================== SEARCH =====================
    openSearch() {
        this.els.searchOverlay.classList.remove('hidden');
        setTimeout(() => this.els.searchInput.focus(), 100);
        document.body.style.overflow = 'hidden';
    }

    closeSearch() {
        this.els.searchOverlay.classList.add('hidden');
        this.els.searchInput.value = '';
        this.els.searchResults.innerHTML = '';
        document.body.style.overflow = '';
    }

    performSearch(query) {
        if (!query.trim()) {
            this.els.searchResults.innerHTML = '';
            return;
        }

        const results = this.movies.filter(m =>
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.genreLabels.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
            m.director.toLowerCase().includes(query.toLowerCase())
        );

        this.els.searchResults.innerHTML = results.length > 0
            ? results.map(movie => `
                <div class="search-result-item" data-movie-id="${movie.id}">
                    <div class="search-result-poster" style="background:${POSTER_GRADIENTS[movie.id - 1]};overflow:hidden;">
                        ${movie.poster
                            ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;object-fit:cover;">`
                            : `<span style="font-size:1.5rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">🎬</span>`
                        }
                    </div>
                    <div class="search-result-info">
                        <h4>${movie.title}</h4>
                        <p>${movie.genreLabels.join(', ')} · ${movie.duration} min · ⭐ ${movie.rating}</p>
                    </div>
                </div>
            `).join('')
            : '<p style="text-align:center;color:var(--text-muted);padding:var(--space-xl);">No se encontraron resultados</p>';
    }

    // ===================== MOVIE DETAIL =====================
    showMovieDetail(movieId) {
        const movie = this.movies.find(m => m.id === movieId);
        if (!movie) return;

        this.selectedMovie = movie;

        this.els.movieDetail.innerHTML = `
            <div class="movie-detail-poster">
                ${movie.poster
                    ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;min-height:400px;object-fit:cover;">`
                    : `<div style="width:100%;height:100%;min-height:400px;background:${POSTER_GRADIENTS[movie.id - 1]};display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;">
                        <span style="font-size:5rem;">🎬</span>
                        <span style="font-size:0.9rem;color:rgba(255,255,255,0.6);">${movie.title}</span>
                    </div>`
                }
            </div>
            <div class="movie-detail-content">
                <div class="movie-detail-genre">
                    ${movie.genreLabels.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
                <h2>${movie.title}</h2>
                <div class="movie-detail-meta">
                    <span class="detail-rating">⭐ ${movie.rating}/10</span>
                    <span>🕐 ${movie.duration} min</span>
                    <span>📋 ${movie.classification}</span>
                </div>
                <p class="movie-detail-description">${movie.description}</p>
                <div class="movie-detail-info">
                    <div class="detail-info-item">
                        <span class="label">Director</span>
                        <span class="value">${movie.director}</span>
                    </div>
                    <div class="detail-info-item">
                        <span class="label">Elenco</span>
                        <span class="value">${movie.cast}</span>
                    </div>
                    <div class="detail-info-item">
                        <span class="label">Estreno</span>
                        <span class="value">${new Date(movie.releaseDate).toLocaleDateString('es-AR')}</span>
                    </div>
                    <div class="detail-info-item">
                        <span class="label">Duración</span>
                        <span class="value">${Math.floor(movie.duration / 60)}h ${movie.duration % 60}min</span>
                    </div>
                </div>
                <div class="movie-detail-price">
                    <span class="price-label">Precio entrada general</span>
                    <span class="price-value">$${movie.price.toLocaleString('es-AR')}</span>
                </div>
                <button class="btn-primary btn-full btn-buy-detail" data-movie-id="${movie.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20"/><path d="M17 2v20"/><path d="M2 12h20"/><path d="M2 7h5"/><path d="M2 17h5"/><path d="M17 17h5"/><path d="M17 7h5"/></svg>
                    Comprar Entrada
                </button>
            </div>
        `;

        this.els.movieModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeMovieDetail() {
        this.els.movieModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // ===================== AUTH MODALS =====================
    openLoginModal(reason = null) {
        this.els.loginModal.classList.remove('hidden');
        this.els.loginForm.classList.remove('hidden');
        this.els.registerForm.classList.add('hidden');
        document.body.style.overflow = 'hidden';

        if (reason === 'purchase') {
            this._pendingPurchase = true;
        }
    }

    closeLoginModal() {
        this.els.loginModal.classList.add('hidden');
        document.body.style.overflow = '';
        this.clearFormErrors();
    }

    showRegisterForm() {
        this.els.loginForm.classList.add('hidden');
        this.els.registerForm.classList.remove('hidden');
        this.clearFormErrors();
    }

    showLoginForm() {
        this.els.registerForm.classList.add('hidden');
        this.els.loginForm.classList.remove('hidden');
        this.clearFormErrors();
    }

    clearFormErrors() {
        document.querySelectorAll('.input-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-wrapper').forEach(el => el.style.borderColor = '');
    }

    async handleLogin(e) {
        e.preventDefault();
        this.clearFormErrors();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Validate
        let hasError = false;
        if (!email || !this.isValidEmail(email)) {
            document.getElementById('login-email-error').textContent = 'Ingresá un email válido';
            hasError = true;
        }
        if (!password || password.length < 6) {
            document.getElementById('login-password-error').textContent = 'La contraseña debe tener al menos 6 caracteres';
            hasError = true;
        }
        if (hasError) return;

        const btn = document.getElementById('btn-submit-login');
        btn.classList.add('btn-loading');

        try {
            await AuthService.login(email, password);
            this.updateAuthUI(true);
            this.closeLoginModal();
            this.showToast('success', '¡Bienvenido!', `Sesión iniciada como ${AuthService.getUser().name}`);

            // If there was a pending purchase, continue
            if (this._pendingPurchase && this.selectedMovie) {
                this._pendingPurchase = false;
                setTimeout(() => this.openPurchaseFlow(this.selectedMovie.id), 400);
            }
        } catch (error) {
            const msg = error.message || 'Email o contraseña incorrectos';
            document.getElementById('login-email-error').textContent = msg;
            this.showToast('error', 'Error', msg);
        } finally {
            btn.classList.remove('btn-loading');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        this.clearFormErrors();

        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        // Validate
        let hasError = false;
        if (!name || name.length < 2) {
            document.getElementById('register-name-error').textContent = 'Ingresá tu nombre';
            hasError = true;
        }
        if (!email || !this.isValidEmail(email)) {
            document.getElementById('register-email-error').textContent = 'Ingresá un email válido';
            hasError = true;
        }
        if (!password || password.length < 6) {
            document.getElementById('register-password-error').textContent = 'La contraseña debe tener al menos 6 caracteres';
            hasError = true;
        }
        if (hasError) return;

        const btn = document.getElementById('btn-submit-register');
        btn.classList.add('btn-loading');

        try {
            await AuthService.register(name, email, password);
            this.updateAuthUI(true);
            this.closeLoginModal();
            this.showToast('success', '¡Cuenta creada!', `Bienvenido a CineMax, ${name}`);

            if (this._pendingPurchase && this.selectedMovie) {
                this._pendingPurchase = false;
                setTimeout(() => this.openPurchaseFlow(this.selectedMovie.id), 400);
            }
        } catch (error) {
            const msg = error.message || 'No se pudo crear la cuenta';
            if (msg.toLowerCase().includes('email')) {
                document.getElementById('register-email-error').textContent = msg;
            }
            this.showToast('error', 'Error', msg);
        } finally {
            btn.classList.remove('btn-loading');
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ===================== PURCHASE FLOW =====================
    openPurchaseFlow(movieId) {
        const movie = this.movies.find(m => m.id === movieId);
        if (!movie) return;

        // Check if logged in
        if (!AuthService.isLoggedIn()) {
            this.selectedMovie = movie;
            this.openLoginModal('purchase');
            this.showToast('info', 'Inicio de sesión requerido', 'Necesitás iniciar sesión para comprar entradas');
            return;
        }

        this.selectedMovie = movie;
        this.ticketPrice = movie.price;
        this.selectedSeats.clear();
        this.selectedDate = null;
        this.selectedShowtime = null;

        // Close movie detail modal if open
        this.closeMovieDetail();

        // Set movie info
        this.els.purchaseMovieInfo.innerHTML = `
            <div style="width:60px;height:85px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;background:${POSTER_GRADIENTS[movie.id - 1]};">
                ${movie.poster
                    ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;object-fit:cover;">`
                    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><span style="font-size:2rem;">🎬</span></div>`
                }
            </div>
            <div>
                <h4>${movie.title}</h4>
                <p>${movie.genreLabels.join(', ')} · ${movie.duration} min · ${movie.classification}</p>
            </div>
        `;

        // Generate showtimes
        const showtimes = generateShowtimes();
        this.showtimes = showtimes;

        // Render dates
        const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
        const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

        this.els.showtimeDates.innerHTML = showtimes.map((st, i) => `
            <div class="showtime-date ${i === 0 ? 'active' : ''}" data-date-index="${i}">
                <span class="day-name">${dayNames[st.date.getDay()]}</span>
                <span class="day-num">${st.date.getDate()}</span>
                <span class="month">${monthNames[st.date.getMonth()]}</span>
            </div>
        `).join('');

        // Show first date's showtimes
        this.renderShowtimeSlots(0);

        // Reset steps
        this.showPurchaseStep('step-showtime');

        // Open modal
        this.els.purchaseModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    renderShowtimeSlots(dateIndex) {
        const shows = this.showtimes[dateIndex].shows;
        this.els.showtimeList.innerHTML = shows.map((show, i) => `
            <button class="showtime-slot" data-show-index="${i}" data-date-index="${dateIndex}">
                ${show.time}
                <span class="slot-format">${show.format}</span>
            </button>
        `).join('');
    }

    showPurchaseStep(stepId) {
        document.querySelectorAll('.purchase-step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(stepId).classList.add('active');
    }

    renderSeats() {
        this.occupiedSeats = generateOccupiedSeats();
        const rows = 'ABCDEFGH'.split('');
        const cols = 12;

        this.els.seatsContainer.innerHTML = rows.map((row, ri) => `
            <div class="seat-row">
                <span class="seat-row-label">${row}</span>
                ${Array.from({ length: cols }, (_, ci) => {
                    const seatId = `${ri}-${ci}`;
                    const isOccupied = this.occupiedSeats.has(seatId);
                    return `<div class="seat ${isOccupied ? 'occupied' : ''}" data-seat="${seatId}" data-row="${row}" data-col="${ci + 1}" title="${row}${ci + 1}"></div>`;
                }).join('')}
                <span class="seat-row-label">${row}</span>
            </div>
        `).join('');
    }

    toggleSeat(seatEl) {
        const seatId = seatEl.dataset.seat;
        if (seatEl.classList.contains('occupied')) return;

        if (this.selectedSeats.has(seatId)) {
            this.selectedSeats.delete(seatId);
            seatEl.classList.remove('selected');
        } else {
            if (this.selectedSeats.size >= 10) {
                this.showToast('error', 'Límite alcanzado', 'Podés seleccionar hasta 10 butacas');
                return;
            }
            this.selectedSeats.add(seatId);
            seatEl.classList.add('selected', 'just-selected');
            setTimeout(() => seatEl.classList.remove('just-selected'), 300);
        }

        this.updateSeatsInfo();
    }

    updateSeatsInfo() {
        const count = this.selectedSeats.size;
        const total = count * this.ticketPrice;

        this.els.seatsCount.textContent = `${count} butaca${count !== 1 ? 's' : ''} seleccionada${count !== 1 ? 's' : ''}`;
        this.els.seatsTotal.textContent = `$${total.toLocaleString('es-AR')}`;
        this.els.btnNextConfirm.disabled = count === 0;
    }

    async confirmPurchase() {
        if (this.selectedSeats.size === 0) return;

        const btn = this.els.btnNextConfirm;
        btn.classList.add('btn-loading');

        try {
            const seatLabels = [...this.selectedSeats].map(s => {
                const [r, c] = s.split('-');
                return `${'ABCDEFGH'[r]}${parseInt(c) + 1}`;
            });

            await ApiService.purchaseTicket(
                this.selectedMovie.id,
                this.selectedShowtime,
                seatLabels
            );

            // Show ticket
            const movie = this.selectedMovie;
            const total = this.selectedSeats.size * this.ticketPrice;
            const dateStr = this.showtimes[this.selectedDate].date.toLocaleDateString('es-AR', {
                weekday: 'long', day: 'numeric', month: 'long'
            });

            const physicalCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            
            // Save to history
            AuthService.addPurchase({
                movieId: movie.id,
                title: movie.title,
                poster: movie.poster,
                date: dateStr,
                time: this.selectedShowtime.time,
                seats: seatLabels,
                total: total,
                code: physicalCode,
                purchasedAt: new Date().toISOString()
            });

            this.els.ticketCard.innerHTML = `
                <div class="ticket-header">
                    <div style="width:50px;height:70px;border-radius:var(--radius-sm);overflow:hidden;background:${POSTER_GRADIENTS[movie.id - 1]};">
                        ${movie.poster
                            ? `<img src="${movie.poster}" alt="${movie.title}" style="width:100%;height:100%;object-fit:cover;">`
                            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><span style="font-size:1.5rem;">🎬</span></div>`
                        }
                    </div>
                    <div>
                        <h4>${movie.title}</h4>
                        <p>${movie.genreLabels.join(', ')}</p>
                    </div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-detail-item">
                        <span class="label">Fecha</span>
                        <span class="value">${dateStr}</span>
                    </div>
                    <div class="ticket-detail-item">
                        <span class="label">Hora</span>
                        <span class="value">${this.selectedShowtime.time} (${this.selectedShowtime.format})</span>
                    </div>
                    <div class="ticket-detail-item">
                        <span class="label">Butacas</span>
                        <span class="value">${seatLabels.join(', ')}</span>
                    </div>
                    <div class="ticket-detail-item">
                        <span class="label">Total</span>
                        <span class="value" style="color:var(--bordo-300);">$${total.toLocaleString('es-AR')}</span>
                    </div>
                    <div class="ticket-detail-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);">
                        <span class="label">Código de Retiro</span>
                        <span class="value" style="font-family: monospace; font-size: 1.2rem; font-weight: bold; letter-spacing: 2px;">${physicalCode}</span>
                    </div>
                </div>
            `;

            this.showPurchaseStep('step-confirm');
            this.showToast('success', '¡Compra exitosa!', 'Tus entradas fueron reservadas');
        } catch (error) {
            this.showToast('error', 'Error', 'No se pudo completar la compra');
        } finally {
            btn.classList.remove('btn-loading');
        }
    }

    closePurchaseModal() {
        this.els.purchaseModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    renderHistory() {
        const purchases = AuthService.getPurchases();
        if (purchases.length === 0) {
            this.els.historyList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No tenés compras recientes.</p>';
            return;
        }

        this.els.historyList.innerHTML = purchases.sort((a,b) => new Date(b.purchasedAt) - new Date(a.purchasedAt)).map(p => `
            <div style="background: var(--bg-elevated); padding: 1rem; border-radius: var(--radius-md); display: flex; gap: 1rem; align-items: center;">
                <div style="width: 50px; height: 70px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0;">
                    ${p.poster ? `<img src="${p.poster}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">` : `<div style="width:100%;height:100%;background:var(--bg-card);display:flex;align-items:center;justify-content:center;">🎬</div>`}
                </div>
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.25rem;">${p.title}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem;">${p.date} - ${p.time}</p>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Butacas: ${p.seats.join(', ')}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Código de retiro</div>
                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: bold; color: var(--accent-primary); letter-spacing: 1px;">${p.code}</div>
                </div>
            </div>
        `).join('');
    }

    // ===================== TOASTS =====================
    showToast(type, title, message) {
        const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <div class="toast-message">
                <strong>${title}</strong>
                <span>${message}</span>
            </div>
            <button class="toast-close" aria-label="Cerrar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => this.removeToast(toast));
        this.els.toastContainer.appendChild(toast);

        // Auto-remove after 4s
        setTimeout(() => this.removeToast(toast), 4000);
    }

    removeToast(toast) {
        if (!toast.parentNode) return;
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }

    // ===================== EVENT BINDINGS =====================
    bindEvents() {
        // --- Navbar scroll ---
        window.addEventListener('scroll', () => {
            this.els.navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // --- Hamburger ---
        this.els.hamburger.addEventListener('click', () => {
            this.els.hamburger.classList.toggle('open');
            this.els.navLinks.classList.toggle('open');
        });

        // --- Page Navigation ---
        document.querySelectorAll('.nav-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
                // Close mobile menu
                this.els.hamburger.classList.remove('open');
                this.els.navLinks.classList.remove('open');
            });
        });

        // --- Promo CTA (home banner -> promos page) ---
        if (this.els.promoCta) {
            this.els.promoCta.addEventListener('click', () => {
                this.navigateTo('promos');
            });
        }

        // --- Promo Filters ---
        if (this.els.promoFilters) {
            this.els.promoFilters.addEventListener('click', (e) => {
                const tab = e.target.closest('.filter-tab');
                if (tab) {
                    this.els.promoFilters.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.filterPromos(tab.dataset.promoType);
                }
            });
        }

        // --- Promo Card "Usar Promo" button ---
        if (this.els.promosGrid) {
            this.els.promosGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-promo-use');
                if (btn) {
                    const card = btn.closest('.promo-card');
                    const promoId = parseInt(card.dataset.promoId);
                    const promo = PROMOS_DATA.find(p => p.id === promoId);
                    if (promo) {
                        this.showToast('success', `Promo ${promo.company}`, `¡Mostrá esta pantalla en la boletería para usar tu descuento de ${promo.discount}!`);
                    }
                }
            });
        }

        // --- Footer Navigation Links ---
        document.querySelectorAll('.footer-nav-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
            });
        });

        // --- Theme Toggle ---
        if (this.els.themeToggle) {
            this.els.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // --- Search ---
        this.els.searchToggle.addEventListener('click', () => this.openSearch());
        this.els.searchClose.addEventListener('click', () => this.closeSearch());
        this.els.searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        this.els.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.els.searchOverlay) this.closeSearch();
        });

        // Search results click
        this.els.searchResults.addEventListener('click', (e) => {
            const item = e.target.closest('.search-result-item');
            if (item) {
                this.closeSearch();
                this.showMovieDetail(parseInt(item.dataset.movieId));
            }
        });

        // --- Hero ---
        this.els.heroIndicators.addEventListener('click', (e) => {
            const indicator = e.target.closest('.hero-indicator');
            if (indicator) {
                this.stopHeroRotation();
                this.updateHero(parseInt(indicator.dataset.index));
                this.startHeroRotation();
            }
        });

        this.els.heroBuyBtn.addEventListener('click', () => {
            const movieId = parseInt(this.els.heroBuyBtn.dataset.movieId);
            this.selectedMovie = this.movies.find(m => m.id === movieId);
            this.openPurchaseFlow(movieId);
        });

        this.els.heroDetailsBtn.addEventListener('click', () => {
            const movieId = parseInt(this.els.heroDetailsBtn.dataset.movieId);
            this.showMovieDetail(movieId);
        });

        // --- Genre Filters ---
        this.els.genreFilters.addEventListener('click', (e) => {
            const tab = e.target.closest('.filter-tab');
            if (tab) {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterMovies(tab.dataset.genre);
            }
        });

        // --- Movie Cards (delegated) ---
        this.els.moviesGrid.addEventListener('click', (e) => {
            const buyBtn = e.target.closest('.btn-buy-card');
            const detailBtn = e.target.closest('.btn-details-card');
            const card = e.target.closest('.movie-card');

            if (buyBtn) {
                e.stopPropagation();
                const movieId = parseInt(buyBtn.dataset.movieId);
                this.selectedMovie = this.movies.find(m => m.id === movieId);
                this.openPurchaseFlow(movieId);
            } else if (detailBtn) {
                e.stopPropagation();
                this.showMovieDetail(parseInt(detailBtn.dataset.movieId));
            } else if (card) {
                this.showMovieDetail(parseInt(card.dataset.movieId));
            }
        });

        // --- Movie Detail Modal ---
        this.els.modalCloseMovie.addEventListener('click', () => this.closeMovieDetail());
        this.els.movieModal.addEventListener('click', (e) => {
            if (e.target === this.els.movieModal) this.closeMovieDetail();
        });

        // Buy from detail modal (delegated)
        this.els.movieDetail.addEventListener('click', (e) => {
            const buyBtn = e.target.closest('.btn-buy-detail');
            if (buyBtn) {
                const movieId = parseInt(buyBtn.dataset.movieId);
                this.selectedMovie = this.movies.find(m => m.id === movieId);
                this.openPurchaseFlow(movieId);
            }
        });

        // --- Login Modal ---
        this.els.btnLoginNav.addEventListener('click', () => this.openLoginModal());
        this.els.modalCloseLogin.addEventListener('click', () => this.closeLoginModal());
        this.els.loginModal.addEventListener('click', (e) => {
            if (e.target === this.els.loginModal) this.closeLoginModal();
        });
        this.els.showRegister.addEventListener('click', (e) => { e.preventDefault(); this.showRegisterForm(); });
        this.els.showLogin.addEventListener('click', (e) => { e.preventDefault(); this.showLoginForm(); });
        this.els.formLogin.addEventListener('submit', (e) => this.handleLogin(e));
        this.els.formRegister.addEventListener('submit', (e) => this.handleRegister(e));

        // Password toggles
        this.els.toggleLoginPass.addEventListener('click', () => {
            const input = document.getElementById('login-password');
            input.type = input.type === 'password' ? 'text' : 'password';
        });
        this.els.toggleRegisterPass.addEventListener('click', () => {
            const input = document.getElementById('register-password');
            input.type = input.type === 'password' ? 'text' : 'password';
        });

        // --- Logout ---
        this.els.btnLogout.addEventListener('click', () => {
            AuthService.logout();
            this.updateAuthUI(false);
            this.showToast('info', 'Sesión cerrada', 'Hasta pronto 👋');
        });

        // --- History Modal ---
        if (this.els.btnHistory) {
            this.els.btnHistory.addEventListener('click', () => {
                this.renderHistory();
                this.els.historyModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }
        if (this.els.modalCloseHistory) {
            this.els.modalCloseHistory.addEventListener('click', () => {
                this.els.historyModal.classList.add('hidden');
                document.body.style.overflow = '';
            });
        }
        if (this.els.historyModal) {
            this.els.historyModal.addEventListener('click', (e) => {
                if (e.target === this.els.historyModal) {
                    this.els.historyModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }

        // --- Purchase Modal ---
        this.els.modalClosePurchase.addEventListener('click', () => this.closePurchaseModal());
        this.els.purchaseModal.addEventListener('click', (e) => {
            if (e.target === this.els.purchaseModal) this.closePurchaseModal();
        });

        // Date selection
        this.els.showtimeDates.addEventListener('click', (e) => {
            const dateBtn = e.target.closest('.showtime-date');
            if (dateBtn) {
                document.querySelectorAll('.showtime-date').forEach(d => d.classList.remove('active'));
                dateBtn.classList.add('active');
                const dateIndex = parseInt(dateBtn.dataset.dateIndex);
                this.selectedDate = dateIndex;
                this.renderShowtimeSlots(dateIndex);
                this.selectedShowtime = null;
                this.els.btnNextSeats.disabled = true;
            }
        });

        // Showtime selection
        this.els.showtimeList.addEventListener('click', (e) => {
            const slot = e.target.closest('.showtime-slot');
            if (slot) {
                document.querySelectorAll('.showtime-slot').forEach(s => s.classList.remove('active'));
                slot.classList.add('active');
                const dateIndex = parseInt(slot.dataset.dateIndex);
                const showIndex = parseInt(slot.dataset.showIndex);
                this.selectedDate = dateIndex;
                this.selectedShowtime = this.showtimes[dateIndex].shows[showIndex];
                this.els.btnNextSeats.disabled = false;
            }
        });

        // Next to seats
        this.els.btnNextSeats.addEventListener('click', () => {
            if (!this.selectedShowtime) return;
            this.renderSeats();
            this.updateSeatsInfo();
            this.showPurchaseStep('step-seats');
        });

        // Back to showtime
        this.els.btnBackShowtime.addEventListener('click', () => {
            this.selectedSeats.clear();
            this.showPurchaseStep('step-showtime');
        });

        // Seat selection
        this.els.seatsContainer.addEventListener('click', (e) => {
            const seat = e.target.closest('.seat');
            if (seat) this.toggleSeat(seat);
        });

        // Confirm purchase
        this.els.btnNextConfirm.addEventListener('click', () => this.confirmPurchase());

        // Close purchase
        this.els.btnClosePurchase.addEventListener('click', () => this.closePurchaseModal());

        // --- Keyboard ---
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!this.els.searchOverlay.classList.contains('hidden')) this.closeSearch();
                if (!this.els.movieModal.classList.contains('hidden')) this.closeMovieDetail();
                if (!this.els.loginModal.classList.contains('hidden')) this.closeLoginModal();
                if (!this.els.purchaseModal.classList.contains('hidden')) this.closePurchaseModal();
                if (this.els.historyModal && !this.els.historyModal.classList.contains('hidden')) {
                    this.els.historyModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }
        });
    }
}
