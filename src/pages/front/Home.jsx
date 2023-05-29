import React, { useId } from 'react'
import { NavLink } from 'react-router-dom';
import Page from '../../components/Page'
import CategoriesGrid from '../../components/ui/CategoriesGrid';
import ContactUsSection from '../../components/ui/ContactUsSection';
import JobsGrid from '../../components/ui/JobsGrid';
import home1 from "../../assets/imgs/home1.svg";
import home2 from "../../assets/imgs/home2.svg";
import home3 from "../../assets/imgs/home3.svg";
import home4 from "../../assets/imgs/home4.svg";
import home5 from "../../assets/imgs/home5.svg";
import home6 from "../../assets/imgs/home6.svg";
import banner from "../../assets/imgs/banner-img.png";
import easyApply from "../../assets/imgs/easy-apply.png"
import manyImg from "../../assets/imgs/many.png";
import support from "../../assets/imgs/support.png";



function Home() {
    const uniqueId = useId();
        
    return (
        <Page title="Home | hire2inspire">
            
            <div className="banner">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-md-12 col-lg-7">
                            <div className="banner-content">
                                <div className="banner-strap"> <span>Special Offer</span>Now You can get 50% off on your first subscription</div>
                                <h1><span>Find your</span> <br /> dream job <span>with</span> hire2Inspire</h1>
                                <h3>Get the most exciting jobs from all around the<br />
                                    world and grow your career fast with others</h3>

                                <div className="search-area">
                                    <div className="search">
                                        <span>
                                            {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.16667 2.5C5.03705 2.5 2.5 5.03705 2.5 8.16667C2.5 11.2963 5.03705 13.8333 8.16667 13.8333C11.2963 13.8333 13.8333 11.2963 13.8333 8.16667C13.8333 5.03705 11.2963 2.5 8.16667 2.5ZM0.5 8.16667C0.5 3.93248 3.93248 0.5 8.16667 0.5C12.4008 0.5 15.8333 3.93248 15.8333 8.16667C15.8333 12.4008 12.4008 15.8333 8.16667 15.8333C3.93248 15.8333 0.5 12.4008 0.5 8.16667Z" fill="black"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.1679 12.1679C12.5584 11.7774 13.1916 11.7774 13.5821 12.1679L17.2071 15.7929C17.5976 16.1834 17.5976 16.8166 17.2071 17.2071C16.8166 17.5976 16.1834 17.5976 15.7929 17.2071L12.1679 13.5821C11.7774 13.1916 11.7774 12.5584 12.1679 12.1679Z" fill="black"/>
                                            </svg> */}
                                            <img src={home1}/>
                                        </span>
                                        <input type="search" id="search" placeholder="Job title or keywords" />
                                    </div>
                                    <div className="dropdown">
                                        <span>
                                            {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66666 5H17.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M6.66666 10H17.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M6.66666 15H17.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.5 5H2.50833" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.5 10H2.50833" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.5 15H2.50833" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>    */}
                                            <img src={home2} alt='' />
                                        </span>
                                        <select className="form-select">
                                            <option>All Specialisms</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className="dropdown">
                                        <span>
                                            {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_8_61)">
                                                <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34421 3.29018 4.43656 4.6967 3.03003C6.10322 1.62351 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62351 15.3033 3.03003C16.7098 4.43656 17.5 6.34421 17.5 8.33334Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_8_61">
                                                <rect width="20" height="20" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg> */}
                                            <img src={home3} alt=''/>
                                        </span>
                                        <select className="form-select">
                                            <option>All Location</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="">GO</button>
                                </div>
                                <div className="social">
                                    <span>Follow Us</span>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                {/* <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.01953 5.625L5.29297 3.82812H3.55469V2.65625C3.55469 2.14844 3.78906 1.67969 4.57031 1.67969H5.37109V0.136719C5.37109 0.136719 4.64844 0 3.96484 0C2.53906 0 1.60156 0.878906 1.60156 2.44141V3.82812H0V5.625H1.60156V10H3.55469V5.625H5.01953Z" fill="#C3CCCD"/>
                                                </svg>                                                 */}
                                                <img src={home4} alt='' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {/* <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.23714 10V3.31096H0.1566V10H2.23714ZM1.18568 2.41611C1.85682 2.41611 2.39374 1.85682 2.39374 1.18568C2.39374 0.536913 1.85682 0 1.18568 0C0.536913 0 0 0.536913 0 1.18568C0 1.85682 0.536913 2.41611 1.18568 2.41611ZM10.0224 10V6.3311C10.0224 4.54139 9.61969 3.15436 7.51678 3.15436C6.51007 3.15436 5.83893 3.71365 5.5481 4.22819H5.52573V3.31096H3.53468V10H5.61521V6.68904C5.61521 5.81656 5.77181 4.98881 6.84564 4.98881C7.91946 4.98881 7.94183 5.97315 7.94183 6.75615V10H10.0224Z" fill="#C3CCCD"/>
                                                </svg> */}
                                                <img src={home5} alt ='' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {/* <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.01116 2.42188C3.58259 2.42188 2.4442 3.58259 2.4442 4.98884C2.4442 6.41741 3.58259 7.5558 5.01116 7.5558C6.41741 7.5558 7.57812 6.41741 7.57812 4.98884C7.57812 3.58259 6.41741 2.42188 5.01116 2.42188ZM5.01116 6.66295C4.09598 6.66295 3.33705 5.92634 3.33705 4.98884C3.33705 4.07366 4.07366 3.33705 5.01116 3.33705C5.92634 3.33705 6.66295 4.07366 6.66295 4.98884C6.66295 5.92634 5.92634 6.66295 5.01116 6.66295ZM8.27009 2.33259C8.27009 1.99777 8.00223 1.72991 7.66741 1.72991C7.33259 1.72991 7.06473 1.99777 7.06473 2.33259C7.06473 2.66741 7.33259 2.93527 7.66741 2.93527C8.00223 2.93527 8.27009 2.66741 8.27009 2.33259ZM9.96652 2.93527C9.92188 2.1317 9.7433 1.41741 9.16295 0.837054C8.58259 0.256696 7.8683 0.078125 7.06473 0.0334821C6.23884 -0.0111607 3.76116 -0.0111607 2.93527 0.0334821C2.1317 0.078125 1.43973 0.256696 0.837054 0.837054C0.256696 1.41741 0.078125 2.1317 0.0334821 2.93527C-0.0111607 3.76116 -0.0111607 6.23884 0.0334821 7.06473C0.078125 7.8683 0.256696 8.56027 0.837054 9.16295C1.43973 9.7433 2.1317 9.92188 2.93527 9.96652C3.76116 10.0112 6.23884 10.0112 7.06473 9.96652C7.8683 9.92188 8.58259 9.7433 9.16295 9.16295C9.7433 8.56027 9.92188 7.8683 9.96652 7.06473C10.0112 6.23884 10.0112 3.76116 9.96652 2.93527ZM8.89509 7.93527C8.73884 8.3817 8.3817 8.71652 7.95759 8.89509C7.28795 9.16295 5.72545 9.09598 5.01116 9.09598C4.27455 9.09598 2.71205 9.16295 2.06473 8.89509C1.6183 8.71652 1.28348 8.3817 1.10491 7.93527C0.837054 7.28795 0.904018 5.72545 0.904018 4.98884C0.904018 4.27455 0.837054 2.71205 1.10491 2.04241C1.28348 1.6183 1.6183 1.28348 2.06473 1.10491C2.71205 0.837054 4.27455 0.904018 5.01116 0.904018C5.72545 0.904018 7.28795 0.837054 7.95759 1.10491C8.3817 1.26116 8.71652 1.6183 8.89509 2.04241C9.16295 2.71205 9.09598 4.27455 9.09598 4.98884C9.09598 5.72545 9.16295 7.28795 8.89509 7.93527Z" fill="#C3CCCD"/>
                                                </svg> */}
                                                <img src={home6} alt='' />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-5">
                            <div className="banner-img">
                                <img src="src/assets/imgs/banner-img.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CategoriesGrid />

            <section className="find-jobs-section text-center">
                <div className="container">
                    <div className="heading-part">
                        <h2 className="section-heading-medium">More easier to <span>find a job</span> <br />
                        with our <span>platform</span></h2>

                        <p>The following features make our service easier to help you find suitable <br />
                            jobs from various companies</p>
                    </div>

                    <ul className="process-list">
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={easyApply} />
                                </figure>
                                <h3>Easy Applying</h3>
                                <p>The process of applying for a job is 
                                easier and faster.</p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={manyImg} />
                                </figure>
                                <h3>Many Vacancies</h3>
                                <p>There are many job vacancies from
                                    various companies.</p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={support} />
                                </figure>
                                <h3>Best Support</h3>
                                <p>We Provide full support for job seekers
                                    for better results.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <JobsGrid />

            <ContactUsSection />
            {/* <div className="banner">
                <div>Home</div>
                <NavLink to={'/auth/login'} key={uniqueId}>
                    <button>Login</button>
                </NavLink>
            </div> */}
        </Page>
    )
}

export default Home