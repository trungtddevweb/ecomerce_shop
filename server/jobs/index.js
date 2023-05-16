import voucherJob from './voucher.js'
import productJob from './product.js'

const runJobs = () => {
    console.log('Job is running !')
    productJob.start()
    voucherJob.start()
}

export default runJobs
