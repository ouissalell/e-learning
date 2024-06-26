import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import RSMobileMenu from './RSMobileMenu';
import CanvasMenu from './CanvasMenu';
import TopHeader from './TopBar';

import normalLogo from '../../../assets/img/logo/logo-yellow.png';
import yellowLogo from '../../../assets/img/logo/logo-yellow.png';
import darkLogo from '../../../assets/img/logo/logo-dark.png';

import productImg1 from '../../../assets/img/shop/1.jpg';
import productImg2 from '../../../assets/img/shop/2.jpg';

const HeaderStyleFive = (props) => {
	const { headerClass, parentMenu, secondParentMenu, activeMenu, headerNormalLogo, headerStickyLogo, mobileNormalLogo, TopBar, TopBarClass, emailAddress, phoneNumber, Location, CanvasLogo, CanvasClass } = props;
	const [menuOpen, setMenuOpen] = useState(false)

	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		// Sticky is displayed after scrolling for 100 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const searchModalAdd = () => {
		document.body.classList.add('modal-open');
	};

	const canvasMenuAdd = () => {
		document.body.classList.add('nav-expanded');
	};

	return (
		<React.Fragment>
			<div className={headerClass ? headerClass : 'full-width-header header-style2 modify1 header-home6'}>
				<header id="rs-header" className='rs-header'>
					{
						TopBar ? <TopHeader topBarClass={TopBarClass} emailAddress={emailAddress} phoneNumber={phoneNumber} Location={Location} /> : ""
					}

					<div className={isVisible ? 'menu-area menu-sticky sticky' : 'menu-area menu-sticky'}>
						<div className="container">
							<div className="row y-middle">
								<div className="col-lg-3">
									<div className="logo-cat-wrap">
										<div className="logo-part pr-96">
											<Link to="/">
												<img className="normal-logo" src={headerNormalLogo ? headerNormalLogo : normalLogo} alt="" />
												<img className="sticky-logo" src={headerStickyLogo ? headerStickyLogo : yellowLogo} alt="" />
											</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-9 text-center">
									<div className="rs-menu-area">
										<div className="main-menu pr-80 md-pr-14">
											<div className="mobile-menu md-display-block">
												<Link to="/" className="mobile-normal-logo"><img className="normal-logo" src={mobileNormalLogo ? mobileNormalLogo : normalLogo} alt="" /></Link>
												<Link to="/" className="mobile-sticky-logo"><img src={yellowLogo} alt="logo" /></Link>
												<Link to="#" className="rs-menu-toggle" onClick={() => {
													setMenuOpen(!menuOpen)
												}}>
													<i className="fa fa-bars"></i>
												</Link>
											</div>
											<nav className="rs-menu hidden-md">
												<ul className="nav-menu">
													<MenuItems
														parentMenu={parentMenu}
														secondParentMenu={secondParentMenu}
														activeMenu={activeMenu}
													/>
												</ul>
											</nav>
										</div>
										
												
									</div>
								</div>
							</div>
						</div>
					</div>

					<RSMobileMenu 
						menuOpen={menuOpen} 
						setMenuOpen={setMenuOpen} 
						parentMenu={parentMenu} 
						secondParentMenu={secondParentMenu}
					/>
					<div onClick={() => setMenuOpen(false)} className={menuOpen ? "body-overlay show" : "body-overlay"}></div>
				</header>
				<CanvasMenu
					canvasClass={CanvasClass ? CanvasClass : "right_menu_togle orange_color hidden-md"}
					canvasLogo={CanvasLogo ? CanvasLogo : darkLogo}
				/>
			</div>
		</React.Fragment>
	);
}

export default HeaderStyleFive;