import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import mapToProps from './BasicLayoutMapping';
import logo from 'assets/img/logo.svg';
import { appMenu } from 'utils/menu';
import { basicLayoutRouterConfig, getRouterData } from 'utils/router';

import { Layout } from 'antd';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import Exception from 'components/Exception';
import SiderBar from 'components/SiderBar';
import AuthorizedRoute from 'components/Authorized/AuthorizedRoute';

const { Content, Header, Footer } = Layout;

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

const redirectData = [];
const getRedirect = (item) => {
    if (item && item.child) {
        if (item.child[0] && item.child[0].router) {
            redirectData.push({
                from: `${item.router}`,
                to: `${item.child[0].router}`,
            });
            item.child.forEach((children) => {
                getRedirect(children);
            });
        }
    }
};
appMenu.forEach(getRedirect);

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class BasicLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
        };
    }

    static propTypes = {
        history: PropTypes.object,
        menus: PropTypes.array,
        location: PropTypes.object,
        user: PropTypes.object,
        collapsed: PropTypes.bool,
        updateCollapsed: PropTypes.func,
    }

    componentDidMount() {
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    getBashRedirect = (routerData) => {
        const { location: { pathname } } = this.props;
        const redirect = pathname;
        if (!redirect || redirect === '/') {
            const authorizedRouter = routerData.find(item => (item.permission && item.path !== '/'));
            return authorizedRouter && authorizedRouter.path;
        }
        return redirect;
    }

    render() {
        console.log('Basic Layout');
        const {
            menus,
            location,
            user,
            collapsed,
            updateCollapsed,
        } = this.props;

        const { isMobile } = this.state;

        const siderProps = {
            menus,
            collapsed,
            location,
            logo,
            isMobile,
            onCollapse: updateCollapsed,
        };

        const headerProps = {
            user,
            collapsed,
            onCollapse: updateCollapsed,
            isMobile,
            logout: this.handleLogout,
            logo,
        };

        const routerData = getRouterData(basicLayoutRouterConfig, appMenu);
        const bashRedirect = this.getBashRedirect(routerData);

        return (
            <Layout>
                <SiderBar {...siderProps} />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader {...headerProps} />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            {
                                redirectData.map(item => <Redirect key={item.from} exact from={item.from} to={item.to} />)
                            }
                            {
                                routerData.map(item =>
                                    (
                                        <AuthorizedRoute
                                            key={item.key}
                                            path={item.path}
                                            component={item.component}
                                            exact={item.exact}
                                            authority={item.permission}
                                            redirectPath="/exception/403"
                                        />
                                    ))
                            }
                            <Route path='/exception/403' render={() => <Exception type='403' style={{ minHeight: 500, height: '80%' }} />} />
                            <Route path='/exception/500' render={() => <Exception type='500' style={{ minHeight: 500, height: '80%' }} />} />
                            <Redirect exact from='/' to={bashRedirect} />
                            <Route render={() => <Exception type='404' style={{ minHeight: 500, height: '80%' }} />} />
                        </Switch>
                    </Content>
                    <Footer>
                        <GlobalFooter />
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
