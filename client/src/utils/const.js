export const baseURL = process.env.REACT_APP_BASE_URL

export const tabsNavigationHeader = [
    { label: 'Bài viết', value: '/blogs' },
    { label: 'Giới thiệu', value: '/about' },
    { label: 'Liên hệ', value: '/contact' },
    { label: 'Sản phẩm', value: '/categories' }
]


export const getUser = (state) => state.auth.user.userInfo
