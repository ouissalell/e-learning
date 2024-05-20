import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseSingleFour from '../../components/Courses/CourseSingleFour';
import { useAuth } from '../../context/authContext'; 

// Courses Image
import image1 from '../../assets/img/courses/4.jpg';
import image2 from '../../assets/img/courses/5.jpg';
import image3 from '../../assets/img/courses/6.jpg';
import image4 from '../../assets/img/courses/7.jpg';
import image5 from '../../assets/img/courses/8.jpg';
import image6 from '../../assets/img/courses/9.jpg';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const { idUser } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await idUser(); // Récupérer l'ID de l'utilisateur à partir du contexte d'authentification
                const response = await axios.get(`http://localhost:8800/api/auth/checkUserRole/${userId}`);
                const userRole = response.data.role;

                // Vérifier le rôle de l'utilisateur et agir en conséquence
                if (userRole !== 'enseignant') {
                    // Rediriger l'utilisateur non administrateur vers une autre page ou afficher un message d'erreur
                    navigate('/404'); // Exemple de redirection vers la page d'accueil
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du rôle de l'utilisateur :", error);
                // Afficher un message d'erreur ou rediriger vers une autre page en cas d'erreur
            }
        };

        fetchUserData(); // Appel de la fonction pour récupérer et vérifier le rôle de l'utilisateur
    }, [idUser, navigate]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const id_user = await idUser();
        try {
            const response = await axios.get(`http://localhost:8800/api/cours/getAllCoursesId/${id_user}`);
            setCourses(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        }
    };

    return (
        <React.Fragment>
            <div className="rs-popular-courses style3 orange-style pt-100 pb-100 md-pt-70 md-pb-80">
                <div className="container">
                    <div className="row">
                    {courses.map((cours, index) => (
                        <div  className="col-lg-4 col-md-6 col-sm-6 mb-40">
                            <CourseSingleFour
                                courseClass="courses-item"
                                courseImg={`http://localhost:8800/api/image/${cours.image}`}
                                courseCategory={cours.type}
                                courseTitle={cours.titre}
                                studentQuantity="245"
                                coursePrice="FREE"
                                btnText="Apply Now"
                                btnLink={cours.id}
                            />
                        </div>
                         ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Courses