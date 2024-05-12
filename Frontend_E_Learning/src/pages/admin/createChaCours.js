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
    const [course, setCourse] = useState(null);
    const [chapitre, setChapitre] = useState(null);
    const { id } = useParams();
    const { idUser } = useAuth();
    const [inputs, setInputs] = useState({
        chapitre: ""
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    // Gestionnaire d'événements pour les champs de texte
const handleInputChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
};




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            await axios.post("http://localhost:8800/api/chapitre/createChapitre", {
                nom_chapitre : inputs.chapitre,
                id_cours : course[0].id
            });
            toast.success('chapitre créé avec succès', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchChapitre();
            setInputs({
                chapitre : "",
            });
            setOpenModal(false);
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            } else {
                toast.error('Une erreur inattendue s\'est produite lors de la création de l\'événement.');
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

      const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/cours/getCourse/${id}`);
            setCourse(response.data);
           console.log(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        }
    };
    const fetchChapitre = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/chapitre/getChapitre/${id}`);
            setChapitre(response.data);
           console.log(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        }
    };
    
    useEffect(() => {
        fetchChapitre();
        fetchCourse();
        fetchid();
       
      }, [id]);


       
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
                pageTitle=" Cours"
                pageName="Create Cours"
                breadcrumbsImg={bannerbg}
            />
            {/* breadcrumb-area-End */}
            { !course || !chapitre ?
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
                    
                        <div>
                            <h4 class="title">Chapitre Cours : <span style={{color:"black" , fontSize:"16px" , marginLeft:"10px"}}>{course && course[0].titre}</span></h4>
                        </div>
                        <div className='chap-f-b'>

                        <div className='ul-chap'>
                            <ul>
                            {chapitre.map((chapitre, index) => (
                                <li>
                                    <div className='li-' style={{display:"flex"}}>
                                        <div class="date">
                                            <span>{index +1}</span>
                                        </div>
                                            <div class="desc"><a href={`/admin/createactivite/${chapitre.id_chapitre}`}>{chapitre.nom_chapitre}</a></div>
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
                        <div class="form-group mb-0">
                            <button class="re-button" onClick={()=>setOpenModal(true)}>Ajouter Chapitre</button>
                        </div>
                    </div>
                    </div>
                </div>
                    
                    
                    <div style={{display : openModal ? "block" : "none"}} className='ext-modal'>   
                        <div className='modal-add-chap'>
                            <button className='btn-fermer-modal' onClick={()=>setOpenModal(false)} >
                                <img width="24" height="24" src="https://img.icons8.com/quill/100/ff5421/x.png" alt="x"/> 
                            </button>
                            <div className='titre-h2-modal'>
                                <h2>Create Chapitre</h2>
                            </div>
                            <div className='name-cours-chap'>
                                <h5>Course : </h5><span>{course && course[0].titre}</span> 
                            </div>
                            <form id="" onSubmit={handleSubmit}>
                                    <div className="">
                                        <input type="text" id="chapitre" name="chapitre"  placeholder="Titre de Chapitre" value={inputs.titre} onChange={handleInputChange}  required />
                                    </div>
                                    <button>Submit</button>
                            </form>
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
