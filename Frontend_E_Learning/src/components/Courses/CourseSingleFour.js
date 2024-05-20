import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'; 

const CourseSingleFour = (props) => {
    const { btnLink, courseClass, courseCategory, courseImg, catLink, courseTitle, coursePrice, studentQuantity, userRating, btnText, metaIcon } = props;
    const { idUser } = useAuth();
   

    
    return (
        <div style={{height: "480px"}} className={courseClass ? courseClass : 'courses-item'}>
            <div className="img-part">
                <img
                    src={courseImg}
                    alt={courseTitle}
                />
            </div>
            <div className="content-part">
                <span>
                    <Link className="categories" to={catLink ? catLink : 'course-categories'}>{courseCategory ? courseCategory : 'Web Development'}</Link>
                </span>
                <ul className="meta-part">
                    <li className="user">
                        <i className={metaIcon ? metaIcon : 'fa fa-user'}></i> {studentQuantity ? studentQuantity : '245'}
                    </li>
                    <li>
                        <span>
                            {coursePrice ? coursePrice : '$55.00'}
                        </span>
                    </li>
                </ul>
                <h3 className="title"><Link to="/course/course-single">{courseTitle ? courseTitle : 'Introduction to Quantitativ and Qualitative.'}</Link></h3>
                <div className="bottom-part">
                    <div className="info-meta">
                        <ul className="course-meta">
                            <li className="ratings">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <span>({userRating ? userRating : '03'})</span>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-part">
                        <Link to={btnLink && idUser ? `/admin/createchapitre/${btnLink}` : '#'}>{btnText ? btnText : 'Apply Now'} <i className="flaticon-next"></i></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CourseSingleFour