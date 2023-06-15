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
import agency1 from "../../../assets/imgs/agency1.svg";
import "./recruiter.css";


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
            <li><button  onClick={() => handleModalOpen()} className="recuiter_btn">invite recruiter</button></li>
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
                               <img src={agency1} />
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
