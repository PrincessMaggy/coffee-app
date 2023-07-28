import {useState} from 'react';

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('');

    const success = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatLong(`${lat},${long}`);
        setLocationErrorMsg('');
    };

    const error = () => {
        setLocationErrorMsg('Unable to retrieve your location.');
    };

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            setLocationErrorMsg(
                'Geolocation is not supported by your browser.',
            );
        } else {
            // status.textContent = 'Locating...';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {latLong, handleTrackLocation, locationErrorMsg};
};

export default useTrackLocation;
