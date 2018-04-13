import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BasicLayout from 'layouts/BasicLayout';
import { getMenu } from 'actions/menu';
import DevTools from './DevTools';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuLoaded: false,
        };
        this._unmount = false;
    }

    static propTypes = {
        store: PropTypes.object,
    }

    componentDidMount() {
        const { store } = this.props;
        const { promise } = store.dispatch(getMenu()).payload;
        promise.then((res) => {
            const { data } = res.payload;
            if (data && data.code == 0) {
                !this._unmount && this.setState({
                    menuLoaded: true,
                });
            }
        });
    }

    componentWillUnmount() {
        this._unmount = true;
    }

    render() {
        console.log('root container');
        const { store } = this.props;
        const { menuLoaded } = this.state;
        const { environment } = store.getState();

        return (
            <Provider store={ store }>
                <div>
                    <LocaleProvider locale={zhCN}>
                        {
                            menuLoaded ?
                                <Router>
                                    <Switch>
                                        <Route component={BasicLayout} path='/' />
                                    </Switch>
                                </Router>
                                :
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        margin: 'auto',
                                        paddingTop: 50,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Spin size="large"/>
                                </div>
                        }
                    </LocaleProvider>
                    {environment.isDev ? <DevTools /> : null}
                </div>
            </Provider>
        );
    }
}
