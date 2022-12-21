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
  // import { GoogleLogin } from "react-google-login";
  import { GoogleLogin } from "@react-oauth/google";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import { googleLogIn, login } from "../redux/feature/authSlice";

  
  function Login() {
    const [formValues, setFormValues] = React.useState({
      email: "",
      password: "",
    });

    const {loading,error} = useSelector((state)=> ({...state.auth }))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = formValues;

    useEffect(() =>{
       error && toast.error(error);
    },[error])

    const handleSubmit = () => {
      if (email && password) {
        dispatch(
          login({ formValues, navigate, toast })
          // same as { formValues: formValues, navigate: navigate, toast: toast }
        );
      }
    };
  
    const onInputChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

    const googleFailure = (err) => {
      console.log(err);
      toast.error(err);
    };
    const googleSucess = (res) => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      const result = {
        email: res?.profileObj?.email,
        name: res?.profileObj?.name,
        token: res?.tokenId,
        googleId: res?.googleId,
      };
      dispatch(
        googleLogIn({ result: res, navigate, toast })
        // same as { formValues: formValues, navigate: navigate, toast: toast }
      );
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
          <h5>Sign In</h5>
          <MDBCardBody alignment="center">
            <MDBValidation onSubmit={handleSubmit} className="row g-3">
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
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="Please Provide your Password"
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
                  ></MDBSpinner>) : (
                     "Login"
                  )}
              </MDBBtn>
              </div>
            </MDBValidation>
            <br />

            <GoogleLogin 
              width="320"
              onSuccess={googleSucess}
              text="signin"
              onError={googleFailure}
              // cookiePolicy="single_host_origin"
            />
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p>Dont have an Account ? Signup</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    );
  }
  
  export default Login;