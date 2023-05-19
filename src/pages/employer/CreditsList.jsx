import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { purchaseCredit, getCreditList } from "../../api/api";
import "./EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function CreditsList() {
  const [creditsArr, setCreditsArr] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectButton, setSelectButton] = useState(false);
  const [totalCr, setTotalCr] = useState('');
  const [totalCrUsed, setTotalCrUsed] = useState('');
  const [totalCrLeft, setTotalCrLeft] = useState('');


  const credits = localStorage.getItem("CREDITS")
    ? JSON.parse(localStorage.getItem("CREDITS"))
    : "";

  const navigate = useNavigate();

useEffect(()=>{
  let total = credits?.free_count + credits?.purchased_count;
  let used = credits?.free_used_count + credits?.purchased_used_count;
  let left = total - used ;

  console.log(credits,total, used, left,"leftleftleft");
  setTotalCr(total);
  setTotalCrUsed(used)
  setTotalCrLeft(left)
},[credits])


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
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  ///////// purchase credits /////////

  const onSavePurchase = async (e, data) => {
    e.preventDefault();
    let amount = data?.amount * num;
    const body = { amount: amount, credit_count: num };
    setSelectButton(true);
    const resp = await purchaseCredit(data._id, body);
    if (resp?.data?.error == false) {
      console.log(resp,"respresp");
      setTimeout(()=>{
        localStorage.setItem('CREDITS', JSON.stringify(resp?.data?.data))
        setSelectButton(false);
      },2000);
      let total = credits?.free_count + credits?.purchased_count;
      let used = credits?.free_used_count + credits?.purchased_used_count;
      let left = total - used ;
      setNum(0);
      setTotalCr(total);
      setTotalCrUsed(used)
      setTotalCrLeft(left)
      
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
            <li >
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
                    </li>
              {creditsArr.length ? (
                creditsArr.map((x, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          <div className="button-holder">
                            <p>
                              Purchase credits to Post Jobs :{" "}
                              <span>&#8377; {x.amount}</span>
                            </p>
                          </div>
                          {num > 0 &&
                          <div className="button-holder btn-holder2">
                            <p>
                              Total amount :{" "}
                              <span>
                                {x.amount} X {num} = &#8377; {x.amount*num}
                              </span>
                            </p>
                          </div>
                          }
                          <div className="content-right">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  onClick={decNum}
                                >
                                  -
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={num}
                                onChange={handleChange}
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  onClick={incNum}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => onSavePurchase(e, x)}
                              className="full-width-btm loginBtnLoader"
                            >
                              {selectButton ? (
                                <Loader className="btnLoader" />
                              ) : (
                                "Purchase"
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

export default CreditsList;
