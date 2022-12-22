import {
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCard from "../components/TourCard";
import { getTours } from "../redux/feature/tourSlice";

function Home() {
  const { loading, error, tours } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTours());
  }, []);
  if (loading) return <h2>Loading....</h2>;
  return (
    <div
      style={{
        margin: "auto",
        padding: 15,
        alignContent: "center",
      }}>
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography tag="h2" className="text-center mb-0">
            NO tours found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 ">
              {tours &&
                tours.map((item, index) => <TourCard {...item} key={index} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Home;