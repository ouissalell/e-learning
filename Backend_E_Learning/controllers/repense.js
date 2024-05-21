import { db } from "../db.js";

export const createRepense = (req, res) => {
    const { resultat, idquestion, idUser } = req.body;

    // Vérifier si tous les champs sont fournis
    if (!resultat || !idquestion || !idUser) {
        return res.status(400).json("Tous les champs sont requis.");
    }

    // Récupérer la réponse correcte de la question associée
    const selectCorrectAnswerQuery = "SELECT reponse_correcte FROM question WHERE id = ?";
    db.query(selectCorrectAnswerQuery, [idquestion], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de la réponse correcte de la question :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération de la réponse correcte de la question.");
        }

        // Vérifier si la réponse est correcte
        const reponseCorrecte = result[0].reponse_correcte;
        const isCorrect = (reponseCorrecte === resultat) ? "true" : "false";

        // Insérer la réponse dans la base de données avec le résultat de vérification
        const insertReponseQuery = "INSERT INTO reponse (resultat, idquestion, idUser) VALUES (?, ?, ?)";
        const values = [isCorrect, idquestion, idUser];

        db.query(insertReponseQuery, values, (err, data) => {
            if (err) {
                console.error("Erreur lors de l'enregistrement de la réponse :", err);
                return res.status(500).json("Une erreur s'est produite lors de la création de la réponse.");
            }
            return res.status(200).json("La réponse a été créée avec succès.");
        });
    });
};

export const fetchFirstFalseResponseQuestion = (req, res) => {
    const { idQuiz, idUser } = req.params;

    // Sélectionner la première question qui n'a pas de correspondance dans la table "reponse" avec le même "idquestion" et "idUser"
    const selectFirstFalseResponseQuery = `
        SELECT * 
        FROM question 
        WHERE id_quiz = ? 
        AND id NOT IN (
            SELECT idquestion 
            FROM reponse 
            WHERE idUser = ?
        ) 
        LIMIT 1`;

    db.query(selectFirstFalseResponseQuery, [idQuiz, idUser], (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération de la première question sans réponse :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération de la première question sans réponse.");
        }

        // Vérifier si une question sans réponse a été trouvée
        if (data.length === 0) {
            return res.status(200).json(0);
        }

        // Renvoyer la première question sans réponse
        const firstQuestionWithoutResponse = data[0];
        return res.status(200).json(firstQuestionWithoutResponse);
    });
};


export const getQuizScore = (req, res) => {
    const { idQuiz, idUser } = req.params;

    calculateQuizScore(idQuiz, idUser)
        .then(({ correctResponses, scorePercentage }) => {
            res.status(200).json({ correctResponses, scorePercentage });
        })
        .catch(error => {
            console.error("Erreur lors du calcul du score du quiz :", error);
            res.status(500).json("Une erreur s'est produite lors du calcul du score du quiz.");
        });
};

const calculateQuizScore = (idQuiz, idUser) => {
    return new Promise((resolve, reject) => {
        // Sélectionner toutes les réponses de l'utilisateur pour le quiz spécifié
        const selectUserResponsesQuery = `
            SELECT resultat
            FROM reponse
            INNER JOIN question ON reponse.idquestion = question.id
            WHERE question.id_quiz = ? AND reponse.idUser = ?`;

        db.query(selectUserResponsesQuery, [idQuiz, idUser], (err, userResponses) => {
            if (err) {
                console.error("Erreur lors de la récupération des réponses de l'utilisateur :", err);
                return reject("Une erreur s'est produite lors du calcul du score du quiz.");
            }

            // Compter le nombre total de réponses et le nombre de réponses correctes
            let totalResponses = 0;
            let correctResponses = 0;

            userResponses.forEach(response => {
                totalResponses++;
                if (response.resultat === "true") {
                    correctResponses++;
                }
            });

            // Calculer le pourcentage de réponses correctes
            const scorePercentage = (correctResponses / totalResponses) * 100;

            // Renvoyer le nombre de réponses correctes et le pourcentage de réponses correctes
            resolve({ correctResponses, scorePercentage });
        });
    });
};


export const deleteResponsesByQuizAndUser = (req, res) => {
    const { idQuiz, idUser } = req.params;

    // Vérifier si les identifiants de quiz et d'utilisateur sont fournis
    if (!idQuiz || !idUser) {
        return res.status(400).json("Les identifiants de quiz et d'utilisateur sont requis.");
    }

    // Récupérer toutes les questions associées à l'identifiant de quiz fourni
    const selectQuestionsQuery = "SELECT id FROM question WHERE id_quiz = ?";
    db.query(selectQuestionsQuery, [idQuiz], (err, questions) => {
        if (err) {
            console.error("Erreur lors de la récupération des questions du quiz :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération des questions du quiz.");
        }

        // Si aucune question n'est associée à l'identifiant de quiz, retourner un message
        if (questions.length === 0) {
            return res.status(404).json("Aucune question n'est associée à l'identifiant de quiz fourni.");
        }

        // Créer un tableau d'identifiants de questions à partir des résultats de la requête
        const questionIds = questions.map(question => question.id);

        // Supprimer toutes les réponses de l'utilisateur associées à ces questions
        const deleteResponsesQuery = "DELETE FROM reponse WHERE idquestion IN (?) AND idUser = ?";
        db.query(deleteResponsesQuery, [questionIds, idUser], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression des réponses :", err);
                return res.status(500).json("Une erreur s'est produite lors de la suppression des réponses.");
            }
            // Supprimer le certificat associé à l'ID du cours, de l'utilisateur et du quiz
        const deleteCertificateQuery = "DELETE FROM Certificat WHERE idCours = (SELECT idCours FROM quiz WHERE id = ?) AND idUser = ? AND idQuiz = ?";
        db.query(deleteCertificateQuery, [idQuiz, idUser], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression du certificat :", err);
                return res.status(500).json("Une erreur s'est produite lors de la suppression du certificat.");
            }
           
        })
        return res.status(200).json("Toutes les réponses pour le quiz ont été supprimées avec succès.");
        });
    });
};