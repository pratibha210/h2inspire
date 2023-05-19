import React,{useEffect, useState} from 'react'
import JoinAsSection from './JoinAsSection'
import { allJobPostings } from "../../api/api"
import { useNavigate, useLocation } from "react-router-dom";


function JobsGrid(props) {
    const[jobArr, setJobarr] = useState([])


  /* To call Employer register API function  */
  const jobList = async () => {
   
      await allJobPostings()
        .then((res) => {
            console.log(res,"res");
            const{data}= res;
            setJobarr(data?.data)
         
        })
        .catch((err) => {
          // console.log(err, "err");
        });
    }


  useEffect(()=>{
    jobList()
  },[props])



  return (
    <section className="job-listing-section">
        <div className="container">
            <div className="d-md-flex justify-content-between align-items-center">
                <div className="left mb-4 mb-lg-0">
                    <h3 className="section-heading-small">Choose our available <span>jobs</span></h3>
                    <p className="sub-heading-text">Find the following job that suits you and apply now</p>
                </div>
                <div className="right">
                    <div className="tab-nav">
                        <a href="#list1" className="active">Recent Jobs</a>
                        <a href="#list2">Popular Jobs</a>
                    </div>
                </div>
            </div>
            <div className="tabs-content">
                <div id="list1" className="tab-content">
                    <ul className="job-list">
                    {jobArr && jobArr?.length > 0 && jobArr.map((item)=>{
                        return(

                      
                        <li>
                            <div className="job-box">
                                <div className="job-header">
                                    <div className="logo">
                                        <img src="src/assets/imgs/icon.png" />
                                    </div>
                                    <div className="job-company">
                                        <h4>Microsoft</h4>
                                        <div className="job-location">
                                            <span>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.75 7.5C14.75 9.72306 13.2968 11.9167 11.649 13.656C10.8456 14.504 10.0388 15.1992 9.43176 15.6826C9.27222 15.8096 9.12703 15.9216 9 16.0174C8.87297 15.9216 8.72778 15.8096 8.56824 15.6826C7.96117 15.1992 7.15436 14.504 6.35095 13.656C4.70324 11.9167 3.25 9.72306 3.25 7.5C3.25 5.97501 3.8558 4.51247 4.93414 3.43414C6.01247 2.3558 7.47501 1.75 9 1.75C10.525 1.75 11.9875 2.3558 13.0659 3.43414C14.1442 4.51247 14.75 5.97501 14.75 7.5Z" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M10.25 7.5C10.25 8.19036 9.69036 8.75 9 8.75C8.30964 8.75 7.75 8.19036 7.75 7.5C7.75 6.80964 8.30964 6.25 9 6.25C9.69036 6.25 10.25 6.80964 10.25 7.5Z" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>  
                                            </span>
                                            <h5>Washington, USA</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-content">
                                    <h2>Senior UX Designer</h2>
                                    <p>You will be responsible for the Visual design for multi-device. Understand basic design, User Journey, Ideation and Wireframing etc..</p>
                                    <ul>
                                        <li>
                                            <span>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 16C12.4172 16 16 12.4172 16 8C16 3.58285 12.4172 0 8 0C3.58285 0 0 3.58285 0 8C0 12.4172 3.58285 16 8 16ZM7.42855 3.42858C7.42855 3.11428 7.6857 2.85713 8 2.85713C8.3143 2.85713 8.57145 3.11428 8.57145 3.42858V7.72572L11.2143 9.84001C11.46 10.0372 11.5 10.3971 11.3029 10.6429C11.1914 10.7829 11.0257 10.8571 10.8571 10.8571C10.7314 10.8571 10.6057 10.8171 10.5 10.7314L7.64288 8.44573C7.50859 8.33714 7.4286 8.1743 7.4286 8V3.42858H7.42855Z" fill="#5682ED"/>
                                                </svg>                                                        
                                            </span>
                                            10 hours ago
                                        </li>
                                        <li>
                                            <span>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z" fill="#5682ED"/>
                                                </svg>                                                         
                                            </span>
                                            ₹40k - ₹45k
                                        </li>
                                    </ul>
                                </div>
                                <div className="job-footer">
                                    <div className="job-short">
                                        <span>Full Time</span>
                                        <span>Part Time</span>
                                    </div>
                                    <a href="#">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.16667 10H15.8333" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M10 4.16675L15.8333 10.0001L10 15.8334" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>                                                
                                    </a>
                                </div>
                            </div>
                        </li>
                        )
                    })}
                       
                    </ul>
                </div>
              
            </div>

            {/* join as section here */}
            <JoinAsSection />
        </div>
    </section>
  )
}

export default JobsGrid