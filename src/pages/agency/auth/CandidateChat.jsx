import React,{useState,useEffect} from 'react'
import mailIcon from "../../../assets/imgs/mail.svg"
import phoneIcon from "../../../assets/imgs/phone.svg"
import placeIcon from "../../../assets/imgs/place.svg"
import submitIcon from "../../../assets/imgs/submit.svg"
import link from "../../../assets/imgs/link.svg"
import resumeTemplate from "../../../assets/imgs/resume-template.png"
import "./CandidateChat.css"
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { candidateDetails,uploadResume } from '../../../api/api'
import Swal from "sweetalert2";
import Loader from "@mui/material/CircularProgress";

export default function CandidateChat() {
    let url = location.search;
    const [status, setStatus] = useState("");
    const [fetching, setFetching] = useState(false);
const [loading, setLoading] = useState(false);
    const [candidateData,setCandidateData] = useState({})
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
        async function fetchData() {
          // You can await here
          const resp = await candidateDetails(getCode?.id);
          console.log("resp  >>>>>>>>>> ", resp);
          if(resp?.data?.status == "401"){
            localStorage.clear();
            navigate("/")
    
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

      const onFileChange = (event,id) => {
        onFileUpload(event.target.files[0],id);
      };
    
      // On file upload (click the upload button)
      const onFileUpload = async (data,id) => {
        console.log(data, "data");
        const formData = new FormData();
        formData.append("resume", data);
        setLoading(true);
     await uploadResume(formData,id)
          .then((resp) => {
            const { data } = resp;
            setTimeout(()=>{
                setLoading(false);
               },3000)
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
            <div className="popup-header-left">Market Director - <span>2 Locations</span></div>
            {/* <a href="javascript:void(0)" className="opup-close">
                <i className="fa-solid fa-xmark"></i>
            </a> */}
        </div>
        <div className="candidate-place">
            <div className="candidate-details-header">
                <div className="name-short">
                <img src="/src/assets/imgs/profile.svg" />
                </div>
                <div className="candidate-det">
                    <a href="" className="candidate-name">{candidateData?.fname} {candidateData?.lname}</a>
                    <div className="candidate-det-box">
                        <a href="#" className="mail"> <span><img src={mailIcon}/></span>{candidateData?.email}</a>
                        <a href="#" className="phone"> <span><img src={phoneIcon}/></span>{candidateData?.phone}</a>
                        <div className="place"><span><img src={placeIcon}/></span>{candidateData?.city} {candidateData?.state} {candidateData?.country}, {candidateData?.pin},</div>
                    </div>
                </div>
            </div>
            <a href="#" className="light-btm red-light">Withdraw</a>
        </div>
        <div className="popup-tab-place">
            <div className="nav nav-tabs custom-tab" id="nav-tab" role="tablist">
                <button className="active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_151_17)">
                            <path d="M17.672 0.749451H2.10938C0.945938 0.749451 0 1.69586 0 2.85883V14.1089C0 15.2724 0.945938 16.2183 2.10938 16.2183C3.58547 16.2183 3.78375 16.2183 3.78375 16.2183H4.21875V19.734C4.21875 20.3612 4.97906 20.671 5.41875 20.2313C7.38188 18.2677 6.00328 19.6468 9.22552 16.4245C9.3577 16.2924 9.53583 16.2183 9.72286 16.2183H17.672C18.8349 16.2183 19.7813 15.2724 19.7813 14.1089C19.7813 7.54356 19.7813 9.44012 19.7813 2.85883C19.7814 1.69586 18.835 0.749451 17.672 0.749451ZM3.51567 4.9682H13.4533C13.8419 4.9682 14.1564 5.28273 14.1564 5.67133C14.1564 6.05992 13.8419 6.37445 13.4533 6.37445H3.51567C3.12708 6.37445 2.81255 6.05992 2.81255 5.67133C2.81255 5.28273 3.12708 4.9682 3.51567 4.9682ZM10.6407 11.9995H3.51567C3.12708 11.9995 2.81255 11.685 2.81255 11.2964C2.81255 10.9078 3.12708 10.5933 3.51567 10.5933H10.6407C11.0293 10.5933 11.3438 10.9078 11.3438 11.2964C11.3438 11.685 11.0293 11.9995 10.6407 11.9995ZM16.2658 9.187H3.51567C3.12708 9.187 2.81255 8.87247 2.81255 8.48387C2.81255 8.09528 3.12708 7.78075 3.51567 7.78075H16.2658C16.6544 7.78075 16.9689 8.09528 16.9689 8.48387C16.9689 8.87247 16.6544 9.187 16.2658 9.187Z" fill="#878787"/>
                            <path d="M21.8903 3.56201H21.1966V14.109C21.1966 16.0474 19.61 17.6247 17.6715 17.6247H10.1074L8.60742 19.0215H14.5679L18.5807 23.0437C19.0215 23.4845 19.7809 23.1751 19.7809 22.5466V19.0215H21.8903C23.0535 19.0215 23.9997 18.0847 23.9997 16.9215V5.67143C23.9997 4.50823 23.0535 3.56201 21.8903 3.56201Z" fill="#878787"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_151_17">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </span>
                    Employee chat
                </button>
                <button className="" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"> 
                    <span>
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 6.5C12.9033 6.5 12.331 6.26295 11.909 5.84099C11.4871 5.41903 11.25 4.84674 11.25 4.25V0.5H3C2.40326 0.5 1.83097 0.737053 1.40901 1.15901C0.987053 1.58097 0.75 2.15326 0.75 2.75V19.25C0.75 19.8467 0.987053 20.419 1.40901 20.841C1.83097 21.2629 2.40326 21.5 3 21.5H15C15.5967 21.5 16.169 21.2629 16.591 20.841C17.0129 20.419 17.25 19.8467 17.25 19.25V6.5H13.5ZM6.75 4.25C7.19501 4.25 7.63002 4.38196 8.00003 4.62919C8.37004 4.87643 8.65843 5.22783 8.82873 5.63896C8.99903 6.0501 9.04358 6.5025 8.95677 6.93895C8.86995 7.37541 8.65566 7.77632 8.34099 8.09099C8.02632 8.40566 7.62541 8.61995 7.18895 8.70677C6.7525 8.79358 6.3001 8.74903 5.88896 8.57873C5.47783 8.40843 5.12643 8.12004 4.87919 7.75003C4.63196 7.38002 4.5 6.94501 4.5 6.5C4.5 5.90326 4.73705 5.33097 5.15901 4.90901C5.58097 4.48705 6.15326 4.25 6.75 4.25V4.25ZM3.75 11.75C3.75 11.1533 3.98705 10.581 4.40901 10.159C4.83097 9.73705 5.40326 9.5 6 9.5H7.5C8.09674 9.5 8.66903 9.73705 9.09099 10.159C9.51295 10.581 9.75 11.1533 9.75 11.75V13.25C9.75 13.4489 9.67098 13.6397 9.53033 13.7803C9.38968 13.921 9.19891 14 9 14H4.5C4.30109 14 4.11032 13.921 3.96967 13.7803C3.82902 13.6397 3.75 13.4489 3.75 13.25V11.75ZM13.5 17.75H4.5C4.30109 17.75 4.11032 17.671 3.96967 17.5303C3.82902 17.3897 3.75 17.1989 3.75 17C3.75 16.8011 3.82902 16.6103 3.96967 16.4697C4.11032 16.329 4.30109 16.25 4.5 16.25H13.5C13.6989 16.25 13.8897 16.329 14.0303 16.4697C14.171 16.6103 14.25 16.8011 14.25 17C14.25 17.1989 14.171 17.3897 14.0303 17.5303C13.8897 17.671 13.6989 17.75 13.5 17.75ZM13.5 14H12C11.8011 14 11.6103 13.921 11.4697 13.7803C11.329 13.6397 11.25 13.4489 11.25 13.25C11.25 13.0511 11.329 12.8603 11.4697 12.7197C11.6103 12.579 11.8011 12.5 12 12.5H13.5C13.6989 12.5 13.8897 12.579 14.0303 12.7197C14.171 12.8603 14.25 13.0511 14.25 13.25C14.25 13.4489 14.171 13.6397 14.0303 13.7803C13.8897 13.921 13.6989 14 13.5 14ZM13.5 10.25H12C11.8011 10.25 11.6103 10.171 11.4697 10.0303C11.329 9.88968 11.25 9.69891 11.25 9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75H13.5C13.6989 8.75 13.8897 8.82902 14.0303 8.96967C14.171 9.11032 14.25 9.30109 14.25 9.5C14.25 9.69891 14.171 9.88968 14.0303 10.0303C13.8897 10.171 13.6989 10.25 13.5 10.25Z" fill="#878787"/>
                            <path d="M13.5 5H16.815L12.75 0.934998V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5Z" fill="#878787"/>
                        </svg>
                    </span>
                    Resume
                </button>
            </div>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="chat-place">
                        <form action="" id="">
                            <div className="chat-header">
                                <div className="candidate-details-header">
                                    <div className="name-short">
                                        JS
                                    </div>
                                    <div className="candidate-det">
                                        <a href="" className="candidate-name">Jhonthan Stephenson</a>
                                        <div className="candidate-det-box">
                                            Vatican City
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-body">
                                <div className="riceived">
                                    <div className="re-message-box">Hi Jhonthan - any interest in Moergan</div>
                                    <div className="re-date">17 June, 2022</div>
                                </div>
                                <div className="send">
                                    <div className="se-message-box">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.....</div>
                                    <div className="se-date">17 June, 2022</div>
                                </div>
                                <div className="riceived">
                                    <div className="re-message-box">Hi Jhonthan - any interest in Moergan</div>
                                    <div className="re-date">17 June, 2022</div>
                                </div>
                                <div className="send">
                                    <div className="se-message-box">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.....</div>
                                    <div className="se-date">17 June, 2022</div>
                                </div>
                            </div>
                            <div className="chat-comment">
                                <input type="text" name="" id=""/>
                                <button type="submit" id="submit" className="chat-btm">
                                    <img src={submitIcon}/>
                                </button>
                                <div className="upload-chat">
                                    <span><img src={link}/></span>
                                    <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                
                    <div className="view-holder">
                    {/* {candidateData?.resume !=='' && <img src={resumeTemplate}/>} */}
                    {candidateData?.resume !=='' && 
                   <embed type="application/pdf" src={candidateData?.resume} width="957" height="600"/>
                   
                    
                    }
                   
                        <div className='button-holder-place'>
                            <h6>Click to Upload resume</h6>
                            <div class="button-type">
                               
                                 <input accept="application/pdf" defaultValue={selectedFile} type="file" onChange={(e)=>onFileChange(e,candidateData?._id)} />
                                 Upload Resume
                               
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
        </div>
    </div>
      </>)}
    </div>
  )
}
