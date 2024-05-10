import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Vérifier si l'utilisateur existe déjà
  const checkExistingUserQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(checkExistingUserQuery, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hacher le mot de passe et créer un utilisateur
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery = "INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [req.body.username, req.body.email, hash, req.body.role || 'user']; 

    db.query(insertUserQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // Vérifier si l'utilisateur existe dans la table des utilisateurs
  const checkUserQuery = "SELECT * FROM users WHERE email = ? ";

  db.query(checkUserQuery, [req.body.email], (err, userData) => {
    if (err) return res.status(500).json(err);
    
    // Si l'utilisateur n'est pas trouvé dans la table des utilisateurs, rechercher dans la table des administrateurs
    if (userData.length === 0) {
      const checkAdminQuery = "SELECT * FROM admins WHERE email = ? ";
      db.query(checkAdminQuery, [req.body.email], (err, adminData) => {
        if (err) return res.status(500).json(err);
        
        // Si l'administrateur n'est pas trouvé non plus, renvoyer une erreur
        if (adminData.length === 0) return res.status(404).json("User not found!");
        
        // Sinon, l'utilisateur est un administrateur, traiter la connexion de la même manière que pour un utilisateur normal
        processLogin(adminData[0]);
      });
    } else {
      // Sinon, l'utilisateur est trouvé dans la table des utilisateurs, traiter la connexion normalement
      processLogin(userData[0]);
    }
  });

  // Fonction pour traiter la connexion une fois que l'utilisateur est trouvé
  const processLogin = (userData) => {
    // Vérifier le mot de passe
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData.password);

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Générer le token JWT avec le rôle inclus
    const token = jwt.sign({ id: userData.id, role: userData.role }, "jwtkey");

    // Retirer le mot de passe de la réponse
    const { password, ...other } = userData;

    // Envoyer le token JWT et les informations de l'utilisateur (à l'exception du mot de passe)
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token, ...other });
  };
};

export const logout = (req, res) => {
  // Déconnexion de l'utilisateur et suppression du cookie du token
  res.clearCookie("access_token").status(200).json("User has been logged out.");
};