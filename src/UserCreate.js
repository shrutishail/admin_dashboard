import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState(''); // Track the selected country name
  const navigate = useNavigate();

  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        console.log("Countries fetched successfully:", response.data);
        setCountries(response.data);  // Store the list of countries
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  const myFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      country: "", // Keep this as the country code initially
    },
    validate: (values) => {
      let errors = {};

      if (!values.username) {
        errors.username = "Please enter username";
      } else if (values.username.length < 5) {
        errors.username = "Name shouldn't be less than 5 characters";
      } else if (values.username.length > 20) {
        errors.username = "Name shouldn't be more than 20 characters";
      }

      if (!values.email) {
        errors.email = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.country) {
        errors.country = "Please select a country";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const updatedValues = { ...values, country: selectedCountryName };  // Replace country code with name
        await axios.post("https://63a9bccb7d7edb3ae616b639.mockapi.io/users", updatedValues);
        navigate("/portal/user-list");
      } catch (error) {
        console.log(error);
        alert("Submission failed");
        setLoading(false);
      }
    },
  });

  // Handle country selection and store the country name
  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.cca2 === countryCode); // Find country by code
    if (country) {
      setSelectedCountryName(country.name.common);  // Set the country name
    }
    myFormik.handleChange(event);  // Let Formik handle other field updates
  };

  return (
    <div className='container'>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Name</label>
            <input
              name='username'
              value={myFormik.values.username}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
          </div>

          <div className="col-lg-6">
            <label>E-Mail</label>
            <input
              name='email'
              value={myFormik.values.email}
              onChange={myFormik.handleChange}
              type="email"
              className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
          </div>

          <div className='col-lg-6'>
            <label>Country</label>
            <select
              name='country'
              value={myFormik.values.country}
              onChange={handleCountryChange}  // Use custom handler to store country name
              className={`form-control ${myFormik.errors.country ? "is-invalid" : ""} `}
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
            <span style={{ color: "red" }}>{myFormik.errors.country}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Submitting..." : "Create"}
              className='btn btn-primary'
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
