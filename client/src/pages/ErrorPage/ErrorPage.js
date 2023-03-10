import { useRouteError } from 'react-router-dom'
import routes from 'src/utils/routes';
import Button from '~/components/Button';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Button to={routes.home.path} className="btn btn-primary">Go Home</Button>
            </div>
        </div>
    )
}



export default ErrorPage