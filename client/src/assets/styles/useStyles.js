import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(theme =>
    createStyles({
        iconButton: {
            backgroundColor: theme.colors.primary.lightGray,
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.hover.icon.bgColor.transparent,
                color: theme.colors.primary.white
            },
            transition: 'ease .4s'
        }
    })
)

export default useStyles
