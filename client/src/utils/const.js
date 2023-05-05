export const baseURL = process.env.REACT_APP_BASE_URL

export const tabsNavigationHeader = [
    { label: 'Bài viết', value: '/blogs' },
    { label: 'Giới thiệu', value: '/about' },
    { label: 'Liên hệ', value: '/contact' },
    { label: 'Sản phẩm', value: '/products' }
]

export const optionsQuery = {
    limit: 5,
    page: 1
}

export const optionsQueryAnotherProduct = {
    limit: 6,
    page: 1
}

export const stepsCart = [
    'Chọn sản phẩm',
    'Nhập địa chỉ',
    'Chọn phương thức thanh toán',
    'Xem lại thông tin và xác nhận'
]

export const filterLists = [
    {
        name: 'Loại',
        options: ['Áo', 'Quần', 'Phụ kiện', 'Mũ', 'Đầm', 'Váy', 'Tất cả']
    },
    {
        name: 'Thương hiệu',
        options: ['Trung Quốc', 'Hàn Quốc', 'Thái Lan', 'Pháp', 'Việt Nam', 'Tất cả']
    },
    {
        name: 'Màu sắc',
        options: ['Trắng', 'Đen', 'Bạc', 'Ghi', 'Nâu', 'Tất cả']
    }
]

export const optionValueSizes = [
    { value: 's', label: 's' },
    { value: 'm', label: 'm' },
    { value: 'l', label: 'l' },
    { value: 'xxl', label: 'xxl' },
    { value: '3xl', label: '3xl' },
    { value: '4xl', label: '4xl' }
]
