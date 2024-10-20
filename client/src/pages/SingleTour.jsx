import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getTour } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
// import RelatedTours from "../components/RelatedTours";
// import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  //   useEffect(() => {
  //     tags && dispatch(getRelatedTours(tags));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer
        style={{
          minHeight: "100vh",
        }}
      >
        {tour.imageFile ? (
          <MDBCard style={{ margin: "100px 20px" }}>
            <MDBCardImage
              position="top"
              style={{ width: "100%", height: "400px" }}
              src={tour.imageFile}
              alt={tour.title}
            />
            <MDBCardBody>
              <MDBBtn
                tag="a"
                color="none"
                style={{ float: "right", color: "#000" }}
                onClick={() => navigate("/")}
              >
                <MDBIcon
                  fas
                  size="lg"
                  icon="long-arrow-alt-left"
                  style={{ float: "left" }}
                />
              </MDBBtn>
              <h3 className="capitalize">{tour.title}</h3>
              <span>
                <p className="text-start tourName capitalize">
                  Created By: {tour.name}
                </p>
              </span>
              <div style={{ float: "left" }}>
                <span className="text-start">
                  {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
                </span>
              </div>
              <br />
              <MDBCardText className="text-start mt-2">
                <MDBIcon
                  style={{ float: "left", margin: "5px" }}
                  far
                  icon="calendar-alt"
                  size="lg"
                />
                <small className="text-muted">
                  {moment(tour.createdAt).fromNow()}
                </small>
              </MDBCardText>
              <MDBCardText className="lead mb-0 text-start">
                {tour.description}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        ) : (
          <MDBCard className="loader-center">
            <Spinner />
          </MDBCard>
        )}
      </MDBContainer>
    </>
  );
};

export default SingleTour;
