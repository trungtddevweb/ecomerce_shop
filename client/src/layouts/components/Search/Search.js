import { IconButton, TextField, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate('/search')
    }
    return (
        <Box component='form' noValidate autoComplete='off'>
            <TextField
                id='search'
                label='Tìm sản phẩm...'
                variant='outlined'
                size='small'
                fullWidth
                InputProps={{
                    endAdornment: <SearchIcon cursor='pointer' onClick={handleSearch} />
                }}
            />
        </Box>
    )
}

export default Search
