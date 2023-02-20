import React from 'react';

import './Error.css'

function Error({ err }) {
    return (
        <span className='error error__visible'>{err}</span>
    )
}

export default Error;