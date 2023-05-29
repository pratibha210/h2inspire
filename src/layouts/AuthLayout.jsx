import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import './AuthLayout.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import logo1 from "../assets/imgs/logo.png"
import login1 from "../assets/imgs/login-bg.jpg"
import rating1 from "../assets/imgs/rating.png"


function AuthLayout() {
  return (
    <>
      <div className="scrollToTopBtn">
        top
          <i className="fa-solid fa-angle-up"></i>
      </div>
      <section className="log-in">
          <div className="log-left">
              <div className="form-wrap">
                  <div className="form-top">
                      <figure>
                          <Link to={'/'}>
                            <img src={logo1} />
                          </Link>
                      </figure>
                      <h3>
                          Lets get started with <br /> your <span>15 days free trial</span>
                      </h3>
                  </div>

                  <Outlet />
                  
              </div>
          </div>
          <div className="log-right" style={{"backgroundImage": `url(${login1})`}}>
              <div className="slide-wrap">
                  {/* <div className="swiper testimonial">
                      <div className="swiper-wrapper">
                          <div className="swiper-slide">
                              <div className="testi-wrap">
                                  <p>Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.</p>
                                  <div className="testi-bottom">
                                      <div className="name-place">
                                          <h4>Annie Jenifer</h4>
                                          <h6>Founder, JB Corps </h6>
                                      </div>
                                      <img src="/src/assets/imgs/rating.png" />
                                  </div>
                              </div>
                          </div>
                          <div className="swiper-slide">
                              <div className="testi-wrap">
                                  <p>“Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.”</p>
                                  <div className="testi-bottom">
                                      <div className="name-place">
                                          <h4>Annie Jenifer</h4>
                                          <h6>Founder, JB Corps </h6>
                                      </div>
                                      <img src="/src/assets/imgs/rating.png" />
                                  </div>
                              </div>
                          </div>
                          <div className="swiper-slide">
                              <div className="testi-wrap">
                                  <p>Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.</p>
                                  <div className="testi-bottom">
                                      <div className="name-place">
                                          <h4>Annie Jenifer</h4>
                                          <h6>Founder, JB Corps </h6>
                                      </div>
                                      <img src="/src/assets/imgs/rating.png" />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="swiper-pagination custom-pagination"></div>
                  </div> */}
                  <Swiper pagination={true} modules={[Pagination]} className="swiper testimonial">
                    <SwiperSlide>
                      <div className="testi-wrap">
                        <p>Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.</p>
                        <div className="testi-bottom">
                            <div className="name-place">
                                <h4>Annie Jenifer</h4>
                                <h6>Founder, JB Corps </h6>
                            </div>
                            <img src={rating1} />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="testi-wrap">
                        <p>Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.</p>
                        <div className="testi-bottom">
                            <div className="name-place">
                                <h4>Annie Jenifer</h4>
                                <h6>Founder, JB Corps </h6>
                            </div>
                            <img src="/src/assets/imgs/rating.png" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="testi-wrap">
                        <p>Curabitur pharetra id ex vel feugiat. Donec tortor turpis, ultrices sit amet velit eget, tincidunt cursus felis. Pellentesque vitae velit sapien. Maecenas rhoncus in lacus nec sollicitudin.</p>
                        <div className="testi-bottom">
                            <div className="name-place">
                                <h4>Annie Jenifer</h4>
                                <h6>Founder, JB Corps </h6>
                            </div>
                            <img src="/src/assets/imgs/rating.png" />
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
              </div>
          </div>
      </section>
      
    </>
  )
}

export default AuthLayout