import { db } from "../db.js";

export const createQuiz = (req, res) => {
    const { titre, duree,id_cours } = req.body;

    // Vérifier si tous les champs sont fournis
    if (!titre || !duree || !id_cours) {
        return res.status(400).json("Tous les champs sont requis.");
    }

    // Insérer le quiz dans la base de données
    const insertQuizQuery = "INSERT INTO quiz (titre, duree, id_cours) VALUES (?, ?, ?)";
    const values = [titre,duree, id_cours];

    db.query(insertQuizQuery, values, (err, data) => {
        if (err) {
            console.error("Erreur lors de la création du quiz :", err);
            return res.status(500).json("Une erreur s'est produite lors de la création du quiz.");
        }
        return res.status(200).json("Le quiz a été créé avec succès.");
    });
};


export const getQuiz = (req, res) => {
    const id_cours = req.params.id; 
    
    const selectCoursesQuery = "SELECT * FROM quiz WHERE id_cours = ?";

    db.query(selectCoursesQuery, id_cours, (err, data) => {
        if (err) {
            console.error("Error retrieving quiz:", err);
            return res.status(500).json("An error occurred while retrieving quiz.");
        }

        return res.status(200).json(data);
    });
};

export const getQuizId = (req, res) => {
    const id = req.params.id; 
    
    const selectCoursesQuery = "SELECT * FROM quiz WHERE id = ?";

    db.query(selectCoursesQuery, id, (err, data) => {
        if (err) {
            console.error("Error retrieving quiz:", err);
            return res.status(500).json("An error occurred while retrieving quiz.");
        }

        return res.status(200).json(data);
    });
};