import { TextField } from "@mui/material"
import { lineHeight } from "@mui/system"
import { Button } from "react-bootstrap"

const Footer = () => {
    return (
            <div class="backgroud-footer">
                <div id="Dangki">
                    <p>Register now so you don't miss our programs</p>
                    <div id="timkiem">
                        <TextField placeholder="Nhap email"></TextField>
                        <Button>Dang ki</Button>
                    </div>
                </div>
            <div id="Menu">
                <a href="/">Home</a>
                <a href="/">Category</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
            </div>
            <div id="Footer">
                <p>Terms of Service          Privacy Policy</p>
                <p>© 2022 Monito. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer