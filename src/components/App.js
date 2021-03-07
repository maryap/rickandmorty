import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import CharList from './CharList/CharList';
import CharDetail from './CharDetail/CharDetail';
import Alert from './Alert/Alert';
import SearchResult from './SearchResult/SearchResult';
import Loading from './Loading/Loading';
import NotFound from './NotFound/NotFound';

const App = (props) => {
    return (
        <BrowserRouter>
            <Header />
            {props.alertMsg !== "" ? <Alert message={props.alertMsg} alertType={props.alertType} /> : null}
            {props.loading ? <Loading /> : null}
            <Switch>
                <Route path="/" component={CharList} exact />
                <Route path="/character/:id" component={CharDetail} />
                <Route path="/searchresult/:name" component={SearchResult} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alertManagement.alertMessage,
        alertType: state.alertManagement.alertType,
        loading: state.r_and_m.loading
    };
};

export default connect(mapStateToProps)(App);
