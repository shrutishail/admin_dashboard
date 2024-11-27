import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState('');

    // Fetch countries for the dropdown
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries', error);
            }
        };

        fetchCountries();
        getUserData();
    }, []);

    // Fetch the user data by ID to populate the form
    const getUserData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`);
            myFormik.setValues(response.data); // Set form values with fetched user data
            setSelectedCountryName(response.data.country); // Save the country name in the state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const myFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            country: '',
        },
        // Validating form data
        validate: (values) => {
            let errors = {};

            if (!values.username) {
                errors.username = 'Please enter username';
            } else if (values.username.length < 5) {
                errors.username = "Name shouldn't be less than 5 characters";
            } else if (values.username.length > 25) {
                errors.username = "Name shouldn't be more than 25 characters";
            }

            if (!values.email) {
                errors.email = 'Please enter email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.country) {
                errors.country = 'Please select a country';
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                // Here we send the country name instead of country code
                const updatedValues = { ...values, country: selectedCountryName };

                await axios.put(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`, updatedValues);
                setLoading(false);
                navigate('/portal/user-list'); // Redirect to the user list after successful update
            } catch (error) {
                console.error('Error updating user:', error);
                setLoading(false);
            }
        },
    });

    // Handle country selection and update selected country name
    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const country = countries.find(c => c.cca2 === countryCode);
        if (country) {
            setSelectedCountryName(country.name.common); // Store the country name
        }
        myFormik.handleChange(event); // Let Formik handle the other form fields
    };

    return (
        <>
            <h3>UserEdit - Id : {params.id}</h3>
            <div className="container">
                <form onSubmit={myFormik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <label>Name</label>
                            <input
                                name="username"
                                value={myFormik.values.username}
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.username ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{myFormik.errors.username}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input
                                name="email"
                                value={myFormik.values.email}
                                onChange={myFormik.handleChange}
                                type="email"
                                className={`form-control ${myFormik.errors.email ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{myFormik.errors.email}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Country</label>
                            <select
                                name="country"
                                value={myFormik.values.country}
                                onChange={handleCountryChange}  // Use the custom country change handler
                                className={`form-control ${myFormik.errors.country ? 'is-invalid' : ''}`}
                            >
                                <option value="">----Select----</option>
                                {countries.length > 0 ? (
                                    countries.map((country) => (
                                        <option key={country.cca2} value={country.cca2}>
                                            {country.name.common}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Loading countries...</option>
                                )}
                            </select>
                            <span style={{ color: 'red' }}>{myFormik.errors.country}</span>
                        </div>

                        <div className="col-lg-4 mt-3">
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? 'Updating...' : 'Update'}
                                className="btn btn-primary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserEdit;
