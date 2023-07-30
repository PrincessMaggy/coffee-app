import {useContext, useState} from 'react';
import {ACTION_TYPES, StoreContext} from '../context/storeContext';

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const {dispatch} = useContext(StoreContext);

    const success = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {
                latLong: `${lat},${long}`,
            },
        });
        setLocationErrorMsg('');
        setLoading(false);
    };

    const error = () => {
        setLocationErrorMsg('Unable to retrieve your location.');
        setLoading(false);
    };

    const handleTrackLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg(
                'Geolocation is not supported by your browser.',
            );
            setLoading(false);
        } else {
            // status.textContent = 'Locating...';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {handleTrackLocation, locationErrorMsg, loading};
};

export default useTrackLocation;
