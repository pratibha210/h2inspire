import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { inviteMultipleAgencies, agencyInvitedallList } from "../../api/api";
import "./EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import jobLoc from "../../assets/imgs/jobLoc.svg";

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
function AgencyList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await agencyInvitedallList();
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setJobPostings(
          resp?.data?.data.filter((e) => (status ? e.status == status : e))
        );
        setFetching(false);
      }
      // ...
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetchData();
  }, [status, fetching]);

  ////// selct multiple agency function //////

  const [modalopen, setModalOpen] = React.useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [selectButton, setSelectButton] = useState(false);

  const handleModalOpen = (e) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setErrormsg("");
  };

  const inviteAgencyFunc = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    if (!formdata.get("email")) return false;

    const body = {
      email: formdata
        .get("email")
        ?.split("|")
        .map((e) => e.trim()),
      callback: window.location.origin + "/agency/register",
    };
    setSelectButton(true);
    const resp = await inviteMultipleAgencies(body);
    console.log("Agency resp  >>>>>>>>>> ", resp);
    if (resp?.data?.error == false) {
      handleModalClose();
      setSelectButton(false);
      // setAgencyList(resp?.data?.data);
    } else {
      setErrormsg(resp?.data?.message);
      setSelectButton(false);
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
              <h3 className="dash-heading">{"Agency"}</h3>
            </div>
            <ul className="job-list job-list__single">
              <li>
                <button onClick={() => handleModalOpen()}>INVITE AGENCY</button>
              </li>
              {jobPostings.length ? (
                jobPostings.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          <div className="job-company">
                            <h4>Agency Email Id</h4>
                            <div className="job-location">
                              <span>
                              
                                <img src={jobLoc} alt="job location" />
                              </span>
                              <h5>{e.email}</h5>
                            </div>
                          </div>
                          <div className="button-holder">
                            <p
                              // to={"#"}
                              className="light-btm  m-3"
                            >
                              {e?.status === "0"
                                ? "Pending"
                                : e?.status === "1"
                                ? "Working on"
                                : e?.status === "2" && "Declined"}
                            </p>
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

            <Modal
              open={modalopen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={(e) => inviteAgencyFunc(e)}>
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Assign multiple Agencies by email id
                  </Typography>

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <h4 className="form-heading">Email (use '|' separator)</h4>

                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="agency email"
                        placeholder=""
                        name="email"
                      />
                    </div>
                  </FormControl>
                  <span className="text-danger mx-3">{errormsg}</span>
                  <button
                    type="submit"
                    className="full-width-btm loginBtnLoader"
                  >
                    {selectButton == true ? (
                      <Loader className="btnLoader" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </Box>
              </form>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default AgencyList;
