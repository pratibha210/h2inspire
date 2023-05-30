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
import agency1 from "../../assets/imgs/agency1.svg";
import agency2 from "../../assets/imgs/agency2.svg";
import agency3 from "../../assets/imgs/agency3.svg";
import agency4 from "../../assets/imgs/agency4.svg";
import agency5 from "../../assets/imgs/agency5.svg";
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
                              <img src={agency1} />
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
                              <img src={agency2} />
                              </span>
                              {moment(e.createdAt).fromNow()}
                            </li>
                            {e.hide_compensation == false && (
                              <li>
                                <span>
                                <img src={agency3} />
                                </span>
                                {e.min_compensation} - {e.max_compensation}{" "}
                                {e?.compensation_type.toUpperCase()}
                              </li>
                            )}
                            <li>
                              <span>
                              <img src={agency4} />
                              </span>
                              {e.min_work_exp} - {e.max_work_exp} years
                              experience
                            </li>
                            <li>
                              <span>
                              <img src={agency5} />
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
