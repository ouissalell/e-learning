import { db } from "../db.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

// Définir le stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire où enregistrer les fichiers
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4(); // Générer un UUID unique
    cb(null, uniqueSuffix + '-' + file.originalname); // Nom du fichier unique
  }
});

// Vérifier le type de fichier pour l'image
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configurer multer avec le stockage et le filtre
const upload = multer({ storage: storage, fileFilter: fileFilter });

export const createCours = (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error("Erreur Multer :", err);
            return res.status(500).json("Une erreur s'est produite lors du téléchargement de l'image.");
        } else if (err) {
            console.error("Erreur inattendue lors du téléchargement de l'image :", err);
            return res.status(500).json("Une erreur inattendue s'est produite lors du téléchargement de l'image.");
        }

        const { titre, description, dateCre, type, level,id_user  } = req.body;
        const imageName = req.file.filename; // Nom de l'image téléchargée

        if (  !titre || !description || !dateCre || !type || !level || !id_user || !imageName) {
            return res.status(400).json("Tous les champs sont requis.");
        }

        const insertCoursQuery = "INSERT INTO Cours ( titre, description, dateCre, type, level, id_user ,image) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [titre, description, dateCre, type, level, id_user , imageName];

        db.query(insertCoursQuery, values, (err, data) => {
            if (err) {
                console.error("Erreur lors de la création du cours :", err);
                return res.status(500).json("Une erreur s'est produite lors de la création du cours.");
            }
            return res.status(200).json("Le cours a été créé avec succès.");
        });
    });
};

export const getAllCourses = (req, res) => {
    const selectCoursesQuery = "SELECT * FROM Cours";

    db.query(selectCoursesQuery, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des cours :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération des cours.");
        }

        return res.status(200).json(data);
    });
};


export const getAllCoursesId = (req, res) => {
    const id_user = req.params.id; // Assuming id_user is passed as a parameter in the URL
    
    const selectCoursesQuery = "SELECT * FROM Cours WHERE id_user = ?";

    db.query(selectCoursesQuery, id_user, (err, data) => {
        if (err) {
            console.error("Error retrieving courses for user:", err);
            return res.status(500).json("An error occurred while retrieving courses for user.");
        }

        return res.status(200).json(data);
    });
};


export const getCourse = (req, res) => {
    const id_cours = req.params.id; 
    
    const selectCoursesQuery = "SELECT * FROM Cours WHERE id = ?";

    db.query(selectCoursesQuery, id_cours, (err, data) => {
        if (err) {
            console.error("Error retrieving course:", err);
            return res.status(500).json("An error occurred while retrieving course.");
        }

        return res.status(200).json(data);
    });
};