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

export const brandLists = [
    { label: 'Việt Nam', value: 'việt nam' },
    { label: 'Trung Quôc', value: 'trung quốc' },
    { label: 'Hàn Quốc', value: 'hàn quốc' },
    { label: 'Thái Lan', value: 'thái lan' },
    { label: 'Canada', value: 'Canada' }
]

export const categoryLists = [
    { label: 'Áo', value: 'áo' },
    { label: 'Đầm', value: 'đầm' },
    { label: 'Quần', value: 'quần' },
    { label: 'Giày', value: 'giày' },
    { label: 'Dép', value: 'dép' },
    { label: 'Phụ kiện', value: 'phụ kiện' }
]

export const sizeLists = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XXL', value: 'xxl' },
    { label: '3XL', value: '3xl' },
    { label: '4XL', value: '4XL' }
]

export const priceLists = [
    { label: 'Nhỏ hơn 100.000 VNĐ', value: 'lt100000' },
    { label: '100.000 - 200.000 VNĐ', value: '100000-200000' },
    { label: '200.000 - 350.000 VNĐ', value: '200000-350000' },
    { label: 'Lớn hơn 350.000 VNĐ', value: 'gt350000' }
]
