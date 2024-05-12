import { db } from "../db.js";

export const createChapitre = (req, res) => {
    const { nom_chapitre, id_cours } = req.body;

    // Vérifier si tous les champs sont fournis
    if (!nom_chapitre || !id_cours) {
        return res.status(400).json("Tous les champs sont requis.");
    }

    // Insérer le chapitre dans la base de données
    const insertChapitreQuery = "INSERT INTO chapitre (nom_chapitre, id_cours) VALUES (?, ?)";
    const values = [nom_chapitre, id_cours];

    db.query(insertChapitreQuery, values, (err, data) => {
        if (err) {
            console.error("Erreur lors de la création du chapitre :", err);
            return res.status(500).json("Une erreur s'est produite lors de la création du chapitre.");
        }
        return res.status(200).json("Le chapitre a été créé avec succès.");
    });
};

export const getChapitre = (req, res) => {
    const id_cours = req.params.id; 
    
    const selectCoursesQuery = "SELECT * FROM chapitre WHERE id_cours = ?";

    db.query(selectCoursesQuery, id_cours, (err, data) => {
        if (err) {
            console.error("Error retrieving chapitres:", err);
            return res.status(500).json("An error occurred while retrieving chapitres.");
        }

        return res.status(200).json(data);
    });
};
