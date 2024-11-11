import { connect } from "react-redux";
import Home from "../components/Home";

import {getCurrentLocation, 
        getInputData, 
        toggleSearchResult,
        getAddressPredictions,
        getSelectedAddress,
        bookCar,
        getNearByDrivers,
        getBookingStatus
    } from '../modules/home';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare,
    booking: state.home.booking || {},
    nearByDrivers: state.home.nearByDrivers || []
})

const mapActionCreators = {
    getCurrentLocation,
    getInputData, 
    toggleSearchResult,
    getAddressPredictions,
    getSelectedAddress,
    bookCar,
    getNearByDrivers,
    getBookingStatus
};

export default connect(mapStateToProps, mapActionCreators)(Home);