import { db } from "../db.js";

export const createQuestion = (req, res) => {
    const { question, rep1,rep2,rep3,rep4,repC , id_quiz } = req.body;

    // Vérifier si tous les champs sont fournis
    if (!question || !rep1 || !rep2|| !rep3 || !rep4|| !repC || !id_quiz ) {
        return res.status(400).json("Tous les champs sont requis.");
    }

    // Insérer le quiz dans la base de données
    const insertQuestionQuery = "INSERT INTO question (question, reponse1, reponse2, reponse3, reponse4, reponse_correcte,id_quiz) VALUES (?, ?, ?,?,?,?,?)";
    const values = [question,rep1, rep2,rep3,rep4,repC,id_quiz];

    db.query(insertQuestionQuery, values, (err, data) => {
        if (err) {
            console.error("Erreur lors de la création du quiz :", err);
            return res.status(500).json("Une erreur s'est produite lors de la création du question.");
        }
        return res.status(200).json("Le quiestion a été créé avec succès.");
    });
};


export const getQuestions = (req, res) => {
    const id_quiz = req.params.id; 
    
    const selectCoursesQuery = "SELECT * FROM question WHERE id_quiz = ?";

    db.query(selectCoursesQuery, id_quiz, (err, data) => {
        if (err) {
            console.error("Error retrieving questions:", err);
            return res.status(500).json("An error occurred while retrieving question.");
        }

        return res.status(200).json(data);
    });
};
