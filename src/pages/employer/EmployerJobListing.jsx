import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  allJobPostingsByEmployer,
  updateJobPosting,
  allAencyList,
  inviteMultipleAgencies,
} from "../../api/api";
import "./EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
function EmployerJobListing() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [agencyList, setAgencyList] = useState([]);
  const [selectButton, setSelectButton] = useState(false);
  const [jobId, setJobId] = useState("");
  const [errormsg, setErrormsg] = useState("");
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

  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  ////// selct multiple agency function //////
  const handleOpen = (e) => {
    setOpen(true);
    setJobId(e);
  };

  const handleClose = () => {
    setPersonName([]);
    setErrormsg("");
    setOpen(false);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  ///// get all agency list API call function ///////////
  const getAgencyList = async () => {
    // You can await here
    const resp = await allAencyList();
    // console.log("Agency resp  >>>>>>>>>> ", resp);
    if (resp?.data?.error == false) {
      setAgencyList(resp?.data?.data);

      // setFetching(false);
    }
    // ...
  };

  useEffect(() => {
    getAgencyList();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await allJobPostingsByEmployer();
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setJobPostings(
          resp?.data?.data.filter((e) => (status ? e.status == status : e))
        );
        setFetching(false);
      }
      // ...
    }
    fetchData();
  }, [status, fetching]);

  function createMarkup(val) {
    return { __html: val };
  }

  async function updateStatus(evt, status, id) {
    evt.preventDefault();
    // console.log({ status, id });
    Swal.fire({
      title: "Do you want to close the position?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Keep it open`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const resp = await updateJobPosting({ status }, id);
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
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  const inviteAgencyFunc = async (e) => {
    e.preventDefault();
    if (personName?.length > 0) {
      let body = {
        jobId: jobId,
        agencyIds: personName,
      };
      setSelectButton(true);
      const resp = await inviteMultipleAgencies(body);
      console.log("Agency resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setSelectButton(false);
        setErrormsg("");
        handleClose();
        // setAgencyList(resp?.data?.data);
      } else {
        setErrormsg(resp?.response?.data?.message);
        setSelectButton(false);
      }
    } else {
      setErrormsg("Please select Agency");
    }
  };

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
                {status == "" && "All"} {status == "1" && "Active"}{" "}
                {status == "2" && "Closed"} {status == "3" && "Draft"} Jobs
              </h3>
              <div className="short">
                Sort By:
                <select
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={""}> All </option>
                  <option value={"1"}> Active </option>
                  <option value={"2"}> Closed </option>
                  <option value={"3"}> Drafts </option>
                </select>
              </div>
            </div>
            <ul className="job-list job-list__single">
              {jobPostings.length ? (
                jobPostings.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          <div className="logo">
                            <img
                              src={e?.employer?.employer_image}
                              alt="Employer image"
                            />
                          </div>
                          <div className="job-company">
                            <h4>
                              {e.job_name}
                              <span className="text-muted">
                                <small>
                                  {e.status == "1" && "(Active)"}
                                  {e.status == "2" && "(Closed)"}
                                  {e.status == "3" && "(Draft)"}
                                </small>
                              </span>
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
                              <h5>{e.job_location.join(", ")}</h5>
                            </div>
                          </div>
                          <div className="button-holder">
                            <Link
                              to={`/employer/job-posting?jobId=${e._id}`}
                              className="light-btm blue-light m-3"
                            >
                              Edit
                            </Link>
                            <a
                              href="#"
                              className="light-btm red-light"
                              onClick={(evt) => updateStatus(evt, "2", e._id)}
                            >
                              Close
                            </a>
                            {/* <a
                              href="#"
                              onClick={() => handleOpen(e._id)}
                              className="light-btm blue-light m-3"
                            >
                              Assign Agency
                            </a> */}
                          </div>
                        </div>
                        <div className="job-content">
                          <h2>{e.designation}</h2>
                          {/* {e.job_description} */}
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              e.job_description
                            )}
                          />
                          <ul>
                            <li>
                              <span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 16C12.4172 16 16 12.4172 16 8C16 3.58285 12.4172 0 8 0C3.58285 0 0 3.58285 0 8C0 12.4172 3.58285 16 8 16ZM7.42855 3.42858C7.42855 3.11428 7.6857 2.85713 8 2.85713C8.3143 2.85713 8.57145 3.11428 8.57145 3.42858V7.72572L11.2143 9.84001C11.46 10.0372 11.5 10.3971 11.3029 10.6429C11.1914 10.7829 11.0257 10.8571 10.8571 10.8571C10.7314 10.8571 10.6057 10.8171 10.5 10.7314L7.64288 8.44573C7.50859 8.33714 7.4286 8.1743 7.4286 8V3.42858H7.42855Z"
                                    fill="#5682ED"
                                  ></path>
                                </svg>
                              </span>
                              {moment(e.createdAt).fromNow()}
                            </li>
                            {e.hide_compensation == false && (
                              <li>
                                <span>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z"
                                      fill="#5682ED"
                                    ></path>
                                  </svg>
                                </span>
                                {e.min_compensation} - {e.max_compensation}{" "}
                                {e?.compensation_type.toUpperCase()}
                              </li>
                            )}
                            <li>
                              <span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z"
                                    fill="#5682ED"
                                  ></path>
                                </svg>
                              </span>
                              {e.min_work_exp} - {e.max_work_exp} years
                              experience
                            </li>
                            <li>
                              <span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.8 1.4H3.2C1.432 1.4 0 2.74489 0 4.39956V12.0004C0 13.6551 1.432 15 3.2 15H12.8C14.568 15 16 13.6551 16 12.0004V4.39956C16 2.74489 14.568 1.4 12.8 1.4V1.4ZM5.2 4.55067C6.216 4.55067 7.048 5.33644 7.048 6.296C7.048 7.25555 6.216 8.04133 5.2 8.04133C4.184 8.04133 3.352 7.25555 3.352 6.296C3.352 5.33644 4.184 4.55067 5.2 4.55067ZM8.296 11.7209C8.224 11.7964 8.112 11.8418 8 11.8418H2.4C2.288 11.8418 2.176 11.7964 2.104 11.7209C2.032 11.6453 1.992 11.5396 2 11.4338C2.136 10.1644 3.208 9.15956 4.552 9.03867C4.976 9.00089 5.416 9.00089 5.84 9.03867C7.184 9.15956 8.264 10.1644 8.392 11.4338C8.408 11.5396 8.368 11.6453 8.296 11.7209ZM13.6 11.7889H12C11.672 11.7889 11.4 11.532 11.4 11.2222C11.4 10.9124 11.672 10.6556 12 10.6556H13.6C13.928 10.6556 14.2 10.9124 14.2 11.2222C14.2 11.532 13.928 11.7889 13.6 11.7889ZM13.6 8.76667H10.4C10.072 8.76667 9.8 8.50978 9.8 8.2C9.8 7.89022 10.072 7.63333 10.4 7.63333H13.6C13.928 7.63333 14.2 7.89022 14.2 8.2C14.2 8.50978 13.928 8.76667 13.6 8.76667ZM13.6 5.74444H9.6C9.272 5.74444 9 5.48756 9 5.17778C9 4.868 9.272 4.61111 9.6 4.61111H13.6C13.928 4.61111 14.2 4.868 14.2 5.17778C14.2 5.48756 13.928 5.74444 13.6 5.74444Z"
                                    fill="#5682ED"
                                  />
                                </svg>
                              </span>
                              {e.must_have_skills.join(", ")}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>No data found !!</p>
              )}
            </ul>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Select Agency to assign
                </Typography>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {agencyList &&
                      agencyList?.length > 0 &&
                      agencyList?.map((item) => {
                        return (
                          <MenuItem
                            key={item._id}
                            value={item?._id}
                            style={getStyles(item?.name, personName, theme)}
                          >
                            {item?.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <span className="text-danger mx-3">{errormsg}</span>
                <button
                  type="button"
                  onClick={(e) => inviteAgencyFunc(e)}
                  className="full-width-btm loginBtnLoader"
                >
                  {selectButton == true ? (
                    <Loader className="btnLoader" />
                  ) : (
                    "Save"
                  )}
                </button>
              </Box>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default EmployerJobListing;
