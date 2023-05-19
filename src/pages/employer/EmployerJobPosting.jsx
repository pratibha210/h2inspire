import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./EmployerJobPosting.css";
import { CKEditor } from "ckeditor4-react";
import { jobPosting, jobPostingDetail, updateJobPosting } from "../../api/api";
import Swal from "sweetalert2";
import Loader from "@mui/material/CircularProgress";

function EmployerJobPosting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoader, setPageLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [jobPostingData, setJobPostingData] = useState({});
  const [screeningQuestions, setSecreeningQuestions] = useState([""]);
  const [jobDescription, setJobDescription] = useState("");
  const [jobStatus, setJobStatus] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [comensation, setcomensationHide] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (searchParams.get("jobId")) {
      setPageLoader(true)
      async function invokeFunction() {
        const jobDetailResp = await jobPostingDetail(searchParams.get("jobId"));
        setTimeout(()=>{
          setPageLoader(false)
        },5000)
        if (jobDetailResp?.data?.error == false) {
          setJobPostingData(jobDetailResp?.data?.data);
          setSecreeningQuestions(jobDetailResp?.data?.data?.screeing_questions);
          setJobDescription(jobDetailResp?.data?.data?.job_description);
          setcomensationHide(jobDetailResp?.data?.data?.hide_compensation);
        }
        // console.log("jobDetailResp >>>>>> ", jobDetailResp);
      }
      const jobDetailResp = invokeFunction();
    }
  }, [searchParams]);

  function createMarkup(val) {
    return { __html: val };
  }
 
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

  const getSubmitData = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    if (!formdata.get("job_name")) return false;
    // if(formdata.get("budget")) 
    const body = {
      job_name: formdata.get("job_name"),
      job_description: jobDescription,
      compensation_type:  formdata.get("compensation_type"),
      job_location: formdata
        .get("job_location")
        ?.split("|")
        .map((e) => e.trim()),
      designation: formdata.get("designation"),
      min_work_exp: formdata.get("min_work_exp"),
      max_work_exp: formdata.get("max_work_exp"),
      min_compensation: formdata.get("min_compensation"),
      max_compensation: formdata.get("max_compensation"),
      perk_and_benefits: formdata
        .get("perk_and_benefits")
        ?.split("|")
        .map((e) => e.trim()),
      hide_compensation: comensation,
      must_have_skills: formdata
        .get("must_have_skills")
        ?.split("|")
        .map((e) => e.trim()),
      good_to_have_skills: formdata
        .get("good_to_have_skills")
        ?.split("|")
        .map((e) => e.trim()),
      educational_qualification: formdata
        .get("educational_qualification")
        ?.split("|")
        .map((e) => e.trim()),
      industry: formdata
        .get("industry")
        ?.split("|")
        .map((e) => e.trim()),
      company_website_url: formdata.get("company_website_url"),
      corporate_website_url: formdata.get("corporate_website_url"),
      interview_steps: formdata
        .get("interview_steps")
        ?.split("|")
        .map((e) => e.trim()),
      screeing_questions: screeningQuestions,
      status: jobStatus,
      budget: formdata.get("budget")
    };

    setTimeout(() => {
      setLoader(true);
      handleSubmit(body);
    }, 5000);
  };
