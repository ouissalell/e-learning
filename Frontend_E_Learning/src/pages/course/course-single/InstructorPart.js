import React, { useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/authContext'; 

// Image
import teamImg1 from '../../../assets/img/team/1.jpg';
import teamImg2 from '../../../assets/img/team/2.jpg';

const InstructorPart = () => {
    const [nam,setName]=useState("");
    const { name } = useAuth();
    const fetchName = async () => {
        try {
          const userName = await name(); 
          console.log("name de l'utilisateur:", userName);
          setName(userName);
        } catch (error) {
          console.error("Erreur lors de la récupération du rôle:", error);
        }
      };
      useEffect(() => {
    
        fetchName();
      }, []);

    return (
        <div className="content pt-30 pb-30 pl-30 pr-30 white-bg">
            <h3 className="instructor-title">Instructors</h3>
            <div className="row rs-team style1 orange-color transparent-bg clearfix">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="team-item">
                        <img src={teamImg2} alt="" />
                        <div className="content-part">
                            <h4 className="name"><a href="#">{nam}</a></h4>
                            <span className="designation">Professor</span>
                            <ul className="social-links">
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default InstructorPart;