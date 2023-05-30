import banner1 from '~/assets/imgs/banner1.png'
import banner2 from '~/assets/imgs/banner2.jpg'
import banner3 from '~/assets/imgs/banner3.png'
import summerSale from '~/assets/imgs/summerSale.jpg'
import clotheSale from '~/assets/imgs/sale1.jpg'
import voucher from '~/assets/imgs/voucher.jpg'
import blackFriday from '~/assets/imgs/blackFriday.jpg'

export const baseURL = process.env.REACT_APP_BASE_URL
export const locationURL = process.env.REACT_APP_LOCALTION_URL

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

export const optionsVouchers = {
    limit: 5,
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
    { label: 'XL', value: 'xl' },
    { label: 'XXL', value: 'xxl' },
    { label: '3XL', value: '3xl' },
    { label: '4XL', value: '4xl' },
    { label: '36', value: '36' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '43' }
]

export const priceLists = [
    { label: '< 100.000đ', value: 'lt100000' },
    { label: '100.000 - 200.000đ', value: '100000-200000' },
    { label: '200.000 - 350.000đ', value: '200000-350000' },
    { label: '> 350.000đ', value: 'gt350000' }
]

export const imagesSlider = [
    { src: banner1, alt: 'Slider 1' },
    { src: banner2, alt: 'Slider 2' },
    { src: banner3, alt: 'Slider 3' }
]

export const sliderLists = [
    { src: summerSale, title: 'Chào hè rực rỡ, siêu nhiều ưu đãi rất nhiều mặt hàng, giảm lên tới 50%' },
    {
        src: clotheSale,
        title: 'Rất nhiều quần áo thời trang nữ đang trong giai đoạn khuyến mãi trong thời gian có hạn'
    },
    { src: voucher, title: 'Có rất nhiều ưu đãi khác cũng như mã giảm giá cực hot đang chờ bạn khi mua hàng' },
    {
        src: blackFriday,
        title: 'Ưu đãi cực khủng nhân nhịp Black Friday với các sản phẩm giảm giá lên tới 60% và miễn phí ship toàn quốc'
    }
]

export const statusShipping = ['prepare', 'pending', 'delivering', 'delivered', 'cancel']

export function convertStatus(status) {
    switch (status) {
        case 'prepare':
            return 'Chuẩn bị'
        case 'pending':
            return 'Đang xử lý'
        case 'delivering':
            return 'Đang giao'
        case 'delivered':
            return 'Đã giao'
        case 'cancel':
            return 'Đã huỷ'
        default:
            return 'Chuẩn bị'
    }
}
