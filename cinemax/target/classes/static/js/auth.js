/* =====================================================
   CineMax — Authentication Service
   ===================================================== */

const AuthService = {
    _user: null,
    _token: null,

    init() {
        // Try to restore session from localStorage
        const savedToken = localStorage.getItem('cinemax_token');
        const savedUser = localStorage.getItem('cinemax_user');

        if (savedToken && savedUser) {
            this._token = savedToken;
            this._user = JSON.parse(savedUser);
            return true;
        }
        return false;
    },

    isLoggedIn() {
        return this._token !== null && this._user !== null;
    },

    getUser() {
        return this._user;
    },

    getToken() {
        return this._token;
    },

    setSession(token, user) {
        this._token = token;
        this._user = user;
        localStorage.setItem('cinemax_token', token);
        localStorage.setItem('cinemax_user', JSON.stringify(user));
    },

    clearSession() {
        this._token = null;
        this._user = null;
        localStorage.removeItem('cinemax_token');
        localStorage.removeItem('cinemax_user');
    },

    async login(email, password) {
        const result = await ApiService.login(email, password);
        this.setSession(result.token, result.user);
        return result.user;
    },

    async register(name, email, password) {
        const result = await ApiService.register(name, email, password);
        this.setSession(result.token, result.user);
        return result.user;
    },

    getPurchases() {
        const userId = this._user ? this._user.email : 'guest';
        const purchases = localStorage.getItem(`cinemax_purchases_${userId}`);
        return purchases ? JSON.parse(purchases) : [];
    },

    addPurchase(purchase) {
        if (!this._user) return;
        const purchases = this.getPurchases();
        purchases.push(purchase);
        localStorage.setItem(`cinemax_purchases_${this._user.email}`, JSON.stringify(purchases));
    },

    logout() {
        this.clearSession();
    }
};
