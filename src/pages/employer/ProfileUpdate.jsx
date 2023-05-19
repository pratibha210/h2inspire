import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/auth";
import {
  employerProfleDetails,
  employerProfleUpdate,
  uploadFile,
} from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import dumyImage from "../../assets/imgs/dummy-image.png";
import uploadIcon from "../../assets/imgs/upload-icon.png";
function ProfileUpdate(props) {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [employerData, setEmployerData] = useState({});
  const [selectedFile, setSelectedFile] = useState('');
  const token = localStorage.getItem("AUTH_USER")
  /* To call Employer details API function  */

  const employerDetails = async () => {
    await employerProfleDetails()
      .then((res) => {
        const { response } = res;

        if (response?.data.error === true) {
          setErrorMessage(response?.data.message);
        } else {
          setEmployerData(res?.data?.data);
          setSelectedFile(res?.data?.data?.employer_image)
        }
      })
      .catch((err) => {
        // console.log(err, "err");
      });
  };

  useEffect(() => {
    if(token !==undefined){
    employerDetails();
    }else{
      localStorage.clear();
      navigate("/",{replace: true})
    }
  }, [token]);

  /* file upload function  */

  const onFileChange = (event) => {
    // console.log(event.target.files[0], "file");
    onFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("file", data);
    console.log(data);
    await uploadFile(formData)
      .then((res) => {
        const { data } = res;
        console.log(res, "res");
        // setImageLoader(true)
        setTimeout(()=>{
          setSelectedFile(data?.data?.fileurl);
      
        },3000)
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  /* To call Employer update API function  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      mobile: data.get("mobile"),
      email: employerData?.email,
      linkedin_url: data.get("linkedin_url"),
      company_website_url: data.get("company_website_url"),
      employer_image: selectedFile
    };

    // console.log(userData);
    await employerProfleUpdate(userData)
      .then((res) => {
        // console.log(res,"res");
        const { response } = res;

        if (response?.data.error === true) {
          setErrorMessage(response?.data.message);
        } else {
          localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.data));

          navigate("/employer/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        // console.log(err, "err");
      });
  };

  return (
    <>
      <Page title="Employer Profile | hire2inspire">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <input
              type="text"
              defaultValue={employerData?.fname}
              className="input-style2"
              id="fname"
              placeholder="First name of the employer"
              name="fname"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              defaultValue={employerData?.lname}
              className="input-style2"
              id="lname"
              placeholder="Last name of the employer"
              name="lname"
            />
          </div>
          <div className="mb-3">
            <input
              defaultValue={employerData?.mobile}
              type="tel"
              maxLength={10}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              inputProps={{
                maxLength: 10,
              }}
              className="input-style2"
              id="mobile"
              placeholder="Phone number of the employer"
              name="mobile"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              defaultValue={employerData?.email}
              disabled
              type="email"
              className="input-style2"
              id="email"
              placeholder="Corporate Mail Address"
              name="email"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              defaultValue={employerData?.linkedin_url}
              type="text"
              className="input-style2"
              id="linkedin_url"
              placeholder="Linkedin link"
              name="linkedin_url"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              defaultValue={employerData?.company_website_url}
              className="input-style2"
              id="company_website_url"
              placeholder="Company website link"
              name="company_website_url"
            />
          </div>
          <div className="mb-3">
            <div className="upload-wrap">
              <div className="shop-photo">
                {selectedFile !=='' ? (
                  <img src={selectedFile} />
                ) : (
                  <img src={dumyImage} />
                )}
              </div>
              <div className="upload">
                <div className="overlap-upload">
                  <img src={uploadIcon} />
                  <p>
                    <span>Click to upload</span> or drag and drop Recruiter
                    Photo here
                  </p>
                </div>
                <input
                  onChange={onFileChange}
                  type="file"
                  id="upload"
                  className="fileupload"
                  name="employer_image"
                />
              </div>
            </div>
          </div>
          {errorMessage &&  <span className="text-danger mx-3">{errorMessage}</span>}
          <button type="submit" className="full-width-btm">
            Save changes
          </button>
        </form>
      </Page>
    </>
  );
}

export default ProfileUpdate;
