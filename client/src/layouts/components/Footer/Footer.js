import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#6699CC' }} className='py-3'>
            <div className='text-white'>
                <div className='container '>
                    <div className='row gx-5'>
                        <div className='col'>
                            <div>
                                <h3>MyStore</h3>
                                <p className='lh-base'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente nihil
                                    voluptatibus accusantium qui minima dolorum repudiandae quasi voluptates voluptate
                                    vel id illo odio assumenda totam eos atque, tempore consequuntur corrupti.
                                </p>
                            </div>
                        </div>
                        <div className='col'>
                            <div className=''>
                                <h3>Liên hệ với chúng tôi</h3>
                                <ul class='list-unstyled'>
                                    <li className='mb-2'>
                                        <LocationOnIcon className='me-2' />
                                        Gia Lâm, Hà Nội, Việt Nam
                                    </li>
                                    <li className='mb-2'>
                                        <EmailIcon className='me-2' />
                                        info@gmail.com
                                    </li>
                                    <li>
                                        <PhoneIcon className='me-2' />
                                        0352828651
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col'>
                            <div className=''>
                                <h3>Giờ mở cửa</h3>
                                <ul class='list-unstyled'>
                                    <li className='d-flex justify-content-between mb-2'>
                                        <span>Thứ 2 -Thứ 5:</span> <span>8:00 - 21:00</span>
                                    </li>
                                    <li className='d-flex justify-content-between mb-2'>
                                        <span> Thứ 6 - Thứ 7:</span> <span>8:00 - 01:00</span>
                                    </li>
                                    <li className='d-flex justify-content-between'>
                                        <span>Chủ Nhật:</span> <span>9:00 - 22:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center text-white'>© 2023   MyStore. All rights reserved</div>
        </div>
    )
}

export default Footer
