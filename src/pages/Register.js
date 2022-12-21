import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBSpinner,
  MDBValidation,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
// import { GoogleRegister } from "react-google-Register";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../redux/feature/authSlice";


function Register() {
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const {loading,error} = useSelector((state)=> ({...state.auth }))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, firstName, lastName, confirmPassword } = formValues;

  useEffect(() =>{
     error && toast.error(error);
  },[error])
  const handleSubmit = () => {
    if(password !== confirmPassword){
      return toast.error("Password mismatch");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(
        register({ formValues, navigate, toast })
        // same as { formValues: formValues, navigate: navigate, toast: toast }
      );
    }
  };

  const onInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
      
    });
    console.log(formValues);
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: 450,
        marginTop: 120,
        alignContent: "center",
      }}>
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody alignment="center">
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
              <MDBInput
                label="Enter Your First Name"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide your first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Enter Your Last Name"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide your last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Enter Your Email-id"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Enter Password"

                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide your Password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please Confirm your Password"
              />
            </div>
            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading ? (
                    <MDBSpinner 
                      size="sm"
                      role="status"
                      tag="span"
                      className="m-1"
                    />                   
                ):(
                  "Register"
                )}
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an Account ? sign in</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Register;