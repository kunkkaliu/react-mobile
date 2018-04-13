/**
 * Created by liudonghui on 2018/3/27.
 */
import { bindActionCreators } from 'redux';
import { updateCollapsed } from 'actions/menu';

export default {
    mapStateToProps: state => ({
        menus: state.menu.menus,
        user: state.menu.user,
        collapsed: state.menu.collapsed,
    }),
    mapDispatchToProps: dispatch => ({
        updateCollapsed: bindActionCreators(updateCollapsed, dispatch),
    }),
};

