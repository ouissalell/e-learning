import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link , useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import Newsletter from '../components/Common/Newsletter';
import ScrollToTop from '../components/Common/ScrollTop';
import OffWrap from '../components/Layout/Header/OffWrap';
import SiteBreadcrumb from '../components/Common/Breadcumb';
import SearchModal from '../components/Layout/Header/SearchModal';

// Image
import favIcon from '../assets/img/fav-orange.png';
import Logo from '../assets/img/logo/dark-logo.png';
import footerLogo from '../assets/img/logo/lite-logo.png';

import bannerbg from '../assets/img/breadcrumbs/inner7.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const login = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            const body = JSON.stringify({ email, password });
    
            const res = await axios.post('http://localhost:8801/api/auth/login', body, config);
            
            // Enregistrement du token JWT dans un cookie avec une durée de vie de 1 heure
            localStorage.setItem('access_token', res.data.token);
    
            // Rediriger l'utilisateur vers la page d'accueil après la connexion réussie
            navigate("/");
    
            console.log(res.data); // Log the response data
    
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu='pages'
                secondParentMenu='others'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                CanvasLogo={Logo}
                mobileNormalLogo={Logo}
                CanvasClass="right_menu_togle hidden-md"
                headerClass="full-width-header header-style1 home8-style4"
                TopBar='enable'
                TopBarClass="topbar-area home8-topbar"
                emailAddress='support@website.com'
                Location='374 William S Canning Blvd, MA 2721, USA '
            />

            {/* breadcrumb-area-start */}
            <SiteBreadcrumb
                pageTitle="Login"
                pageName="Login"
                breadcrumbsImg={bannerbg}
            />
            {/* breadcrumb-area-End */}

            {/* Login Part Start */}
            <div className="rs-login pt-100 pb-100 md-pt-80 md-pb-80">
                <div className="container">
                    <div className="noticed">
                        <div className="main-part">
                            <div className="method-account">
                                <h2 className="login">Login</h2>
                                <form onSubmit={login}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    <button type="submit" className="readon submit-btn">Login</button>
                                    <div className="last-password">
                                        <p>Not registered? <Link to="/register">Create an account</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Login Part End */}

            <Newsletter
                sectionClass="rs-newsletter style1 orange-color mb--90 sm-mb-0 sm-pb-80"
                titleClass="title mb-0 white-color"
            />

            <Footer
                footerClass="rs-footer home9-style main-home"
                footerLogo={footerLogo}
            />

            {/* scrolltop-start */}
            <ScrollToTop
                scrollClassName="scrollup orange-color"
            />
            {/* scrolltop-end */}

            <SearchModal />
        </React.Fragment>

    );
}


export default Login;