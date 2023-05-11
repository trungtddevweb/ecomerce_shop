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
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: '16px'
        },
        hoverItem: {
            '&:hover': {
                color: 'CurrentColor'
            }
        },
        formWrap: {
            width: '500px',
            maxWidth: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            zIndex: 10
        },
        authBg: {
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover',
            zIndex: 9,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    })
)

export default useStyles
