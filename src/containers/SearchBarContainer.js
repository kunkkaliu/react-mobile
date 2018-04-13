/**
 * Created by liudonghui on 2018/3/29.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCities, getStoresByCity, getTechsByStore, getProjects, setStore } from 'actions/common';
import SearchBar from 'components/SearchBar';

const mapStateToProps = state => ({
    cities: state.common.cities,
    stores: state.common.stores,
    technicians: state.common.technicians,
    projects: state.common.projects,
});
const mapDispatchToProps = dispatch => ({
    getAllCities: bindActionCreators(getAllCities, dispatch),
    getStoresByCity: bindActionCreators(getStoresByCity, dispatch),
    getTechsByStore: bindActionCreators(getTechsByStore, dispatch),
    getProjects: bindActionCreators(getProjects, dispatch),
    setStore: bindActionCreators(setStore, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
