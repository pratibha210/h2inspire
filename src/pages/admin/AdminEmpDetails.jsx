import React,{useEffect,useState} from 'react'
import {allEmpDetails} from "../../api/api";
import {useSearchParams} from 'react-router-dom';
import Loader from "@mui/material/CircularProgress";
import coverimg from "../../assets/imgs/profile.svg";
 const AdminEmpDetails =()=> {

  const [loading, setLoading] = React.useState(true);
 const [emplDetails,setEmplDetails] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await allEmpDetails(searchParams.get("id"));
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setEmplDetails( resp?.data?.data );
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
          <h3 className="dash-heading">Employer Details</h3>
        </div>
        <div className='details-wrap'>
          <div className='row justify-content-between'>
            <div className='col-md-3'>
              <div className='profile-wrap'>
                <figure>
                {!emplDetails?.employer_image ||  emplDetails?.employer_image =="" ?
                <img src={coverimg}/>
                :
                <img  src={emplDetails?.employer_image}/>
                }
                </figure>
                <h3>{emplDetails?.fname} {emplDetails?.lname}</h3>
              </div>
            </div>
            <div className='col-md-9'>
              <div className='row'>
                  <div className='col-md-6'>
                    <h4 className="heading">Personal Details</h4>
                    <ul className='profile-list'>
                    <li><span>Name:</span>{emplDetails?.fname} {emplDetails?.lname}</li> 
                      <li><span>Phone Number:</span>{emplDetails?.mobile}</li>
                      <li><span>Email ID:</span> {emplDetails?.email}</li>
                      <li><span>Linkedin URL:</span> {emplDetails?.linkedin_url}</li>
                    </ul>
                  </div>
                  {/* <div className='col-md-6'>
                    <h4 className="heading">Corporate Details</h4>
                    <ul className='profile-list'>
                      <li><span>Corporate Name:</span> {agencyDetails?.name}</li>
                      <li><span>Established Year:</span> {agencyDetails?.agency_estd_year}</li>
                      <li><span>Corporate Email ID:</span>{agencyDetails?.corporate_email}</li>
                    </ul> 
                  </div> */}
              </div>
            </div>
          </div>
        </div>

      </>)}
      </div>
  )
}
export default AdminEmpDetails;
