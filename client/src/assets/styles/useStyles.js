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
        },
        itemOnboarding: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
            height: '150px',
            border: '1px solid black',
            borderRadius: '50%',
            margin: 'auto',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
                transform: 'scale(1.1)'
            }
        },
        flexBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        limitLines: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        title: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: '16px'
        }
    })
)

export default useStyles
