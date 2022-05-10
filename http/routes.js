export const $routes = {
    index: '/',
    register: '/register',
    registerRef: (ref='') => `/register?ref=${ref}`,
    login: '/login',
    profile: '/profile',
}

export const $apiRoutes = {
    transfer: 'transfer',
    users: 'users',
    start: (id) => `users/start/${id}`,
    login: 'login',
    cards: 'cards',
    register: 'register',
    ref: 'users/ref',
    refresh: 'refresh',
    logout: 'logout',
    changePassword: 'password',
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
}