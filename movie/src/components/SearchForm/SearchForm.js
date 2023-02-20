import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

import useFormWithValidation from '../hooks/useFormWithValidation';

import './SearchForm.css'

function SearchForm({ onSearch }) {
    const { handleChange } = useFormWithValidation();
    const location = useLocation();

    const [request, setRequest] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const [noResult, setnoResult] = useState(null);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const checkbox = localStorage.getItem('checkboxStatus');
            const search = localStorage.getItem('request');

            if (search) {
                setRequest(search);
            }
            if (JSON.parse(checkbox) === true) {
                setCheckboxStatus(true);
            } else {
                setCheckboxStatus(false);
            }
        }
    }, [location.pathname]);

    function toggleCheckbox(checkboxStatus) {
        setCheckboxStatus(checkboxStatus);
        onSearch(request, checkboxStatus);
    }

    function handleChangeCheckbox(evt) {
        toggleCheckbox(evt.target.checked);
    }

    function handleRequestChange(evt) {
        handleChange(evt);
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!request) {
            setnoResult('Не может быть пустым');
        }
        onSearch(request, checkboxStatus);
    }

    return (
        <section className="search">
            <form className="search__form"
                onSubmit={handleSubmit}
                noValidate>
                <div className="search__loupe"></div>
                <input className="search__input"
                    type="text"
                    name="request"
                    placeholder="Фильм"
                    value={request || ''}
                    onChange={handleRequestChange}
                    required />
                <button
                    className="search__button blue"
                    type="submit"
                    aria-label="поиск"
                >Поиск</button>
            </form>
            <Checkbox
                checkboxStatus={checkboxStatus}
                onChangeCheckbox={handleChangeCheckbox}
            />
        </section>
    )
}

export default SearchForm;