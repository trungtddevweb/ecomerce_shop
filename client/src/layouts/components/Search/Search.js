import { IconButton, TextField, Box } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material'

const Search = () => {
    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField
                id="search"
                label="Tìm sản phẩm..."
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );
}

export default Search