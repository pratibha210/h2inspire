import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  adminAgencyApproval,
  allAencyList,
} from "../../api/api";
import "./Dashboard.css";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function AdminAgencyList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await allAencyList();
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setJobPostings(resp?.data?.data);
        setFetching(false);
      }else{
        localStorage.clear();
        navigate("/admin/login")
      }
      // ...
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetchData();
  }, [status, fetching]);

  async function updateStatus(evt, status, id) {
    evt.preventDefault();
    console.log({ status, id });
  
    if(status == "true"){
      Swal.fire({
        title: "Do you want Approv this Agency?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `Keep it pending`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const resp = await adminAgencyApproval({"is_approved": status },id);
          if (resp?.data?.error == false) {
            Toast.fire({
              icon: resp?.data?.error ? "error" : "success",
              title: resp?.data?.message,
            });
            setFetching(true);
          } else {
            Toast.fire({
              icon: resp?.response?.data?.error ? "error" : "success",
              title: resp?.response?.data?.message,
            });
          }
        }
        
        else if (result.isDenied) {
        }
      });
    }
    else{
    Swal.fire({
      title: "Do you want to decline the Agency?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Keep it pending`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const resp = await adminAgencyApproval({"is_approved": status},id);
        if (resp?.data?.error == false) {
          Toast.fire({
            icon: resp?.data?.error ? "error" : "success",
            title: resp?.data?.message,
          });
          setFetching(true);
        } else {
          Toast.fire({
            icon: resp?.response?.data?.error ? "error" : "success",
            title: resp?.response?.data?.message,
          });
        }
      }
      
      else if (result.isDenied) {
      }
    });
  }
  }

  return (
    <>
      {loading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="recent-jobsection">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="dash-heading">
              {"All Agency"}
              </h3>
             
            </div>
            <ul className="job-list job-list__single">
              {jobPostings.length ? (
                jobPostings.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                         
                          <div className="job-company">
                            <h4>
                            {e?.name}
                            </h4>
                            <div className="job-location">
                              <span>
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.75 7.5C14.75 9.72306 13.2968 11.9167 11.649 13.656C10.8456 14.504 10.0388 15.1992 9.43176 15.6826C9.27222 15.8096 9.12703 15.9216 9 16.0174C8.87297 15.9216 8.72778 15.8096 8.56824 15.6826C7.96117 15.1992 7.15436 14.504 6.35095 13.656C4.70324 11.9167 3.25 9.72306 3.25 7.5C3.25 5.97501 3.8558 4.51247 4.93414 3.43414C6.01247 2.3558 7.47501 1.75 9 1.75C10.525 1.75 11.9875 2.3558 13.0659 3.43414C14.1442 4.51247 14.75 5.97501 14.75 7.5Z"
                                    stroke="#FFB800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M10.25 7.5C10.25 8.19036 9.69036 8.75 9 8.75C8.30964 8.75 7.75 8.19036 7.75 7.5C7.75 6.80964 8.30964 6.25 9 6.25C9.69036 6.25 10.25 6.80964 10.25 7.5Z"
                                    stroke="#FFB800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </span>
                              <h5>{e.corporate_email}</h5>
                            </div>
                          </div>
                          <div className="button-holder">
                          <p
                              onClick={() =>navigate(`/admin/agency-details?id=${e?._id}`)}
                              className="light-btm blue-light m-3"
                            >
                              Details
                            </p>
                         
                            {e?.is_approved == false ?
                          <p className="light-btm blue-light" onClick={(evt) => updateStatus(evt, "true", e?._id)}>
                         Approve 
                            </p>
                            :
                            <p className="light-btm red-light" onClick={(evt) => updateStatus(evt, "false", e?._id)}>
                              Decline
                            </p>
                          }
                           
                          </div>
                        </div>
                        
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>No data found !!</p>
              )}
            </ul>

           
          </div>
        </>
      )}
    </>
  );
}

export default AdminAgencyList;
