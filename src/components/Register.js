import React, { useState, useEffect } from 'react'
import UserTable from './UserTable';
// import axios from 'axios';

const COUNTRY_OPTIONS = [
    { id: 1, value: "India" },
    { id: 2, value: "Australia" },
    { id: 3, value: "England" },
  ];

  const STATE_OPTIONS = [
    { id: 1, country_id: 1, value: "West Bengal" },
    { id: 2, country_id: 1, value: "Mumbai" },
    { id: 3, country_id: 2, value: "Sydney" },
    { id: 4, country_id: 2, value: "Brisbane" },
    { id: 5, country_id: 3, value: "Lukas" },
    { id: 6, country_id: 3, value: "Hobland" },

  ];

  const CITY_OPTIONS = [
    { id: 1, state_id: 1, value: "Kolkata" },
    { id: 2, state_id: 1, value: "Howrah" },
    { id: 3, state_id: 2, value: "city-mumbai" },
    { id: 4, state_id: 3, value: "city-sydney-1" },
    { id: 5, state_id: 3, value: "city-sydney-2" },
    { id: 6, state_id: 4, value: "city-brisbane-1" },
    { id: 7, state_id: 4, value: "city-brisbane-2" },
    { id: 8, state_id: 5, value: "city-lukas-1" },
    { id: 9, state_id: 6, value: "city-hobland-1" },
  ];

const Register = () => {

    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('')
    const [gender, setGender] = useState("Male");
    const [stateOption,setStateOption] = useState([]);
    const [cityOption,setCityOption] = useState([]);
    const [country,setCountry] = useState([]);
    const [state,setState] = useState([]);
    const [city,setCity] = useState([]);
    // const [user, setUser] = useState([{name:'', fatherName:'',gender:'', country: '', state: '', city:''}])
    const [user, setUser] = useState([])
    const [userEdit, setUserEdit] = useState(false)
    const [userDetails, setUserDetails] = useState([])

        // Fetching from Local Storage
        const getUser = JSON.parse(localStorage.getItem("user"));
        useEffect(() => {
            console.log('getuser', getUser);
            if (getUser == null) {
                setUser([])
            } else {
                setUser(getUser);
            }
        }, [])


    const handleSubmit = async(e) => {
      e.preventDefault();
        let countryName = COUNTRY_OPTIONS.filter((e) => e.id == country)[0].value
        let stateName = STATE_OPTIONS.filter((e) => e.id == state)[0].value
        let cityName = CITY_OPTIONS.filter((e) => e.id == city)[0].value
        console.log('form', name, fatherName, gender, country, state, city, countryName, stateName, cityName, user, userDetails);

        if (userEdit && userDetails) {
            const myData = user.map((item, index) => {
                if (item.id == userDetails.id) {
                    item.name = name;
                    item.fatherName = fatherName;
                    item.gender = gender;
                    item.country = countryName;
                    item.state = stateName;
                    item.city = cityName;
                }
                return item;
            })
            setUserEdit(false)
            localStorage.setItem("user", JSON.stringify(myData));
        } 
        else {
            let id = Math.round(Date.now() / 1000);
            let userValue = {id: id, name: name, fatherName:fatherName, gender: gender, country: countryName, state: stateName, city: cityName}
            setUser([...user, userValue])
            localStorage.setItem('user', JSON.stringify([...user, userValue]))
            console.log('user', user, userValue);
        }

        setName('')
        setFatherName('')
        setCountry([])
        setState([])
        setCity([])
    }
 

    const saveCountry = (event) => {
      setStateOption([]);
      setCountry(event.target.value);
      let st = STATE_OPTIONS.filter((e) => e.country_id == event.target.value)
      console.log('country', event.target.value, st);
      setStateOption(st)
    }

    const saveState = (event) => {
        setCityOption([])
        setState(event.target.value);
        let city = CITY_OPTIONS.filter((e) => e.state_id == event.target.value)
        console.log('state', event.target.value, city);
        setCityOption(city)
      }

      const saveCity = (event) => {
        setCity(event.target.value);
        console.log('city', event.target.value,);
      }

    function onChangeValue(event) {
      setGender(event.target.value);
      console.log(event.target.value);
    }

    const getUserDetails = (data, text) => {
        console.log('user-details', data, text);
        if (data && text == 'edit') {
            setName(data.name);
            setFatherName(data.fatherName)
            setGender(data.gender)
            setUserEdit(true)
            setUserDetails(data)
            let getCountryId = COUNTRY_OPTIONS.filter((e) => e.value == data.country)[0].id;
            let getStateId = STATE_OPTIONS.filter((e) => e.value == data.state)[0].id;
            let st = STATE_OPTIONS.filter((e) => e.country_id == getCountryId);
            let city = CITY_OPTIONS.filter((e) => e.state_id == getStateId)
            setStateOption(st)
            setCityOption(city)
            console.log('countryId', city, CITY_OPTIONS.filter((e) => e.value == data.city)[0].id);
            setCountry(COUNTRY_OPTIONS.filter((e) => e.value == data.country)[0].id)
            setState(STATE_OPTIONS.filter((e) => e.value == data.state)[0].id)
            setCity(CITY_OPTIONS.filter((e) => e.value == data.city)[0].id)
        }
    }

  return (
    <>
          <>
              <div className="register" style={{ width: "800px", margin: "50px auto" }}>
                  <h1>Register Page</h1>
                  <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputName" className="form-label">
                              Name
                          </label>
                          <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              id="exampleInputName"
                              placeholder="Enter your name"
                              required />
                      </div>

                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputFatherName" className="form-label">
                              Father Name
                          </label>
                          <input
                              type="text"
                              value={fatherName}
                              onChange={(e) => setFatherName(e.target.value)}
                              className="form-control"
                              id="exampleInputFatherName"
                              placeholder="Enter your father name"
                              required />
                      </div>

                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputGender" className="form-label">
                              <div onChange={onChangeValue}>
                                  Gender
                                  <input
                                      type="radio"
                                      value="Male"
                                      name="gender"
                                      checked={gender === "Male"} />{" "}
                                  Male
                                  <input
                                      type="radio"
                                      value="Female"
                                      name="gender"
                                      checked={gender === "Female"} />{" "}
                                  Female
                              </div>
                          </label>
                      </div>

                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputCountry" className="form-label">
                              Country
                          </label>
                          <select className="form-control" name={country} value={country} onChange={saveCountry}>
                              <option value="">Select</option>
                              {COUNTRY_OPTIONS.map((option, index) => (
                                  <option key={index} value={option.id}>
                                      {option.value}
                                  </option>
                              ))}
                          </select>
                      </div>

                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputState" className="form-label">
                              State
                          </label>
                          <select className="form-control" name={state} value={state} onChange={saveState}>
                              <option value="">Select</option>
                              {stateOption.map((option, index) => (
                                  <option key={index} value={option.id}>
                                      {option.value}
                                  </option>
                              ))}
                          </select>
                      </div>

                      <div className="mb-3 form-div">
                          <label htmlFor="exampleInputCity" className="form-label">
                              City
                          </label>
                          <select className="form-control" name={city} value={city} onChange={saveCity}>
                              <option value="">Select</option>
                              {cityOption.map((option, index) => (
                                  <option key={index} value={option.id}>
                                      {option.value}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <button type="submit" className="btn btn-primary">
                          Submit
                      </button>
                  </form>
              </div>
          </>
          <UserTable user={user} getUser={getUserDetails} />
          </>
  );
};

export default Register