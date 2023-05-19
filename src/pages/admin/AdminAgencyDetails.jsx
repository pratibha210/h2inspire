import React,{useEffect,useState} from 'react'
import {allAgencyDetails} from "../../api/api";
import {useSearchParams} from 'react-router-dom';
import Loader from "@mui/material/CircularProgress";
import coverimg from "../../assets/imgs/profile.svg";
 const AdminAgencyDetails =()=> {

  const [loading, setLoading] = React.useState(true);
 const [agencyDetails,setAgencyDetails] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await allAgencyDetails(searchParams.get("id"));
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setAgencyDetails( resp?.data?.data );
        setFetching(false);
      }
      // ...
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetchData();
  }, [ fetching]);


  return (
    <div>{loading == true ? (
      <div className="contentLoader">
        <Loader className="contentLoaderAnimate" />
      </div>
    ) : (
      <> <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="dash-heading">Agency Details</h3>
        </div>
        <div className='details-wrap'>
          <div className='row justify-content-between'>
            <div className='col-md-3'>
              <div className='profile-wrap'>
                <figure>
                {agencyDetails?.agency_account_info?.recruiter_image =="" ?
                <img src={coverimg}/>
                :
                <img  src={agencyDetails?.agency_account_info?.recruiter_image}/>
                }
                </figure>
                <h3>{agencyDetails?.name}</h3>
              </div>
            </div>
            <div className='col-md-9'>
              <div className='row'>
                  <div className='col-md-6'>
                    <h4 className="heading">Personal Details</h4>
                    <ul className='profile-list'>
                    <li><span>Name:</span>{agencyDetails?.agency_account_info?.first_name} {agencyDetails?.agency_account_info?.last_name}</li> 
                      <li><span>Phone Number:</span>{agencyDetails?.agency_account_info?.personal_phone}</li>
                      <li><span>Email ID:</span> {agencyDetails?.agency_account_info?.personal_email}</li>
                      <li><span>Linkedin URL:</span> {agencyDetails?.agency_account_info?.personal_linkedin_url}</li>
                    </ul>
                  </div>
                  <div className='col-md-6'>
                    <h4 className="heading">Corporate Details</h4>
                    <ul className='profile-list'>
                      <li><span>Corporate Name:</span> {agencyDetails?.name}</li>
                      <li><span>Established Year:</span> {agencyDetails?.agency_estd_year}</li>
                      <li><span>Corporate Email ID:</span>{agencyDetails?.corporate_email}</li>
                    </ul> 
                  </div>
              </div>
            </div>
          </div>
        </div>

      </>)}
      </div>
  )
}
export default AdminAgencyDetails;
