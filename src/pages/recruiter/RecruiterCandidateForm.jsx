import moment from "moment-timezone";
import React, { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  submitCandidate,
  jobsDetails,
  uploadFile,
  submitCandidateByCsv,
} from "../../api/api";
import "../employer/EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import iconimg from "../../assets/imgs/icon.png";
import uploadIcon from "../../assets/imgs/upload-icon.png";
import queryString from "query-string";
import { Button } from "@mui/material";


function RecruiterCandidateForm() {
  const [jobPostings, setJobPostings] = useState({});
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  let url = location.search;
  const inputRef = useRef(null);

  let getCode = queryString.parse(url);
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
    setTimeout(() => {
      setPageLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await jobsDetails(getCode?.jobId);
      console.log("resp  >>>>>>>>>> ", resp);
      if(resp?.data?.status == "401"){
        localStorage.clear();
        navigate("/")

      }
      if (resp?.data?.error == false) {
        setJobPostings(resp?.data?.data);
        setFetching(false);
      }
      // ...
    }
    fetchData();
  }, [status, fetching]);

  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event) => {
    // console.log(event.target.files[0], "file");
    onFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (file) => {
    console.log(file, "data");
    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(formData)
      .then((res) => {
        console.log(res, "fileeee");
        const { data } = res;
        if (res?.response?.status == 500) {
          setErrorMessage(res?.response?.data?.message);
        } else {
          console.log(res, "res");
          // setImageLoader(true)
          setTimeout(() => {
            setErrorMessage("");
            setSelectedFile(data?.data?.fileurl);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const [quesArr, setQuesArr] = useState([]);

  const onQuesChange = (e, data, index) => {
    console.log(e.target.value, data);
    let toUpdate = [...quesArr];
    if (toUpdate[index]) {
      toUpdate[index]["answer"] = e.target.value.trim();
      toUpdate[index]["question"] = data;
    } else {
      toUpdate.push({
        answer: e.target.value.trim(),
        question: data,
      });
    }
    setQuesArr(toUpdate);
  };

  // useEffect(() => {
  //   console.log(quesArr, "quesArr");
  // }, [quesArr]);

  async function submitForm(event) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    const userData = {
      agency_job: getCode?.id,
      fname: formdata.get("fname"),
      lname: formdata.get("lname"),
      email: formdata.get("email"),
      phone: formdata.get("phone"),
      country: formdata.get("country"),
      state: formdata.get("state"),
      city: formdata.get("city"),
      pin: formdata.get("pin"),
      resume: selectedFile,
      linkedin_url: formdata.get("linkedin_url"),
      // must_have_qualification_q_a: quesArr,
    };

    setLoading(true);
    const resp = await submitCandidate(userData);

    setTimeout(() => {
      setLoading(false);
     
    }, 2000);
    if (resp?.data?.error == false) {
      Toast.fire({
        icon: resp?.data?.error ? "error" : "success",
        title: resp?.data?.message,
      });
      navigate(-1);

    }
  }


  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files[0];
    // if (!fileObj) {
    //   return;
    // }else{
      onUploadCSV(fileObj)
    // }

  };

   // On CSV file upload (click the upload button)
   const onUploadCSV = async (file) => {
    // console.log(file, "data");
    
    const formData = new FormData();
    formData.append("agency_job", getCode?.id);
    formData.append("file", file);
    // for (const value of formData.keys()) {
    //   console.log(value,"keyssssss");
    // }
    // for (const value of formData.values()) {
    //   console.log(value,"valuessssss");
    // }
    
   
    await submitCandidateByCsv(formData)
    .then((res) => {
      // console.log(res, "fileeeesssssssssss");
      setTimeout(() => {
        // setErrorMessage(res?.data?.message);
       
        Toast.fire({
          icon: res?.data?.error ? "error" : "success",
          title: res?.data?.message,
        });
        navigate(-1)
      }, 2000);
    })
    .catch((err) => {
      Toast.fire({
        icon: res?.res?.data?.error ? "error" : "success",
        title: res?.res?.data?.message,
      });
    });
  };
  return (
    <>
      {pageLoading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="recent-jobsection">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="dash-heading">Candidate Submit Form</h3>
            </div>

            <form onSubmit={(e) => submitForm(e)}>
              <ul className="working-list">
                <li>
                  <div className="working-box">
                    <div className="box-header">
                      <div className="profile-details-header">
                        <div className="logo">
                          <img src={iconimg} />
                        </div>
                        <div className="job-company">
                          <h4 className="job-title">{jobPostings?.job_name}</h4>
                          <div className="job-location">
                            <div className="company-name">
                              {jobPostings?.designation}
                            </div>
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
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M10.25 7.5C10.25 8.19036 9.69036 8.75 9 8.75C8.30964 8.75 7.75 8.19036 7.75 7.5C7.75 6.80964 8.30964 6.25 9 6.25C9.69036 6.25 10.25 6.80964 10.25 7.5Z"
                                  stroke="#FFB800"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <h5>{jobPostings?.job_location?.join(", ")}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="other-details">
                        <ul className="info-list">
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
                            {moment(jobPostings.createdAt).fromNow()}
                          </li>
                          {jobPostings?.hide_compensation == false && (
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
                              {jobPostings?.min_compensation} -{" "}
                              {jobPostings?.max_compensation}{" "}
                              {jobPostings?.compensation_type.toUpperCase()}
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

                            {jobPostings?.must_have_skills && jobPostings?.must_have_skills.join(", ")}
                          </li>
                          <li>
                          
                            <input onChange={handleFileChange} accept="application/csv" type="file" placeholder="Upload CSV">
                         
                          </input>
                           
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="form-box">
                <h4 className="form-heading">Personal Information</h4>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="fname"
                        placeholder="First Name"
                        name="fname"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="lname"
                        placeholder="Last Name"
                        name="lname"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        maxLength={10}
                        type="tel"
                        className="input-style2"
                        id="phone"
                        placeholder="Phone Number"
                        name="phone"
                      />
                    </div>
                  </div>
                  {/* <div class="col-md-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="input-style2"
                        id=""
                        placeholder="Extension (optional)"
                        name=""
                      />
                    </div>
                  </div> */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        type="email"
                        className="input-style2"
                        id="email"
                        placeholder="Email Confirmation"
                        name="email"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="country "
                        placeholder="Country"
                        name="country"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="city"
                        placeholder="City"
                        name="city"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="input-style2"
                        id="state"
                        placeholder="State"
                        name="state"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mb-3">
                      <input
                        required
                        type="tel"
                        maxLength={6}
                        className="input-style2"
                        id="pin"
                        placeholder="PIN Code"
                        name="pin"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <span className="text-danger mx-3">{errorMessage}</span>

                  <div className="col-md-4">
                    <div className="mb-3">
                      {/* <div class="upload-file">
                        <input required onChange={onFileChange}  type="file" class="" id="resume" name="resume" />
                        <span>Upload Resume</span>
                      </div> */}
                      <div className="upload-wrap">
                        <div className="upload">
                          <div className="overlap-upload">
                            {selectedFile !== "" ? (
                              <img className="imageFont" src={selectedFile} />
                            ) : (
                              <img src={uploadIcon} />
                            )}

                            <p>
                              <span>Click to upload</span> or drag and drop Resume
                              PDF here
                            </p>
                          </div>
                          <input
                            // accept="application/pdf"
                            onChange={onFileChange}
                            type="file"
                            id="gst_file"
                            className="fileupload"
                            name="gst_file"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="input-style2"
                        id="linkedin_url"
                        placeholder="LinkedIn Profile URl"
                        name="linkedin_url"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-box">
                {/* <h4 className="form-heading">
                  Must-Have Qualifications
                  <p className="sub-heading-text">
                    Describe how your candidate meets each of must-haves. Use
                    this as a place to highlight candidate’s strengths.
                  </p>
                </h4>
                {jobPostings?.screeing_questions?.length > 0 &&
                  jobPostings?.screeing_questions?.map((x, i) => {
                    return (
                      <div className="mb-3">
                        <p>
                          {i + 1}. {x}
                        </p>
                        <textarea
                          className="textarea-style2"
                          rows="5"
                          id="comment"
                          name="must_have_qualification_q_a"
                          onChange={(e) => onQuesChange(e, x, i)}
                        ></textarea>
                      </div>
                    );
                  })} */}

                <div className="form-check custom-check">
                  <input
                    required
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="check"
                  />
                  <label className="form-check-label" for="check">
                    I agree to comply with your <a href="#"> privacy policy </a>{" "}
                    and <a href="#">terms & conditions</a>
                  </label>
                </div>
                {/* <span  className="text-danger mx-3">{errorMessage}</span> */}

                <button
                  type="submit"
                  className="next full-width-btm loginBtnLoader"
                >
                  {loading == true ? (
                    <Loader className="btnLoader" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default RecruiterCandidateForm;
