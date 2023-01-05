import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiHandler } from "../../api";
import { endpoint } from "../../api/endpoint";
import { BsChevronDoubleLeft } from "react-icons/bs";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [countriesList, setCountriesList] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryDetails, setSelectedCountryDetails] = useState("");
  const [statesList, setStatesList] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateDetails, setSelectedStateDetails] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

  const getSingleUser = async () => {
    const result = await apiHandler({
      url: endpoint.GETSINGLEUSER + id,
      method: "GET",
    });
    if (result.data.success) {
      if (result.data.user) {
        setFirstName(result.data.user.firstName);
        setLastName(result.data.user.lastName);
        setEmail(result.data.user.email);
        setPhoneNumber(result.data.user.mobile);
        setAddress1(result.data.user.address1);
        setAddress2(result.data.user.address2);
        setState(result.data.user.state);
        setCountry(result.data.user.country);
        setZipCode(result.data.user.zipCode);
      }
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const getCountries = async () => {
    const result = await apiHandler({
      url: endpoint.GETCOUNTRIES,
      method: "GET",
    });
    if (result.data.success) {
      setCountriesList(result.data.CountryJson);
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  const getStates = async () => {
    const result = await apiHandler({
      url: endpoint.GETSTATESBYCOUNTRY + selectedCountry,
      method: "GET",
    });
    if (result.data.success) {
      setStatesList(result.data.countryStates);
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  const getSingleCountry = async () => {
    const result = await apiHandler({
      url: endpoint.GETSINGLECOUNTRY + selectedCountry,
      method: "GET",
    });
    if (result.data.success) {
      setSelectedCountryDetails(result.data.singleCountry);
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  const getSingleState = async () => {
    const result = await apiHandler({
      url: endpoint.GETSINGLESTATE + selectedState,
      method: "GET",
    });
    if (result.data.success) {
      setSelectedStateDetails(result.data.singleState);
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
      getSingleCountry();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      getSingleState();
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCountryDetails.length) {
      setCountry(selectedCountryDetails[0].name);
    }
  }, [selectedCountryDetails]);

  useEffect(() => {
    if (selectedStateDetails.length) {
      setState(selectedStateDetails[0].name);
    }
  }, [selectedStateDetails]);

  const isValidFirstName = () => {
    if (firstName.trim() !== "") {
      // eslint-disable-next-line no-useless-escape
      var nameCheck = /^[A-Za-z\s]+$/;
      if (!nameCheck.test(firstName.trim())) {
        setFirstNameError(
          "First Name should contain Alphabetic Characters only!"
        );
        return false;
      } else if (firstName.length < 5) {
        setFirstNameError("First Name should contain min 5 characters");
      } else {
        setFirstNameError("");
        return true;
      }
    } else if (firstName.trim() === "") {
      setFirstNameError("This is a Required Field! ");
      return false;
    }
  };

  const isValidLastName = () => {
    if (lastName.trim() !== "") {
      // eslint-disable-next-line no-useless-escape
      var nameCheck = /^[A-Za-z\s]+$/;
      if (!nameCheck.test(lastName.trim())) {
        setLastNameError(
          "Last Name should contain Alphabetic Characters only!"
        );
        return false;
      } else if (lastName.length < 5) {
        setLastNameError("Last Name should contain min 5 characters");
      } else {
        setLastNameError("");
        return true;
      }
    } else if (lastName.trim() === "") {
      setLastNameError("This is a Required Field! ");
      return false;
    }
  };

  const isValidEmail = () => {
    if (email.trim() !== "") {
      // eslint-disable-next-line no-useless-escape
      var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailCheck.test(email.trim())) {
        setEmailError(
          "Email should be valid and not contain special characters other than . and @."
        );
        return false;
      } else {
        setEmailError("");
        return true;
      }
    } else if (email.trim() === "") {
      setEmailError("This is a Required Field! ");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const isValidPhone = () => {
    if (phoneNumber !== "") {
      // eslint-disable-next-line no-useless-escape
      var phoneCheck = /^[6-9]\d{9}$/;
      if (!phoneCheck.test(phoneNumber.trim())) {
        setPhoneError("Invalid Contact Details! ");
        return false;
      } else {
        setPhoneError("");
        return true;
      }
    } else if (phoneNumber.trim() === "") {
      setPhoneError("This is a Required Field! ");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const isValidAddress1 = () => {
    if (address1.trim() === "") {
      setAddress1Error("This is a Required Field! ");
      return false;
    } else {
      setAddress1Error("");
      return true;
    }
  };

  const isValidCountry = () => {
    if (country === "") {
      setCountryError("This is a Required Field! ");
      return false;
    } else {
      setCountryError("");
      return true;
    }
  };

  const isValidState = () => {
    if (state === "") {
      setStateError("This is a Required Field! ");
      return false;
    } else {
      setStateError("");
      return true;
    }
  };

  const isValidZipCode = () => {
    if (zipCode !== "") {
      // eslint-disable-next-line no-useless-escape
      var pinCheck = /^[0-9]{6}$/;
      if (!pinCheck.test(zipCode)) {
        setZipCodeError("Invalid Pin Code! ");
        return false;
      } else {
        setZipCodeError("");
        return true;
      }
    } else if (zipCode === "") {
      setZipCodeError("This is a Required Field! ");
      return false;
    } else {
      setZipCodeError("");
      return true;
    }
  };

  const validate = () => {
    if (
      isValidFirstName() &&
      isValidLastName() &&
      isValidEmail() &&
      isValidPhone() &&
      isValidAddress1() &&
      isValidCountry() &&
      isValidState() &&
      isValidZipCode()
    ) {
      return true;
    } else {
      isValidFirstName();
      isValidLastName();
      isValidEmail();
      isValidPhone();
      isValidAddress1();
      isValidCountry();
      isValidState();
      isValidZipCode();
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      mobile: phoneNumber,
      address1,
      address2,
      state,
      country,
      zipCode,
    };
    if (validate()) {
      const result = await apiHandler({
        url: endpoint.UPDATEUSER + id,
        method: "PUT",
        data,
      });
      if (result.data.success) {
        console.log("result", result.data);
        navigate("/");
      } else {
        console.log("getUsers.result.data", result.data);
      }
    }
  };

  return (
    <>
      <div className="addUser">
        <div className="addUserHeader pt-4 ps-5">
          <Link to={"/"}>
            <button className="btn btn-secondary">
              <BsChevronDoubleLeft /> Users
            </button>
          </Link>
        </div>
        <div className="container">
          <div className="addUserSection p-4">
            <div className="formsection row">
              <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlInput1">
                        First Name<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        className="form-control"
                        id="exampleFormControlInput1"
                        onChange={(event) => setFirstName(event.target.value)}
                        defaultValue={firstName}
                        onBlur={isValidFirstName}
                      />
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{firstNameError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlInput2">
                        Last Name<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        className="form-control"
                        id="exampleFormControlInput2"
                        onChange={(event) => setLastName(event.target.value)}
                        defaultValue={lastName}
                        onBlur={isValidLastName}
                      />
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{lastNameError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlInput3">
                        Email address<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput3"
                        onChange={(event) => setEmail(event.target.value)}
                        defaultValue={email}
                        onBlur={isValidEmail}
                      />
                    </div>
                    <div className="col-lg-4">
                      <span style={{ color: "red" }}>{emailError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlInput4">
                        Phone Number<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        className="form-control"
                        id="exampleFormControlInput4"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        defaultValue={phoneNumber}
                        onBlur={isValidPhone}
                      />
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{phoneError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlTextarea1">
                        Address1<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={(event) => setAddress1(event.target.value)}
                        defaultValue={address1}
                        onBlur={isValidAddress1}
                      ></textarea>
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{address1Error}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlTextarea2">
                        Address2
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea2"
                        rows="3"
                        onChange={(event) => setAddress2(event.target.value)}
                        defaultValue={address2}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlSelect1">
                        Country<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(event) =>
                          setSelectedCountry(event.target.value)
                        }
                        onBlur={isValidCountry}
                      >
                        <option value={country}>{country}</option>
                        {countriesList &&
                          countriesList.map((country, index) => (
                            <option value={country._id} key={index}>
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{countryError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlSelect2">
                        State<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        onChange={(event) =>
                          setSelectedState(event.target.value)
                        }
                        onBlur={isValidState}
                      >
                        <option value={state}>{state}</option>
                        {statesList &&
                          statesList.map((state, index) => (
                            <option value={state._id} key={index}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{stateError}</span>
                    </div>
                  </div>
                  <div className="form-group row my-4">
                    <div className="col-lg-3 text-lg-end">
                      <label htmlFor="exampleFormControlInput5">
                        Pin Code<span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput5"
                        onChange={(event) => setZipCode(event.target.value)}
                        defaultValue={zipCode}
                        onBlur={isValidZipCode}
                      />
                    </div>
                    <div className="col-lg-5">
                      <span style={{ color: "red" }}>{zipCodeError}</span>
                    </div>
                  </div>
                  <div className="text-center col-lg-7">
                    <button type="submit" className="btn btn-secondary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
