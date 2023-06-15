import work from "../assets/imgs/work.svg";
import Group from "../assets/imgs/Group.png";
import decline from "../assets/imgs/decline.png";
import archiveicon from "../assets/imgs/archiveicon.png";


const SidebarConfig = [
  {
    title: "Job List",
    path: "/admin/job",
    icon: work,
  },
  {
    title: "Agency",
    path: "/admin/agency",
    icon: work,
  },
  {
    title: "Employe",
    path: "/admin/employer",
    icon: work,
  },
  {
    title: "Credits",
    path: "/admin/credits",
    icon: work,
  },
];

const AgencySidebarConfig = [
  {
    title: "Dashboard",
    path: "/agency/dashboard",
    icon: work,
  },
  {
    title: "JOB LIST",
    path: "/agency/joblist",
    icon: work,
  },
  {
    title: "WORKING ON",
    path: "/agency/working-on",
    icon: Group,
  },

  {
    title: "DECLINED JOBS",
    path: "/agency/decline-jobs",
    icon: decline,
  },
  {
    title: "ARCHIVED JOBS",
    path: "/agency/archive-jobs",
    icon: work,
    // className: "logoutdesign"
  },
  {
    title: "RECRUITERS LIST",
    path: "/agency/recruiter-list",
    icon: work,
  },
];

const EmployerSidebarConfig = [
  {
    title: "Dashboard",
    path: "/employer/dashboard",
    icon: work,
  },
  {
    title: "All Jobs",
    path: "/employer/jobs",
    icon: work,
  },
  {
    title: "Job posting",
    path: "/employer/job-posting",
    icon: work,
  },
  {
    title: "Agency List",
    path: "/employer/agency-list",
    icon: work,
  },
];

const RecruiterSidebarConfig = [
  {
    title: "Working on",
    path: "/recruiter/dashboard",
    icon: work,
  },
];

export {
  SidebarConfig,
  AgencySidebarConfig,
  EmployerSidebarConfig,
  RecruiterSidebarConfig,
};
