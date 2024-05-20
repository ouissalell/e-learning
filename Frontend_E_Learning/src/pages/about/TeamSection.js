import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleTeam from '../../components/Team/SingleTeam';
import SectionTitle from '../../components/Common/SectionTitle';

// Team Members
import teamimg1 from '../../assets/img/team/1.jpg';
import teamimg2 from '../../assets/img/team/2.jpg';
import teamimg3 from '../../assets/img/team/3.jpg';
import teamimg4 from '../../assets/img/team/4.jpg';
import teamimg5 from '../../assets/img/team/5.jpg';
import teamimg6 from '../../assets/img/team/6.jpg';

const Team = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchLatestTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/auth/latestTeachers');
                setTeachers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des derniers enseignants :", error);
            }
        };

        fetchLatestTeachers();
    }, []);

    return (
        <React.Fragment>
            <div id="rs-team" className="rs-team style1 inner-style orange-style pt-102 pb-110 md-pt-64 md-pb-70 gray-bg">
                <div className="container">
                    <div className="row">
                    <SectionTitle
                        teamClass="team-item"
                        Image={teamimg3}
                        Title="545"
                        Designation="ggjhhj"
                    />
                        {teachers.map((teacher, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-30">
                                 <SectionTitle
                                    teamClass="team-item"
                                    Image={teamimg3}
                                    Title={teacher.username}
                                    Designation={teacher.role}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Team;