import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../../actions/auth';

import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, id } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    console.log(checking);
    if (checking) {
        return (<h5>Espere...</h5>);
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path='/login'
                        component={LoginScreen}
                        isAuthenticated={!!id}
                    />

                    <PrivateRoute
                        exact
                        path='/'
                        component={CalendarScreen}
                        isAuthenticated={!!id}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
