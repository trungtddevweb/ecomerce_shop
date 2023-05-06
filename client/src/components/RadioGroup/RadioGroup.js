import { FormControlLabel, Radio } from '@mui/material'
import { pink } from '@mui/material/colors'

const RadioGroup = ({ label, value }) => {
    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600]
                        }
                    }}
                />
            }
            label={label}
        />
    )
}

export default RadioGroup
