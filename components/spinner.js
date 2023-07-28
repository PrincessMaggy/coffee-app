import React from 'react';
import {useState, CSSProperties} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner(props) {
    let [color, setColor] = useState('#ffffff');

    return (
        <div className='sweet-loading'>
            {/* <p>Loading...</p> */}
            <ClipLoader
                color={color}
                loading={props.loading}
                // cssOverride={override}
                size={150}
                aria-label='Loading Spinner'
                data-testid='loader'
            />
        </div>
    );
}

export default Spinner;
