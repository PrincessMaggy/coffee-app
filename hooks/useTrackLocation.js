import {useState} from 'react';

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('');
    const [loading, setLoading] = useState(false);

    const success = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatLong(`${lat},${long}`);
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

    return {latLong, handleTrackLocation, locationErrorMsg, loading};
};

export default useTrackLocation;
