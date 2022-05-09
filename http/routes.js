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
    login: 'login',
    register: 'register',
    refresh: 'refresh',
    logout: 'logout',
    changePassword: 'password',
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
    products: {
        list: 'shops/{shop_id}/products',
        update: (id) => `shops/{shop_id}/products/${id}`,
        get: (id) => `shops/{shop_id}/products/${id}`
    },
    orders: {
        create: 'shops/{shop_id}/orders',
        get: (id) => `shops/{shop_id}/orders/${id}`
    },
    shops: {
        create: 'shops',
    }
}