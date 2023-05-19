import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Page from "../../../components/Page";
import { useAuth } from "../../../context/auth";
import {
  agencyUpdateAccInfo,
  uploadFile,
  agencyAccountDetails,
  industriesActiveList,
  roleActiveList,
} from "../../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import dumyImage from "../../../assets/imgs/dummy-image.png";
import uploadIcon from "../../../assets/imgs/upload-icon.png";
import Loader from "@mui/material/CircularProgress";

function AgencyProfileUpdate(props) {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [employerData, setEmployerData] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [gstfile, setGstFile] = useState('');
  const user = localStorage.getItem("AUTH_USER");
  /* To call Employer details API function  */
  //   const [agencyAccountInfo, setAgencyAccountInfo] = useState({});
  const [agencyDetails, setAgencyDetails] = useState({});
  const [activeroleList, setactiveroleList] = useState([]);
  const [activeIndustryList, setActiveIndustryList] = useState([]);
  const [roleArr, setRoleArr] = useState([]);
  const [industryArr, setIndustryArr] = useState([]);
  // const [loading, setLoading] = React.useState(true);
  const [candidateType, setCandidateType] = useState([]);
const [buttonLoder, setButtonLoader] = useState(false);
const [gstFileLoader, setGstFileLoader] = useState(false);
const [fileLoader, setFileLoader] = useState(false);

  var candidateList = [
    {
      name: "Junior",
      value: "junior",
    },
    {
      name: "Senior",
      value: "senior",
    },
    {
      name: "Mid level",
      value: "midlevel",
    },
    {
      name: "Executive",
      value: "executive",
    },
  ];

  /////// Agency details function ////////////
  const agencyDetailsFunction = async () => {
    setLoading(true)
    await agencyAccountDetails(JSON.parse(user)?._id)
      .then((res) => {
        setLoading(false);
        if (res?.data?.data) {
          setAgencyDetails(res?.data?.data);
          setSelectedFile(res?.data?.data?.agency_account_info?.recruiter_image)
          setGstFile(res?.data?.data?.gst_file);
          setRoleArr(res?.data?.data?.expertise_in?.candidate_roles)
          setIndustryArr(res?.data?.data?.expertise_in?.company_industries)
          setCandidateType(res?.data?.data?.candidate_seniority?.candidate_seniority)
          localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.data));
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  /////// active role list ////////////
  const activeRoleFunction = async () => {
    await roleActiveList()
      .then((res) => {
        if (res?.data?.data) {
          setactiveroleList(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////// Agency details function ////////////
  const activeIndustryFunction = async () => {
    await industriesActiveList()
      .then((res) => {
        if (res?.data?.data) {
          setActiveIndustryList(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(user, "user");

    setTimeout(() => {
      agencyDetailsFunction();
      activeRoleFunction();
      activeIndustryFunction();
      console.log("new");
    }, 3000);
  }, [user]);

  const onFileChange = (event) => {
    // console.log(event.target.files[0], "file");
    onFileUpload(event.target.files[0]);
  };


  const onGstFileChange = (event) => {
    // console.log(event.target.files[0], "file");
    ongstFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("file", data);
    console.log(data);
    setFileLoader(true)
    await uploadFile(formData)
      .then((res) => {
        setTimeout(() => {
          setFileLoader(false)
        }, 3000);
       
        const { data } = res;
        console.log(res, "res");
        // setImageLoader(true)
        setTimeout(() => {
          setSelectedFile(data?.data?.fileurl);
        }, 3000);
      })
      .catch((err) => { 
        setTimeout(() => {
        setFileLoader(false)
      }, 3000);setFileLoader(false);
        console.log(err, "err");
      });
  };

  ///// on gst file upload function ///////
  const ongstFileUpload = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("file", data);
    console.log(data);
    setGstFileLoader(true)

    await uploadFile(formData)
      .then((res) => {
        const { data } = res;
        console.log(res, "res");
        // setImageLoader(true)
        setTimeout(() => {
        setGstFileLoader(false)
          setGstFile(data?.data?.fileurl);
        }, 2000);
      })
      .catch((err) => {
       
        setTimeout(() => {
          setGstFileLoader(false)
            setGstFile(data?.data?.fileurl);
          }, 2000);
        console.log(err, "err");
      });
  };


  /////// Step 4 ////////////
  const onSelectAllRoll = (e) => {
    if (e.target.checked == true) {
      let arr = activeroleList?.map((x) => {
        return x._id;
      });
      setRoleArr(arr);
    } else {
      setRoleArr([]);
    }
  };

  const onSelectRole = (e, id) => {
    if (e.target.checked == true) {
      setRoleArr([...roleArr, id]);
    } else {
      var array = [...roleArr];
      var index = array.indexOf(id);
      if (index !== -1) {
        array.splice(index, 1);
        setRoleArr(array);
      }
    }
  };

  const onSelectAllIndustry = (e) => {
    if (e.target.checked == true) {
      let arr = activeIndustryList?.map((x) => {
        return x._id;
      });
      setIndustryArr(arr);
    } else {
      setIndustryArr([]);
    }
  };

  const onSelectIndustry = (e, id) => {
    if (e.target.checked == true) {
      setIndustryArr([...industryArr, id]);
    } else {
      var array = [...industryArr];
      var index = array.indexOf(id);
      if (index !== -1) {
        array.splice(index, 1);
        setIndustryArr(array);
      }
    }
  };


  /////// Step 5 ////////////

  const onExecutiveChange = (e, id) => {
    if (e.target.checked == true) {
      setCandidateType([...candidateType, id]);
    } else {
      var array = [...candidateType];
      var index = array.indexOf(id);
      if (index !== -1) {
        array.splice(index, 1);
        setCandidateType(array);
      }
    }
  };
  const onAllExecutiveChange = (e) => {
    if (e.target.checked == true) {
      let arr = candidateList?.map((x) => {
        return x.value;
      });
      setCandidateType(arr);
    } else {
      setCandidateType([]);
    }
  };

  /////// Step 1 ////////////
  const accountInfoFunc = async (event) => {
    console.log(event, "event");
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    setButtonLoader(true)
    // setLoading(true);
    const userData = {
      name: formdata.get("name"),
      agency_estd_year: formdata.get("agency_estd_year"),
      website: formdata.get("website"),
      gst_file: selectedFile,
      gst: formdata.get("gst"),
      agency_account_info: {
        first_name: formdata.get("first_name"),
        last_name: formdata.get("last_name"),
        extension: formdata.get("extension"),
        personal_email: formdata.get("personal_email"),
        personal_phone: formdata.get("personal_phone"),
        recruiter_image: selectedFile,
        personal_linkedin_url: formdata.get("personal_linkedin_url"),
        agency_location: formdata.get("agency_location"),
      },
      recruiting_summary: {
        no_of_exp_as_agency: formdata.get("no_of_exp_as_agency"),
        // recruitment_service_offering: formdata.get(
        //   "recruitment_service_offering"
        // ),
        relevant_employment_history: formdata.get(
          "relevant_employment_history"
        ),
      },
      expertise_in: {
        candidate_roles: roleArr,
        company_industries: industryArr,
      },
      candidate_seniority: {
        candidate_seniority: candidateType,
        more_info: formdata.get("more_info"),
        // type_of_candidate_want_to_recruit: formdata.get(
        //   "type_of_candidate_want_to_recruit"
        // ),
      },
    };

    console.log(userData);
    await agencyUpdateAccInfo(JSON.parse(user)?._id, userData)
      .then((res) => {
        setButtonLoader(false)
        if (res?.data?.data) {
          setSelectedFile("");
          setGstFile("");
          localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.data));
          navigate("/agency/dashboard")
        }
        
      })
      .catch((err) => {
        //   setLoading(false);
        setButtonLoader(false)
        console.log(err);
      });
  };


  return (
    <div>
      <section className="color-bg-wrapper-profile">
        <div className="container">
          {loading == true && (
            <div className="contentLoader">
              <Loader className="contentLoaderAnimate" />
            </div>
          )}
          <div className="inner-form">
            <form onSubmit={accountInfoFunc}>
              <div className="step-form-wrapper">
                <div className="steps">
                  <div className="form-content">
                    <h1>Update your profile</h1>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                        defaultValue={agencyDetails?.agency_account_info?.first_name}
                          type="text"
                          className="input-style2"
                          id="first_name"
                          placeholder="First Name"
                          name="first_name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                         defaultValue={agencyDetails?.agency_account_info?.last_name}
                          type="text"
                          className="input-style2"
                          id="last_name"
                          placeholder="Last Name"
                          name="last_name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                    defaultValue={agencyDetails?.agency_account_info?.personal_email}
                      type="email"
                      className="input-style2"
                      id="official_email"
                      placeholder="Official Email"
                      name="personal_email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                     defaultValue={agencyDetails?.agency_account_info?.extension}
                      type="text"
                      className="input-style2"
                      id="extension"
                      placeholder="Phone no. extension"
                      name="extension"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputProps={{
                        maxLength: 10,
                      }}
                      defaultValue={agencyDetails?.agency_account_info?.personal_phone}
                      type="tel"
                      className="input-style2"
                      id="contact_number"
                      placeholder="Contact number"
                      name="personal_phone"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                    defaultValue={agencyDetails?.agency_account_info?.personal_linkedin_url}
                      type="text"
                      className="input-style2"
                      id="linkedin_url"
                      placeholder="LinkedIn URL"
                      name="personal_linkedin_url"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="upload-wrap">
                      <div className="shop-photo">
                      {fileLoader == true ? <Loader className="btnLoader" /> : 
                        selectedFile !== "" ? (
                          <img src={selectedFile} />
                        ) : (
                          <img src={dumyImage} />
                        )}
                      </div>
                      <div className="upload">
                        <div className="overlap-upload">
                          <img src={uploadIcon} />
                          <p>
                            <span>Click to upload</span> or drag and drop
                            Recruiter Photo here
                          </p>
                        </div>
                        <input
                          onChange={onFileChange}
                          type="file"
                          id="recruiter_image"
                          className="fileupload"
                          name="recruiter_image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" mt-3">
                    <input
                      defaultValue={agencyDetails?.agency_account_info?.agency_location}
                      type="text"
                      className="input-style2"
                      id="agency_location"
                      placeholder="Agency location"
                      name="agency_location"
                    />
                  </div>
                  {/* <button type="submit" className="next full-width-btm">
                    Submit and continue..
                  </button> */}
                  {/* <!-- <input type="button" name="next" className="next action-button" value="Next" /> --> */}
                </div>

                <div className="form-content">
                  <h1>Recruiting Summary.</h1>
                  <p>
                    You are applying to join the Hire2Inspire Agency. Before you
                    can access your jobs, you must complete your profile.
                  </p>
                </div>

                <div className="mb-3">
                  <input
                  defaultValue={agencyDetails?.recruiting_summary?.no_of_exp_as_agency}
                    type="text"
                    className="input-style2"
                    id="no_of_exp_as_agency"
                    placeholder="Number of Experience as an Agency"
                    name="no_of_exp_as_agency"
                  />
                </div>
                {/* <div className="mb-3">
                  <input
                   defaultValue={agencyDetails?.recruiting_summary?.recruitment_service_offering}
                    type="text"
                    className="input-style2"
                    id="recruitment_service_offering"
                    placeholder="Area of expertise "
                    name="recruitment_service_offering"
                  />
                </div> */}
                <div className="mb-3">
                  <input
                  defaultValue={agencyDetails?.recruiting_summary?.relevant_employment_history}
                    type="text"
                    className="input-style2"
                    id="relevant_employment_history"
                    placeholder="Relevant Employment History"
                    name="relevant_employment_history"
                  />
                </div>

                <div className="form-content">
                  <h1>Agency Information</h1>
                  <p>
                    You are applying to join the Hire2Inspire Agency. Before you
                    can access your jobs, you must complete your profile.
                  </p>
                </div>

                <div className="mb-3">
                  <input
                    defaultValue={agencyDetails?.name}
                    type="text"
                    className="input-style2"
                    id="name"
                    placeholder="Agency Name"
                    name="name"
                  />
                </div>
                <div className="mb-3 mt-3">
                  <input
                  defaultValue={agencyDetails?.website}
                    type="text"
                    className="input-style2"
                    id="website"
                    placeholder="Website URL"
                    name="website"
                  />
                </div>
                {/* <div className="mb-3 mt-3">
                      <input
                        defaultValue={agencyDetails?.expiration_date}
                        type="text"
                        className="input-style2"
                        id="expiration_date"
                        placeholder="Expiration date"
                        name="expiration_date"
                      />
                    </div> */}
                <div className="mb-3">
                  <div className="upload-wrap">
                    <div className="upload">
                   
                    <> 
                      <div className="overlap-upload">
                      {gstFileLoader == true ? <Loader className="btnLoader" /> : 
                        gstfile !== "" ? (
                          <img src={gstfile} />
                        ) : (
                          <img src={uploadIcon} />
                        )
                      }
                        <p>
                          <span>Click to upload</span> or drag and drop GST file
                          here
                        </p>
                      </div>
                      <input
                        onChange={onGstFileChange}
                        type="file"
                        id="gst_file"
                        className="fileupload"
                        name="gst_file"
                      />
                      </>
                   
                    </div>
                    
                  </div>
                </div>
                {/* <span className="form-info">
                    Please select all of your organization’s certifications and
                    upload a supporting document. That can be updated at any
                    time in your <a href="#">Settings</a>
                  </span> */}
                <div className="mb-3 mt-3">
                  <input
                   defaultValue={agencyDetails?.gst}
                    required
                    type="text"
                    className="input-style2"
                    id="gst"
                    placeholder="Agency GST "
                    name="gst"
                  />
                </div>
                <div className="form-check custom-check">
                  <input
                    disabled
                    className="form-check-input"
                    type="checkbox"
                    checked={true}
                    id="check"
                  />
                  <label className="form-check-label" for="check">
                    By completing this section, you are attesting that all
                    information is accurate.
                  </label>
                </div>

                <div className="form-content">
                  <h1>Expertise In</h1>
                  <p>
                    Add options of candidate roles and Company Industries,
                    Agency has an expertise in. Added a snip for your reference.
                  </p>
                </div>
                <div className="top-form-part">
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h6>Candidate Roles</h6>
                    </div>
                    <div className="col">
                      <div className="form-check custom-check custom-check-right">
                        <input
                          onChange={(e) => onSelectAllRoll(e)}
                          className="form-check-input all-check"
                          type="checkbox"
                          checked={activeroleList &&
                            activeroleList?.length === roleArr?.length ?true : false}
                          id="all"
                        />
                        <label className="form-check-label" for="all">
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {activeroleList &&
                      activeroleList?.length > 0 &&
                      activeroleList?.map((item, index) => {
                        return (
                          <div className="col-md-6">
                            <div className="mb-3">
                              <div className="form-check custom-check check-box">
                                <label className="form-check-label" for="1">
                                  <input
                                    onChange={(e) => onSelectRole(e, item._id)}
                                    className="form-check-input a-check"
                                    type="checkbox"
                                    checked={roleArr?.includes(item._id)}
                                    value={item?._id}
                                    id="1"
                                  />
                                  {item?.name}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="bottom-form-part">
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h6>Company Industries</h6>
                    </div>
                    <div className="col">
                      <div className="form-check custom-check custom-check-right">
                        <input
                          onChange={(e) => onSelectAllIndustry(e)}
                          className="form-check-input all-check-company"
                          type="checkbox"
                          checked={activeIndustryList &&
                            activeIndustryList?.length === industryArr?.length ?true : false}
                          id="checkall"
                        />
                        <label className="form-check-label" for="checkall">
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {activeIndustryList &&
                      activeIndustryList?.length > 0 &&
                      activeIndustryList?.map((item) => {
                        return (
                          <div className="col-md-6">
                            <div className="mb-3">
                              <div className="form-check custom-check check-box">
                                <label className="form-check-label" for="13">
                                  <input
                                    onChange={(e) =>
                                      onSelectIndustry(e, item?._id)
                                    }
                                    className="form-check-input a-check"
                                    type="checkbox"
                                    value={item?._id}
                                    checked={industryArr?.includes(item._id)}
                                    id="13"
                                  />
                                  {item?.name}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="form-content">
                  <h1>Candidate Seniority</h1>
                  <p>
                    Add options of candidate roles and Company Industries,
                    Agency has an expertise in. Added a snip for your reference.
                  </p>
                </div>
                <div className="header-form-part">
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h6>Candidate Seniority</h6>
                    </div>
                    <div className="col">
                      <div className="form-check custom-check custom-check-right">
                        <input
                          onChange={(e) => onAllExecutiveChange(e)}
                          className="form-check-input all-check-candidate"
                          type="checkbox"
                          checked={candidateList &&
                      candidateList?.length == candidateType?.length ? true : false}
                          id="allcandidate"
                        />
                        <label className="form-check-label" for="allcandidate">
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {candidateList &&
                      candidateList?.length > 0 &&
                      candidateList?.map((item) => {
                        return (
                          <div className="col-md-6">
                            <div className="mb-3">
                              <div className="form-check custom-check check-box">
                                <label
                                  className="form-check-label"
                                  for="junior"
                                >
                                  <input
                                    onChange={(e) =>
                                      onExecutiveChange(e, item.value)
                                    }
                                    className="form-check-input a-check"
                                    type="checkbox"
                                    checked={candidateType?.includes(
                                      item.value
                                    )}
                                    value={item.value}
                                    id="junior"
                                  />
                                  {item.name}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {/* <span class="form-info">
                    <h6>Candidate Seniority</h6>
                    Please provide more information about your specialties.
                  </span> */}
                  {/* <div class="mt-3 mb-3">
                    <div class="select-outerbox">
                      <label>What type of candidate do you recruit ?</label>
                      <select
                      value={agencyDetails?.candidate_seniority?.type_of_candidate_want_to_recruit}
                        name="type_of_candidate_want_to_recruit"
                        class="form-select"
                      >
                        <option hidden>Select type of candidate</option>
                        <option value="I am a generalist">
                          I am a generalist
                        </option>
                        <option value="I am a Artist">I am a Artist</option>
                        <option value="I am a Painter">I am a Painter</option>
                      </select>
                    </div>
                  </div> */}
                </div>

                <button  disabled={buttonLoder} type="submit" className="full-width-btm loginBtnLoader">
                {buttonLoder == true ? <Loader className="btnLoader" /> : "Submit"}      
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AgencyProfileUpdate;
