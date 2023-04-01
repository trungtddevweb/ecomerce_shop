import { IconButton, TextField, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

const Search = () => {
    const search = () => {
        console.log('helle')
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
                    endAdornment: (
                        <IconButton aria-label='search' onClick={search}>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
        </Box>
    )
}

export default Search
