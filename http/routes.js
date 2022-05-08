export const $routes = {
    index: '/',
    register: '/register',
    login: '/login',
    profile: '/profile',
}

export const $apiRoutes = {
    transfer: 'transfer',
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