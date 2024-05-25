import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams,Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import Newsletter from '../../components/Common/Newsletter';
import ScrollToTop from '../../components/Common/ScrollTop';
import OffWrap from '../../components/Layout/Header/OffWrap';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import SearchModal from '../../components/Layout/Header/SearchModal';
import { useAuth } from '../../context/authContext'; 
import img from '../../assets/img/breadcrumbs/upload.png';
import '../../assets/scss/modal.scss';
// Image
import favIcon from '../../assets/img/fav-orange.png';
import Logo from '../../assets/img/logo/dark-logo.png';
import footerLogo from '../../assets/img/logo/lite-logo.png';
import bannerbg from '../../assets/img/breadcrumbs/inner7.jpg';

const CreateChaCours = () => {
    const [openModal,setOpenModal]=useState(false);
    const [questions, setQuestions] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const { id } = useParams();
    const { idUser } = useAuth();
    const [inputs, setInputs] = useState({
        question:"",
        rep1:"",
        rep2:"",
        rep3:"",
        rep4:"",
        repC:"",

    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await idUser(); // Récupérer l'ID de l'utilisateur à partir du contexte d'authentification
                const response = await axios.get(`http://localhost:8801/api/auth/checkUserRole/${userId}`);
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

    // Gestionnaire d'événements pour les champs de texte
const handleInputChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
};


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
        await axios.post("http://localhost:8801/api/question/createQuestion", {
            question : inputs.question,
            rep1 :inputs.rep1,
            rep2 :inputs.rep2,
            rep3 :inputs.rep3,
            rep4 :inputs.rep4,
            repC :inputs.repC,
            id_quiz :id,
        });
        fetchQuestion();
        toast.success('question créé avec succès', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setInputs({
            question : "",
            rep1 :"",
            rep2 :"",
            rep3 :"",
            rep4 :"",
            repC :""
        });
        
        setOpenModal(false);
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(err.response.data);
        } else {
            toast.error('Une erreur inattendue s\'est produite lors de la création de question');
        }
    }
};

    const fetchid = async () => {
        try { 
          
          const userid = await idUser();
          setInputs(prev => ({ ...prev, idUse: userid }));
        } catch (error) {
          console.error("Erreur lors de la récupération du id:", error);
        }
      };
    

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:8801/api/quiz/getQuizId/${id}`);
            setQuiz(response.data[0]);
           console.log(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        }
    };
    const fetchQuestion = async () => {
        try {
            const response = await axios.get(`http://localhost:8801/api/question/getQuestions/${id}`);
            setQuestions(response.data);
           console.log(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        }
    };
    
    useEffect(() => {
        fetchQuiz();
        fetchQuestion();
        fetchid();
       
      }, [id]);


       
    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu='course'
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
                pageTitle=" Chapitre"
                pageName="Create Chapitre"
                breadcrumbsImg={bannerbg}
            />
            {/* breadcrumb-area-End */}
            { !quiz  ?
            <div  className='ext-modal'>
                <div class="col-3">
                    <div class="snippet" data-title="dot-spin">
                        <div class="stage">
                        <div class="dot-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
           :
            <div style={{marginBottom:"100px"}} className="register-section pt-100 pb-100 md-pt-80 md-pb-80">
                <div className="container">
                <div style={{width: "100%"}} class="col-lg-4 order-last">
                    <div class="notice-bord style1">
                        <div className='chap-f-b'>
                        {quiz && <>
                            <div>
                                <h4 class="title">Quiz  : <span style={{color:"black" , fontSize:"16px" , marginLeft:"10px"}}>{quiz.titre}</span></h4>
                            </div>    
                        </>}
                        <div className='chap-f-b'>

                        <div className='ul-chap'>
                            <ul>
                            {questions && questions.map((question, index) => (
                                <li>
                                    <div className='li-' style={{display:"flex"}}>
                                        <div class="date">
                                            <span>{index +1}</span>
                                        </div>
                                            <div class="desc">{question.question}</div>
                                        <div className='ul-img-chap'>
                                            <button>
                                                <img width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/1A1A1A/create-new--v2.png" alt="create-new--v2"/>
                                            </button>
                                            <button>
                                            <img width="20" height="20" src="https://img.icons8.com/wired/64/f00000/filled-trash.png" alt="filled-trash"/>
                                            </button>
                                       
                                        </div>
                                    </div>
                                </li>
                                 ))}
                            </ul>
                        </div>
                        </div>
                        <div class="form-group mb-0">
                            <button class="re-button" onClick={()=>{setOpenModal(true)}} >Ajouter Quistion</button>
                        </div>
                    </div>
                    </div>
                </div>
                    
                    
                <div style={{display : openModal ? "block" : "none"}} className='ext-modal'>
    <div className='modal-act-add-cat'>
        <button className='btn-fermer-modal' onClick={()=>{setOpenModal(false)}} >
            <img width="24" height="24" src="https://img.icons8.com/quill/100/ff5421/x.png" alt="x"/> 
        </button>
        <div className='titre-h2-modal'>
            <h2>Question</h2>
        </div>
        <div className='div-form-question'>
        <form onSubmit={handleSubmit} id="" >
            <div className="input-question">
                <input type="text" id="question" name="question"  placeholder="question" value={inputs.question} onChange={handleInputChange}  required />
            </div>
            <div className='input-question-quiz'>
                <div className="">
                    <input type="text" id="rep1" name="rep1"  placeholder="Repense 1" value={inputs.rep1} onChange={handleInputChange}  required />
                </div>
                <div className="">
                    <input type="text" id="rep2" name="rep2"  placeholder="Repense 2" value={inputs.rep2} onChange={handleInputChange}  required />
                </div>
                <div className="">
                    <input type="text" id="rep3" name="rep3"  placeholder="Repense 3" value={inputs.rep3} onChange={handleInputChange}  required />
                </div>
                <div className="">
                    <input type="text" id="rep4" name="rep4"  placeholder="Repense 4" value={inputs.rep4} onChange={handleInputChange}  required />
                </div>
                <div className="">
                    <select value={inputs.repC} onChange={handleInputChange} name="repC" required>
                        <option value="">Sélectionner la réponse correcte</option>
                        <option value={inputs.rep1}>{inputs.rep1}</option>
                        <option value={inputs.rep2}>{inputs.rep2}</option>
                        <option value={inputs.rep3}>{inputs.rep3}</option>
                        <option value={inputs.rep4}>{inputs.rep4}</option>
                    </select>
                </div>
            </div>
            <button className='btn-question'>Submit</button>
            <div class="users-a-a">change Categorie?</div>
        </form>
        </div>
    </div>
</div>

                   
                    
                </div>
            </div>
            }
            {/* Register End */}

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
            <ToastContainer />
        </React.Fragment>

    );
}

export default CreateChaCours;
