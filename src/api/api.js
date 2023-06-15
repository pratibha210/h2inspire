
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";

const headers = {
    "Content-Type": "application/json",
}

function setAuthHeader() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    }
}

function setAuthHeaderFormData() {
    return {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    }
}

const apiUrl = import.meta.env.VITE_API_BASE;

/**
 * @returns promise
 */
export async function getRoles() {
    try {
        const response = await axios.get(apiUrl+ "role/list")
        return response;
    } catch (error) {
        return error
    }
}
/**
 * @param {object} formData 
 * @returns promise
 */
export async function userLogin(formData) {
    try {
        const response = await axios.post(apiUrl+ "admin/login", formData)
        console.log("response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api agency login
 * @param {object} formData 
 * @returns promise
 */
export async function agencyLogin(formData) {
    try {
        const response = await axios.post(apiUrl+ "agency/login", formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api admin account info
 * @param {object} formData 
 * @returns promise
 */
 export async function adminDetails() {
    try {
        const response = await axios.get(apiUrl+ "admin/detail", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api agency register
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyRegister(formData) {
    try {
        const response = await axios.post(apiUrl+ "agency/register", formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api agency Update account info
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyUpdateAccInfo(id,formData) {
    try {
        const response = await axios.patch(apiUrl+ "agency/update/"+id, formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api forgot passwod enter mail id for agency
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyForgotPassword(formData) {
    try {
        const response = await axios.post(apiUrl+ "agency/forget-password", formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api verify otp for agency
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyVerifyOtp(formData) {
    try {
        const response = await axios.post(apiUrl+ "agency/verify-otp", formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api reset password for agency
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyResetPassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "agency/reset-password", formData)
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api change password for agency
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyChangePassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "agency/change-password", formData,{
            headers: setAuthHeader()
        })
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api agency all list 
 * @param {object} formData 
 * @returns promise
 */
 export async function allAencyList() {
    try {
        const response = await axios.get(apiUrl+ "agency/all-list", {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api employee all list 
 * @param {object} formData 
 * @returns promise
 */
 export async function allEmployerList() {
    try {
        const response = await axios.get(apiUrl+ "employer/list", {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api  agency  dashboard data
 * @param {object} formData 
 * @returns promise
 */
 export async function agenciesDashboardData() {
    try {
        const response = await axios.get(apiUrl+ "agency/dashboard", {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api  Jobs list by status
 * @param {object} formData 
 * @returns promise
 */
 export async function jobslistByStatus(formData) {
    try {
        const response = await axios.get(apiUrl+ "agency/jobs-by-status?status="+formData, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api  Jobs list 
 * @returns promise
 */
export async function allJobslist() {
    try {
        const response = await axios.get(apiUrl+ "job-posting/all-list", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api  Jobs list 
 * @returns promise
 */
 export async function allAgencyJobslist() {
    try {
        const response = await axios.get(apiUrl+ "job-posting/agency-job-list", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api  agency-invite/all-list
 * @returns promise
 */
export async function agencyInvitedallList() {
    try {
        const response = await axios.get(apiUrl+ "agency-invite/all-list", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api  recruiter-invite/all-list
 * @returns promise
 */
export async function recruiterInvitedallList() {
    try {
        const response = await axios.get(apiUrl+ "recruiter/list-by-agency", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api  agency-invite/all-list
 * @returns promise
 */
export async function inviteMultipleRecruiter(formData) {
    try {
        const response = await axios.post(apiUrl+ "recruiter/add-by-agency",formData, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api update Jobs list by status
 * @param {object} formData 
 * @returns promise
 */
 export async function updateJobslistByStatus(id,formData) {
    try {
        const response = await axios.patch(apiUrl+ "agency/update-job-status/"+id, formData, {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api agency account info
 * @param {object} formData 
 * @returns promise
 */
 export async function agencyAccountDetails() {
    try {
        const response = await axios.get(apiUrl+ "agency/detail", {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api employer login
 * @param {object} formData 
 * @returns promise
 */
export async function employerLogin(formData) {
    try {
        const response = await axios.post(apiUrl+ "employer/login", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api Industry Active list
 * @param {object} formData 
 * @returns promise
 */
 export async function industriesActiveList() {
    try {
        const response = await axios.get(apiUrl+ "industry/list")
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api Role Active list
 * @param {object} formData 
 * @returns promise
 */
 export async function roleActiveList() {
    try {
        const response = await axios.get(apiUrl+ "role/list")
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api employer register
 * @param {object} formData 
 * @returns promise
 */
 export async function employerRegister(formData) {
    try {
        const response = await axios.post(apiUrl+ "employer/register", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api employer update profile
 * @param {object} formData 
 * @returns promise
 */
 export async function employerProfleUpdate(formData) {
    try {
        const response = await axios.patch(apiUrl+ "employer/update-profile", formData, {
            headers: setAuthHeader()
        })
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api employer profile details
 * @param {object} formData 
 * @returns promise
 */
 export async function employerProfleDetails() {
    try {
        const response = await axios.get(apiUrl+ "employer/proile-detail", {
            headers: setAuthHeader()
        })
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api forgot passwod enter mail id for employer
 * @param {object} formData 
 * @returns promise
 */
 export async function forgotPassword(formData) {
    try {
        const response = await axios.post(apiUrl+ "employer/forget-password", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api verify otp for employer
 * @param {object} formData 
 * @returns promise
 */
 export async function verifyOtp(formData) {
    try {
        const response = await axios.post(apiUrl+ "employer/verify-otp", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api reset password for employer
 * @param {object} formData 
 * @returns promise
 */
 export async function resetPassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "employer/reset-password", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api change password for employer
 * @param {object} formData 
 * @returns promise
 */
 export async function chnagePassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "employer/change-password", formData,{
            headers: setAuthHeader()
        })
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api posting a job
 * @param {object} formData 
 * @returns promise
 */
export async function jobPosting(formData) {
    try {
        const response = await axios.post(apiUrl+ "job-posting/add", formData, {
            headers: setAuthHeader()
        })
        console.log("job posting response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api posting a job
 * @param {object} formData 
 * @returns promise
 */
export async function jobPostingDetail(jobId) {
    try {
        const response = await axios.get(apiUrl + "job-posting/detail/" + jobId, {
            headers: setAuthHeader()
        })
        console.log("job posting response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api update a job
 * @param {object} formData 
 * @returns promise
 */
export async function updateJobPosting(formData,id) {
    try {
        const response = await axios.patch(apiUrl+ "job-posting/update/"+id, formData, {
            headers: setAuthHeader()
        })
        console.log("job posting update response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api agency-self-job-assign-declne
 * @param {object} formData 
 * @returns promise
 */
 export async function agencySelfJobAssignDeclne(formData) {
    try {
        const response = await axios.post(apiUrl+ "job-posting/agency-self-job-assign-declne", formData, {
            headers: setAuthHeader()
        })
        console.log("job posting update response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api all jobs
 * @param {object} formData 
 * @returns promise
 */
export async function allJobPostings() {
    try {
        const response = await axios.get(apiUrl+ "job-posting/all-list")
        console.log("allJobPostings response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api jobs details
 * @param {object} job id 
 * @returns promise
 */
 export async function jobsDetails(id) {
    try {
        const response = await axios.get(apiUrl+ "job-posting/detail/"+id,{ headers: setAuthHeader()})
        // console.log("allJobPostings response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api all job posting by employer
 * @param {object} formData 
 * @returns promise
 */
export async function allJobPostingsByEmployer() {
    try {
        const response = await axios.get(apiUrl+ "job-posting/list-by-employer",  {
            headers: setAuthHeader()
        })
        // console.log("allJobPostings response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}




/**
 * @api assign agency  
 * @param {object} formData 
 * @returns promise
 */
 export async function inviteMultipleAgencies(formData) {
    try {
        const response = await axios.post(apiUrl+ "agency-invite/send-invitation",formData, {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api recruiter status update by agency
 * @param {object} id 
 * @returns promise
 */
 export async function updateStatus(formData,id) {
    try {
        const response = await axios.patch(apiUrl+ "recruiter/status-update/"+id,formData, {  headers: setAuthHeader()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api forgot passwod enter mail id for recruiter
 * @param {object} formData 
 * @returns promise
 */
 export async function recuiterForgotPassword(formData) {
    try {
        const response = await axios.post(apiUrl+ "recruiter/forget-password", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api verify otp for recuiter
 * @param {object} formData 
 * @returns promise
 */
 export async function recuiterVerifyOtp(formData) {
    try {
        const response = await axios.post(apiUrl+ "recruiter/verify-otp", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api reset password for recuiter
 * @param {object} formData 
 * @returns promise
 */
 export async function recuiterResetPassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "recruiter/reset-password", formData)
        console.log("employer response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api agency account info
 * @param {object} id 
 * @returns promise
 */
 export async function allAgencyDetails(id) {
    try {
        const response = await axios.get(apiUrl+ "agency/all-detail/"+id, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api employee account info
 * @param {object} id 
 * @returns promise
 */
 export async function allEmpDetails(id) {
    try {
        const response = await axios.get(apiUrl+ "employer/detail/"+id, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @param {object} data 
 */
export function saveUser(data) {
    localStorage.clear();
    console.log('data >>>>>>>>>>> ', data);
    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.accessToken))
    localStorage.setItem('REFRESH_TOKEN', JSON.stringify(data.refreshToken))
    localStorage.setItem('AUTH_USER', JSON.stringify(data.user))
    localStorage.setItem('AUTH_USER_TYPE', JSON.stringify(data.type))
    localStorage.setItem('CREDITS', JSON.stringify(data?.credit))

}

/**
 * @returns {object} userData
 */
export function getUser() {
    let userData = {
        accessToken: JSON.parse(localStorage.getItem('ACCESS_TOKEN')),
        refreshToken: JSON.parse(localStorage.getItem('REFRESH_TOKEN')),
        user: JSON.parse(localStorage.getItem('AUTH_USER'))
    }
    return userData;
    
}



/**
 * @api file upload
 * @param {object} formData 
 * @returns promise
 */
 export async function uploadFile(formData) {
    try {
        const response = await axios.post(apiUrl+ "file/upload", formData)
        console.log("upload response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api Recruiter login
 * @param {object} formData 
 * @returns promise
 */
export async function recruiterLoginApi(formData) {
    try {
        const response = await axios.post(apiUrl+ "recruiter/login", formData)
        // console.log("recruiter response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api change password for Recruiter
 * @param {object} formData 
 * @returns promise
 */
 export async function recruiterChangePassword(formData) {
    try {
        const response = await axios.patch(apiUrl+ "recruiter/change-password", formData,{
            headers: setAuthHeader()
        })
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api recruiter account info
 * @param {object} id 
 * @returns promise
 */
 export async function recruiterAccountDetails(id) {
    try {
        const response = await axios.get(apiUrl+ "recruiter/detail/"+id, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * @api submit candidate  
 * @param {object} formData 
 * @returns promise
 */
 export async function submitCandidate (formData) {
    try {
        const response = await axios.post(apiUrl+ "candidate/submit",formData, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api submit candidate  via csv bulk file
 * @param {object} formData 
 * @returns promise
 */
 export async function submitCandidateByCsv (formData) {
    try {
        const response = await axios.post(apiUrl+ "file/save-csv-to-db/bulk-candidate", formData, {headers: setAuthHeaderFormData()})
        console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        console.log("agency error >>>>>>>> ", error.response)
        return error.response
    }
}


/**
 * @api candidate account info
 * @param {object} id 
 * @returns promise
 */
 export async function candidateDetails(id) {
    try {
        const response = await axios.get(apiUrl+ "candidate/detail/"+id, {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api candidate resume upload
 * @param candidate id
 */
export async function uploadResume(formData, id){
    try {
        const response = await axios.patch(apiUrl+ "candidate/resume-upload/"+id,formData, {  headers: setAuthHeaderFormData()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api admin -job-approval
 * @param {object} formData 
 * @returns promise
 */
 export async function adminJobApproval(formData,id) {
    try {
        const response = await axios.patch(apiUrl+ "admin/job-approval/"+id, formData, {
            headers: setAuthHeader()
        })
        // console.log("job posting update response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api admin agency approval
 * @param {object} formData 
 * @returns promise
 */
 export async function adminAgencyApproval(formData,id) {
    try {
        const response = await axios.patch(apiUrl+ "admin/agency-approval/"+id, formData, {
            headers: setAuthHeader()
        })
        // console.log("job posting update response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api  Credits list
 * @returns promise
 */
 export async function getCreditList() {
    try {
        const response = await axios.get(apiUrl+ "credit/list", {  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}



/**
 * @api  purchase Credits 
 * @returns promise
 */
 export async function purchaseCredit(id, formData) {
    try {
        const response = await axios.post(apiUrl+ "credit/purchase/"+id, formData ,{  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api  manage Credits 
 * @returns promise
 */
 export async function manageCredit(id, formData) {
    try {
        const response = await axios.post(apiUrl+ "credit/manage/"+id, formData ,{  headers: setAuthHeader()})
        // console.log("agency response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}


/**
 * @api testimonialList
 * @returns promise
 */
 export async function testimonialList() {
    try {
        const response = await axios.get(apiUrl+ "testimonial/list")
        // console.log("allJobPostings response >>>>>>>> ", response)
        return response
    } catch (error) {
        return error
    }
}

/**
 * This method is to logout user
 */
export function logoutUser() {
    localStorage.clear();
}
