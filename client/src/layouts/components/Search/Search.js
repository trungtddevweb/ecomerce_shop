import { TextField, FormControl, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useState } from 'react'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    useDocumentTitle('Tìm kiếm')
    useScrollToTop()

    const navigate = useNavigate()
    const [value, setValue] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        navigate(`/search?name=${value}`)
    }

    return (
        <Box component='form' onSubmit={handleSearch}>
            <FormControl noValidate>
                <TextField
                    id='search'
                    label='Tìm sản phẩm...'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoComplete='off'
                    onChange={e => setValue(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <SearchIcon
                                onClick={e => handleSearch(e)}
                                sx={{
                                    visibility: value === '' ? 'hidden' : 'visible'
                                }}
                                cursor='pointer'
                            />
                        )
                    }}
                />
            </FormControl>
        </Box>
    )
}

export default Search
