import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBSpinner,
    MDBValidation,
  } from "mdb-react-ui-kit";
  import React, { useEffect } from "react";
  import ChipInput from "material-ui-chip-input";
  import FileBase from "react-file-base64";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  import { createTour } from "../redux/feature/tourSlice";
  
  function AddEditTour() {
    const [tourData, setTourData] = React.useState({
      title: "",
      description: "",
      tags: [],
    });
    const { error, loading } = useSelector((state) => ({ ...state.tour }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { title, description, tags } = tourData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
  
    const onInputChange = (e) => {
      setTourData({
        ...tourData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = () => {
      if (title && description && tags) {
        const updatedTourData = { ...tourData, name: user?.result?.name };
        dispatch(createTour({ updatedTourData, navigate, toast }));
        handleClear();
      }
    };
    const handleAddTag = (tag) => {
      setTourData({
        ...tourData,
        tags: [...tourData.tags, tag],
      });
    };
    const handleDeleteTag = (tagToBeDeleted) => {
      setTourData({
        ...tourData,
        tags: tourData.tags.filter((tag) => tag !== tagToBeDeleted),
      });
    };
    const handleClear = () => {
      setTourData({
        tags: [],
        title: "",
        description: "",
      });
    };
    return (
      <div
        className="container"
        style={{
          margin: "auto",
          padding: 15,
          maxWidth: 450,
          alignContent: "center",
          marginTop: 120,
        }}>
        <MDBCard alignment="center">
          <h5>Add Your Tour</h5>
          <MDBCardBody>
            <MDBValidation>
              <div className="col-md-12 my-3">
                <input
                  placeholder="Provide Title"
                  type="text"
                  value={title}
                  name="title"
                  onChange={onInputChange}
                  className="form-control"
                  required
                  invalid
                  validation="Please enter Valid title"
                />
              </div>
              <div className="col-md-12  my-3">
                <input
                  placeholder="Give Description"
                  type="text"
                  style={{
                    height: 100,
                  }}
                  value={description}
                  name="description"
                  onChange={onInputChange}
                  className="form-control"
                  required
                  invalid
                  validation="Please enter Description"
                />
              </div>
              <div className="col-md-12  my-3">
                <ChipInput
                  name="tags"
                  variant="outlined"
                  placeholder="Give Tag"
                  fullWidth
                  value={tags}
                  onAdd={(tag) => handleAddTag(tag)}
                  onDelete={(tag) => handleDeleteTag(tag)}
                />
              </div>
              <div className="d-flex justify-content-start  my-3">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setTourData({
                      ...tourData,
                      imageFile: base64,
                    });
                  }}
                />
              </div>
  
              <div className="col-md-12  my-3">
                <MDBBtn
                  onClick={handleSubmit}
                  style={{ width: "100%" }}
                  className="mt-2">
                  {loading ? (
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="m-1"
                    />
                  ) : (
                    "Create Your Tour"
                  )}
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
  
  export default AddEditTour;