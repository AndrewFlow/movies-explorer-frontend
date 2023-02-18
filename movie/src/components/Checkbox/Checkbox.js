import React from 'react';
import './Checkbox.css'

function Checkbox({ checkboxStatus, onChangeCheckbox }) {
    return (
        <>
            <label className="search__checkboxes">
                <input
                    type="checkbox"
                    name="checkbox"
                    value={checkboxStatus}
                    onChange={onChangeCheckbox} />
                <span className="checkbox-swtich"></span>
            </label>
            <span className='movies__type'>Короткометражки</span>
        </>
    )
}

export default Checkbox;