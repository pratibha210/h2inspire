import React, { useState, useEffect } from "react";
import mailIcon from "../../assets/imgs/mail.svg";
import phoneIcon from "../../assets/imgs/phone.svg";
import placeIcon from "../../assets/imgs/place.svg";
import submitIcon from "../../assets/imgs/submit.svg";
import link from "../../assets/imgs/link.svg";
import resumeTemplate from "../../assets/imgs/resume-template.png";
import "./RecruiterCandidateChat.css";
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { candidateDetails, uploadResume } from "../../api/api";
import Swal from "sweetalert2";
import Loader from "@mui/material/CircularProgress";

import profile1 from "../../assets/imgs/profile.svg";
import candidate1 from "../../assets/imgs/candidate1.svg";
import candidate2 from "../../assets/imgs/candidate2.svg";

export default function RecruiterCandidateChat() {
  let url = location.search;
  const [candidateData, setCandidateData] = useState({});
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  let getCode = queryString.parse(url);
  const [loading, setLoading] = useState(false);
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
      const resp = await candidateDetails(getCode?.id);
      console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.status == "401") {
        localStorage.clear();
        navigate("/");
      }
      if (resp?.data?.error == false) {
        setCandidateData(resp?.data?.data);
        setFetching(false);
      }
      // ...
    }
    fetchData();
  }, [status, fetching]);

  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event, id) => {
    onFileUpload(event.target.files[0], id);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (data, id) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("resume", data);
    // console.log(data);
    setLoading(true);
    await uploadResume(formData, id)
      .then((resp) => {
        const { data } = resp;
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        if (resp?.data?.error == false) {
          Toast.fire({
            icon: resp?.data?.error ? "error" : "success",
            title: resp?.data?.message,
          });
          setFetching(true);
          setSelectedFile(data.name);
        } else {
          Toast.fire({
            icon: resp?.response?.data?.error ? "error" : "success",
            title: resp?.response?.data?.message,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="">
            <div className="popup-menu-header">
              <div className="popup-header-left">
                Market Director - <span>2 Locations</span>
              </div>
              {/* <a href="javascript:void(0)" className="opup-close">
                <i className="fa-solid fa-xmark"></i>
            </a> */}
            </div>
            <div className="candidate-place">
              <div className="candidate-details-header">
                <div className="name-short">
                  <img src={profile1} />
                </div>
                <div className="candidate-det">
                  <a href="" className="candidate-name">
                    {candidateData?.fname} {candidateData?.lname}
                  </a>
                  <div className="candidate-det-box">
                    <a href="#" className="mail">
                      {" "}
                      <span>
                        <img src={mailIcon} />
                      </span>
                      {candidateData?.email}
                    </a>
                    <a href="#" className="phone">
                      {" "}
                      <span>
                        <img src={phoneIcon} />
                      </span>
                      {candidateData?.phone}
                    </a>
                    <div className="place">
                      <span>
                        <img src={placeIcon} />
                      </span>
                      {candidateData?.city} {candidateData?.state}{" "}
                      {candidateData?.country}, {candidateData?.pin},
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="light-btm red-light">
                Withdraw
              </a>
            </div>
            <div className="popup-tab-place">
              <div
                className="nav nav-tabs custom-tab"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className="active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  <span>
                    <img src={candidate1} />
                  </span>
                  Employee chat
                </button>
                <button
                  className=""
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  <span>
                    <img src={candidate2} />
                  </span>
                  Resume
                </button>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="chat-place">
                    <form action="" id="">
                      <div className="chat-header">
                        <div className="candidate-details-header">
                          <div className="name-short">JS</div>
                          <div className="candidate-det">
                            <a href="" className="candidate-name">
                              Jhonthan Stephenson
                            </a>
                            <div className="candidate-det-box">
                              Vatican City
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-body">
                        <div className="riceived">
                          <div className="re-message-box">
                            Hi Jhonthan - any interest in Moergan
                          </div>
                          <div className="re-date">17 June, 2022</div>
                        </div>
                        <div className="send">
                          <div className="se-message-box">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took.....
                          </div>
                          <div className="se-date">17 June, 2022</div>
                        </div>
                        <div className="riceived">
                          <div className="re-message-box">
                            Hi Jhonthan - any interest in Moergan
                          </div>
                          <div className="re-date">17 June, 2022</div>
                        </div>
                        <div className="send">
                          <div className="se-message-box">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took.....
                          </div>
                          <div className="se-date">17 June, 2022</div>
                        </div>
                      </div>
                      <div className="chat-comment">
                        <input type="text" name="" id="" />
                        <button type="submit" id="submit" className="chat-btm">
                          <img src={submitIcon} />
                        </button>
                        <div className="upload-chat">
                          <span>
                            <img src={link} />
                          </span>
                          <input
                            type="file"
                            accept="image/png, image/jpg, image/gif, image/jpeg"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="view-holder">
                    {/* {candidateData?.resume !=='' && <img src={resumeTemplate}/>} */}
                    {candidateData?.resume !== "" && (
                      <embed
                        type="application/pdf"
                        src={candidateData?.resume}
                        width="957"
                        height="600"
                      />
                    )}

                    <div className="button-holder-place">
                      <h6>Click to Upload resume</h6>
                      <div className="button-type">
                        <input
                          accept="application/pdf"
                          defaultValue={selectedFile}
                          type="file"
                          onChange={(e) => onFileChange(e, candidateData?._id)}
                        />
                        Upload Resume
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
