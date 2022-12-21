import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/feature/authSlice";

function Header() {
  const [show, setShow] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  //   console.log(user);
  const handelLogout = () => {
    dispatch(setLogout());
  };
  return (
    <MDBNavbar
      fixed="top"
      expand="lg"
      style={{
        backgroundColor: "#f0e6ea",
      }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{
            color: "#959a9c",
            fontWeight: 600,
            fontSize: 22,
          }}>
          Tour-Pedia-App
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle nav"
          onClick={() => setShow(!show)}
          style={{ color: "#0579b3" }}>
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={show}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h6
                className="header-text"
                style={{
                  marginTop: 19,
                  marginRight: 30,
                }}>
                Logged in as : {user?.result?.name}
              </h6>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">HOME</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
   
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">ADD TOUR</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">DASHBOARD</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem onClick={handelLogout}>
                <MDBNavbarLink href="/login">
                  <p className="header-text">LOGOUT</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">LOGIN</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;