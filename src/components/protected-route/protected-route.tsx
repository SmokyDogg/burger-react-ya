import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { ReactNode, FC } from 'react';
import { useSelector } from '../../services/hooks/useSelector&Dispatch';

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}> = ({ children, ...rest }) => {
    const user = useSelector(store => store.user.user);
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={
                () => (user ? (children) : (
                    <Redirect to={{
                        pathname: `/login`,
                        state: { from: location },
                    }}
                    />
                ))
            }
        />
    );
};