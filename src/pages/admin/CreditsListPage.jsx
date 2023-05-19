import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { manageCredit, getCreditList } from "../../api/api";
import "./Dashboard.css";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function CreditsListPage() {
  const [creditsArr, setCreditsArr] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectButton, setSelectButton] = useState(false);

  const credits =JSON.parse(localStorage.getItem("CREDITS"))
    ? JSON.parse(localStorage.getItem("CREDITS"))
    : "";

  const navigate = useNavigate();
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
      const resp = await getCreditList();
      // console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setCreditsArr(resp?.data?.data);
        setFetching(false);
      } else {
        localStorage.clear();
        navigate("/");
      }
      // ...
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetchData();
  }, [status, fetching]);

  let [num, setNum] = useState(0);
 
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  ///////// purchase credits /////////

  const onSavePurchase = async (e, data) => {
    e.preventDefault();
   
    const body = { amount: num, job_post_count: 1 };
    setSelectButton(true);
    const resp = await manageCredit(data._id, body);
    if (resp?.data?.error == false) {
      // console.log(resp,"respresp");
      // setTimeout(()=>{
      //   localStorage.setItem('CREDITS', JSON.stringify(resp?.data?.data))
      //   setSelectButton(false);
      // },2000);
      Toast.fire({
        icon: resp?.data?.error ? "error" : "success",
        title: "Credit price updated successfully !!",
      });
      setSelectButton(false);
    } else {
      setSelectButton(false);
      setErrormsg(resp?.data?.message);
    }
  };


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
              <h3 className="dash-heading">{"Credits"}</h3>
            </div>
            <ul className="job-list job-list__single">
            {/* <li >
                      <div className="job-box">
                        <div className="job-header">
                          <div className="button-holder">
                            <p>
                              Total Credits :{" "}
                              <span>{totalCr }</span>
                            </p>
                          </div>
                          <div className="button-holder btn-holder2">
                            <p>
                              Used Credits :{" "}
                              <span>
                              {totalCrUsed }
                              </span>
                            </p>
                          </div>
                          <div className="button-holder btn-holder2">
                            <p>
                              Credits Left :{" "}
                              <span>
                                {totalCrLeft} 
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li> */}
              {creditsArr.length ? (
                creditsArr.map((x, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          <div className="button-holder">
                            <p>
                              Price per credits :{" "}
                              
                            </p>
                          </div>
                          
                          <div className="content-right">
                            <div className="input-group">
                             
                              <span style={{marginRight: "10px"}}>&#8377; {" "}</span> 
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={x.amount}
                                onChange={handleChange}
                              />
                             
                            </div>
                            <button
                              type="button"
                              onClick={(e) => onSavePurchase(e, x)}
                              className="full-width-btm loginBtnLoader"
                            >
                              {selectButton ? (
                                <Loader className="btnLoader" />
                              ) : (
                                "Update"
                              )}
                            </button>
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
          </div>
        </>
      )}
    </>
  );
}

export default CreditsListPage;
