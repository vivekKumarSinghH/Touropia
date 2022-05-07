import React, { useRef, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import decode from "jwt-decode";
export default function Header() {
  const [show, setShow] = useState(false);
  const [search,setSearch]=useState("")
  const s = {
    color: "#606080",
    margin: "20px"
  };
  const x = {
    
    margin: "20px 0 20px 0"
  };
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { user } = useSelector((state) => ( state.auth ));
 

  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    // console.log(decodedToken.exp*1000-new Date().getTime())
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
 const handleLogout=()=>{
  dispatch(setLogout());
 }
 
 const handleSubmit = (e) => {
  e.preventDefault();
  if (search) {
    dispatch(searchTours(search));
    navigate(`/tours/search?searchQuery=${search}`);
    setSearch("");
  } else {
    navigate("/");
  }
};
  return (
    <div>
      <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#E4D1B9" }}>
        <MDBContainer>
          <MDBNavbarBrand
            href="/"
            style={{ color: "#606080", fontWeight: "600", fontSize: "32px" }}
          >
            <span >tour</span> <span style={{color:"#97C4B8"}}>Opia</span>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle Navigation"
            onClick={() => setShow(!show)}
            style={{ color: "#606080" }}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0 ">
            <MDBNavbarItem style={x}>
            {user?.result?._id && (
             
              <Link to="/" style={s}>
           
              Logged in as: {user?.result?.name}
        
                </Link>
            )}
            
            </MDBNavbarItem>
            <MDBNavbarItem style={x}>
                <Link to="/" style={s}>
                  Home
                </Link>
              </MDBNavbarItem>
              {user?.result?._id && (
                <>
              <MDBNavbarItem style={x}>
                <Link to="/addtour" style={s}>
                  Add Tour
                </Link>
              </MDBNavbarItem>

              <MDBNavbarItem style={x}>
                <Link to="/dashboard" style={s}>
                  DashBoard
                </Link>
              </MDBNavbarItem>
              </>
              )}

              
            {user?.result?._id ? (
              <MDBNavbarItem style={x}>
                <Link to="/login" style={s} onClick={handleLogout}>
                  Logout
                </Link>
              </MDBNavbarItem>):
(
              <MDBNavbarItem style={x}>
                <Link to="/login" style={s}>
                  Login
                </Link>
              </MDBNavbarItem>

              )}
            </MDBNavbarNav>
            <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
