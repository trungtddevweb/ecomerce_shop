import routes from "./routes"

export const baseURL = process.env.REACT_APP_BASE_URL

export const tabsNavigationHeader = [
    { label: 'Trang chủ', value: '/' },
    { label: 'Bài viết', value: '/blogs' },
    { label: 'Giới thiệu', value: '/about' },
    { label: 'Liên hệ', value: '/contact' },
    { label: 'Sản phẩm', value: '/categories' }
]