import {
    MDBCard,
    MDBCardBody,
    MDBCardGroup,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
  } from "mdb-react-ui-kit";
  import React from "react";
  
  function TourCard({ imageFile, description, title, tags, _id, name }) {
    const excerpt = (str) => {
      if (str.length > 45) return str.substring(0, 45) + "...";
      else return str;
    };
    return (
      <MDBCardGroup className="d-flex" style={{ justifyContent: "center" }}>
        <MDBCard
          className="h-100 mt-2 d-sm-flex"
          style={{
            maxWidth: "20rem",
          }}>
          <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: 210 }}
          />
          <div className="top-left">{name}</div>
          <span className="text-start tag-card">{tags.map((i) => `#${i} `)}</span>
          <MDBCardBody>
            <MDBCardTitle className="text-start">{title}</MDBCardTitle>
            <MDBCardText className="text-start">
              {excerpt(description)}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    );
  }
  
  export default TourCard;