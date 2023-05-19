import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {updateStatus,
  inviteMultipleRecruiter,
  recruiterInvitedallList,
} from "../../../api/api";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from "@mui/material/CircularProgress";
import Switch from '@mui/material/Switch';
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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




const label = { inputProps: { 'aria-label': 'Switch demo' } };
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

function RecruiterList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = React.useState(true);
const [errorMessage,setErrorMessage] =useState('')
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
      const resp = await recruiterInvitedallList();
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


const recruiterList= async()=>{
  await recruiterInvitedallList()
  .then((res) => {
    console.log(res,"fileeee");
    const { data } = res;
    if(res?.response?.status == 500){
      // setErrorMessage(res?.response?.data?.message)
     
    }else{
     
      setJobPostings(data?.data);
  }
  })
  .catch((err) => {
    console.log(err, "err");
  });
}


const onStatusChange= async(e,id)=>{
  console.log(e.target.checked,id);

let body = {
  status : e.target.checked
}
  await updateStatus(body,id)
  .then((res) => {
    console.log(res,"fileeee");
    const { data } = res;
    if(res?.response?.status == 500){
      setErrorMessage(res?.response?.data?.message)
      Toast.fire({
        icon: res?.response?.data?.error ? "error" : "success",
        title: res?.response?.data?.message,
      });
    }else{
      Toast.fire({
        icon: res?.data?.error ? "error" : "success",
        title: res?.data?.message,
      });
    recruiterList();
  }
  })
  .catch((err) => {
    console.log(err, "err");
  });


}



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
      callback: window.location.origin + "/recruiter/login"
    };
    setSelectButton(true);
    const resp = await inviteMultipleRecruiter(body);
    console.log("Agency resp  >>>>>>>>>> ", resp);
    if (resp?.data?.error == false) {
      handleModalClose();
      setSelectButton(false);
      // setAgencyList(resp?.data?.data);
    } else {
      setErrormsg(resp?.data?.message);
      setSelectButton(false);
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
                {"Recruiter"}
              </h3>

            </div>
            <ul className="job-list job-list__single">
            <li><button  onClick={() => handleModalOpen()}>INVITE RECRUITER</button></li>
              {jobPostings.length ? (
                jobPostings.map((x, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">

                          <div className="job-company">
                            <h4>
                              Recruiter Email Id
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
                              <h5>{x.email}</h5>
                            </div>
                          </div>
                          <div className="button-holder">
                            <FormGroup>
                              {x?.status == true ?
                              <FormControlLabel control={<Switch checked={x?.status} onClick={(e)=> onStatusChange(e,x?._id)}/>} label="Active" />
                              :
                              <FormControlLabel control={<Switch checked={x?.status} onClick={(e)=> onStatusChange(e,x?._id)}  />} label="Inactive" />
                              }
                            </FormGroup>
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign multiple Rcruiter by email id
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

export default RecruiterList;
