import React ,{useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext'; 


const MenuItems = (props) => {
    const { parentMenu, secondParentMenu } = props;
    const [rol,setRol]=useState("");
    const { role } = useAuth();
    

    const location = useLocation();
    useEffect(() => {
        const fetchRole = async () => {
          try {
            const userRole = await role(); 
            console.log("Role de l'utilisateur:", userRole);
            setRol(userRole);
          } catch (error) {
            console.error("Erreur lors de la récupération du rôle:", error);
          }
        };
    
        fetchRole();
      }, []);

    return (
        <React.Fragment>
            <li className={parentMenu === 'home' ? 'rs-mega-menu menu-item-has-children current-menu-item' : 'rs-mega-menu menu-item-has-children'}><Link to="/">Home</Link>
            </li>
            <li className={parentMenu === 'about' ? 'menu-item-has-children current-menu-item' : 'menu-item-has-children'}>
                <Link to="#">About</Link>
                
            </li>
            
            <li className={parentMenu === 'course' ? 'menu-item-has-children current-menu-item' : 'menu-item-has-children'}>
            <Link to="/course" as="#">Courses</Link>
                {rol && (rol === 'admin' || rol === 'enseignant') && (
                    <ul className="sub-menu">
                        <li>
                            <Link to="/course" className={location.pathname === "/course" ? "active-menu" : ""}>Add Courses</Link>
                        </li>
                        <li>
                            <Link to="/course-2" className={location.pathname === "/course-2" ? "active-menu" : ""}>Update Courses</Link>
                        </li>
                        {rol === 'admin' && (
                            <>
                                <li>
                                    <Link to="/admin/createns" className={location.pathname === "/admin/createns" ? "active-menu" : ""}>Add enseignant</Link>
                                </li>
                                <li>
                                    <Link to="/admin/createns" className={location.pathname === "/admin/createns" ? "active-menu" : ""}>Update enseignant</Link>
                                </li>
                            </>
                        )}
                    </ul>
                )}

                
            </li>
            <li className={parentMenu === 'pages' ? 'menu-item-has-children current-menu-item' : 'menu-item-has-children'}>
                <Link to="/event-3">Evenement</Link>
                {rol && (rol === 'admin' || rol === 'enseignant') && (
                    <ul className="sub-menu">
                        <li>
                            <Link to="/admin/createvt" className={location.pathname === "/course" ? "active-menu" : ""}>Add Evenement</Link>
                        </li>
                        <li>
                            <Link to="/course-2" className={location.pathname === "/course-2" ? "active-menu" : ""}>Update Evenement</Link>
                        </li>
                        
                    </ul>
                )}
                
            </li>
            <li className={parentMenu === 'blog' ? 'menu-item-has-children current-menu-item' : 'menu-item-has-children'}>
                <Link to="#">Blog</Link>
               
            </li>
            <li className={parentMenu === 'contact' ? 'menu-item-has-children current-menu-item' : 'menu-item-has-children'}>
                <Link to="#">
                    Contact
                </Link>
            </li>
        </React.Fragment>
    );
}

export default MenuItems;