const [saveDraftLoader, setsaveDraftLoader] = useState(false)
  const handleSubmit = async (body) => {
   if(jobStatus== "1"){
    setsaveDraftLoader(true);
   }else{
    setButtonLoader(true);
   }
    const resp = searchParams.get("jobId")
      ? await updateJobPosting(body, searchParams.get("jobId"))
      : await jobPosting(body);
      setsaveDraftLoader(false)
    if (resp?.data?.error == false) {
      setButtonLoader(false);
      if(resp?.data?.credit){
      localStorage.setItem('CREDITS', JSON.stringify(resp?.data?.credit));
      }
      Toast.fire({
        icon: resp?.data?.error ? "error" : "success",
        title: resp?.data?.message,
      });
      navigate(-1, { replace: true });
    } else {
      setButtonLoader(false);

      setLoader(false);
      setErrorMessage(resp?.response?.data?.message);
      Toast.fire({
        icon: resp?.response?.data?.error ? "error" : "success",
        title: resp?.response?.data?.message,
      });
    }
    // console.log("Resp inside component >>>> ", resp);
  };

  // handle input change
  const handleScreeningQuestionInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...screeningQuestions];
    list[index] = value;
    setSecreeningQuestions(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...screeningQuestions];
    list.splice(index, 1);
    // console.log(index, list);
    setSecreeningQuestions(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSecreeningQuestions([...screeningQuestions, ""]);
  };

  const logEvent = (evt) => {
    // console.log("editor evt >>>> ", evt.editor.getData());
    setJobDescription(evt.editor.getData());
  };

  return (
    <div className="recent-jobsection">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="dash-heading">Job Posting</h3>
      
        <div className="short">
          <ul className="breadcrumb">
            <li>
              <Link to={"/employer/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/employer/jobs"}>All jobs</Link>
            </li>
            <li>Job posting</li>
          </ul>
        </div>
      </div>
      {pageLoader == true ? (
            <div className='contentLoader'>
                <Loader className='contentLoaderAnimate'/>
            </div>
      ) : <> 
      <form onSubmit={getSubmitData}>
        <div className="form-box">
          <h4 className="form-heading">Job Information</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="job_name">Job name</label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="job_name"
                  placeholder=""
                  name="job_name"
                  defaultValue={jobPostingData?.job_name}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="job_description">Job description</label>
                {/* <input type="text" className="input-style2" id="job_description" placeholder="Job description" name="job_description" /> */}
                {/* <textarea className="textarea-style2" id="job_description" placeholder="Job description" name="job_description" cols="30" rows="10"></textarea> */}

                <CKEditor
                  required
                  data={
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        jobPostingData.job_description
                      )}
                    />
                  }
                  initData={
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        jobPostingData.job_description
                      )}
                    />
                  }
                  config={{
                    toolbar: [
                      ["Source"],
                      ["Styles", "Format", "Font", "FontSize"],
                      ["Bold", "Italic"],
                      ["Undo", "Redo"],
                    ],
                  }}
                  // onFocus={logEvent}
                  onBlur={logEvent}
                  // onChange={logEvent}
                  // onSelectionChange={logEvent}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="designation">Designation</label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="designation"
                  placeholder=""
                  name="designation"
                  defaultValue={jobPostingData?.designation}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="mb-3">
                <label htmlFor="job_location">
                  Job locations (use '|' separator)
                </label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="job_location"
                  placeholder=""
                  name="job_location"
                  defaultValue={jobPostingData?.job_location?.join(" | ")}
                />
              </div>
            </div>
          </div>

          <h4 className="form-heading">Salary Information</h4>

          <div className="row mb-3">
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="min_work_exp">Min work exp.(In years)</label>
                <input
                  required
                  type="number"
                  className="input-style2"
                  id="min_work_exp"
                  placeholder=""
                  name="min_work_exp"
                  defaultValue={jobPostingData?.min_work_exp}
                />
              </div>
            </div>
            
           
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="max_work_exp">Max work exp.(In years)</label>
                <input
                  required
                  type="number"
                  className="input-style2"
                  id="max_work_exp"
                  placeholder=""
                  name="max_work_exp"
                  defaultValue={jobPostingData?.max_work_exp}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="min_compensation">Min compensation</label>
                <input
                  required
                  type="number"
                  className="input-style2"
                  id="min_compensation"
                  placeholder=""
                  name="min_compensation"
                  defaultValue={jobPostingData?.min_compensation}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="max_compensation">Max compensation</label>
                <input
                  required
                  type="number"
                  className="input-style2"
                  id="max_compensation"
                  placeholder=""
                  name="max_compensation"
                  defaultValue={jobPostingData?.max_compensation}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
              <label>Select type of compensation</label>
                <select
                  defaultValue={jobPostingData?.compensation_type}
                  name="compensation_type"
                  class="form-select"
                >
                  <option hidden>Select type of compensation</option>
                  <option value="lpa">LPA</option>
                  <option value="inr">INR</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => setcomensationHide(e.target.checked)}
                  id="check"
                  placeholder=""
                  name="hide_compensation"
                  checked={comensation}
                />
                <label htmlFor="hide_compensation">
                  Do you want to hide compensation ?
                </label>
              </div>
              </div>
              <div className="col-md-6">            
              <div className="mb-3">
                <label htmlFor="perk_and_benefits">
                  Perk and Benefits (use '|' separator)
                </label>
                <input
                  type="text"
                  className="input-style2"
                  id="perk_and_benefits"
                  placeholder=""
                  name="perk_and_benefits"
                  defaultValue={jobPostingData?.perk_and_benefits?.join(" | ")}
                />
              </div>
            </div>
            <div className="col-md-3">            
              <div className="mb-3">
                <label htmlFor="perk_and_benefits">
                 Budget %
                </label>
                <input
                  type="tel"
                  onKeyPress={(e) => {
                    if (!/[0-9 .]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="input-style2"
                  id="budget"
                  placeholder=""
                  name="budget"
                  defaultValue={jobPostingData?.budget}
                />
              </div>
            </div>
          </div>
         
          <h4 className="form-heading">Skill Information</h4>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="must_have_skills">
                  Must have skills (use '|' separator)
                </label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="must_have_skills"
                  placeholder=""
                  name="must_have_skills"
                  defaultValue={jobPostingData?.must_have_skills?.join(" | ")}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="good_to_have_skills">
                  Good to have skills (use '|' separator)
                </label>
                <input
                  type="text"
                  className="input-style2"
                  id="good_to_have_skills"
                  placeholder=""
                  name="good_to_have_skills"
                  defaultValue={jobPostingData?.good_to_have_skills?.join(
                    " | "
                  )}
                />
              </div>
            </div>
          </div>

          <h4 className="form-heading">Educational Information</h4>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="educational_qualification">
                  Educational Qualification (use '|' separator)
                </label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="educational_qualification"
                  placeholder=""
                  name="educational_qualification"
                  defaultValue={jobPostingData?.educational_qualification?.join(
                    " | "
                  )}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="industry">Industries (use '|' separator)</label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="industry"
                  placeholder=""
                  name="industry"
                  defaultValue={jobPostingData?.industry?.join(" | ")}
                />
              </div>
            </div>
          </div>

          <h4 className="form-heading">Websites</h4>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="company_website_url">Company website URL</label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="company_website_url"
                  placeholder=""
                  name="company_website_url"
                  defaultValue={jobPostingData?.company_website_url}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="corporate_cultural_url">
                  corporate cultural URL (optional)
                </label>
                <input
                  type="text"
                  className="input-style2"
                  id="corporate_cultural_url"
                  placeholder=""
                  name="corporate_website_url"
                  defaultValue={jobPostingData?.corporate_website_url}
                />
              </div>
            </div>
          </div>

          <h4 className="form-heading">Interview Steps</h4>

          <div className="row mb-3">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="interview_steps">
                  Interview steps (use '|' separator)
                </label>
                <input
                  required
                  type="text"
                  className="input-style2"
                  id="interview_steps"
                  placeholder=""
                  name="interview_steps"
                  defaultValue={jobPostingData?.interview_steps?.join(" | ")}
                />
              </div>
            </div>
          </div>

          <h4 className="form-heading">Screening Questions</h4>

          {screeningQuestions.map((x, i) => {
            return (
              <div className="row" key={i}>
                <div className="col-md-8 mb-3">
                  <input
                    required
                    name="screeing_questions"
                    className="input-style2"
                    placeholder=""
                    value={x}
                    onChange={(e) => handleScreeningQuestionInputChange(e, i)}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  {screeningQuestions.length !== 1 && (
                    <button
                      className="m-2 button-style blue-button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {screeningQuestions.length - 1 === i && (
                    <button
                      onClick={handleAddClick}
                      className="m-2 button-style blue-button"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <span className="text-danger mx-3">{errorMessage}</span>

          <hr />

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="button-style blue-button-outline m-2 loginBtnLoader"
              disabled={loader}
              onClick={() => setJobStatus("3")}
            >
              {" "}
              {buttonLoader == true ? (
                <Loader className="btnLoader" />
              ) : (
                "Save As Draft"
              )}{" "}
              <span>
                <i className="fa-solid fa-user-plus"></i>
              </span>
            </button>
            <button
              type="submit"
              className="button-style blue-button m-2 loginBtnLoader"
              disabled={loader}
              onClick={() => setJobStatus("1")}
            >
             {saveDraftLoader == true ? (
                    <Loader className="btnLoader" />
                  ) : (
                    "Post the job" + " "
                  )}
              
              <span>
                <i className="fa-solid fa-user-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </form>
       </>}
    </div>
  );
}

export default EmployerJobPosting;
