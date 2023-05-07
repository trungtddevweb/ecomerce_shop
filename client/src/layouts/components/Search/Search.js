import { TextField, FormControl } from '@mui/material'
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
                            sx={{
                                visibility: value === '' ? 'hidden' : 'visible'
                            }}
                            cursor='pointer'
                            onClick={e => handleSearch(e)}
                        />
                    )
                }}
            />
        </FormControl>
    )
}

export default Search
