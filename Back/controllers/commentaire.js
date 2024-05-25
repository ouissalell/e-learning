import { db } from "../db.js";

export const createComment = (req, res) => {
    const { iduser, commentaire } = req.body;

    // Vérifier si tous les champs sont fournis
    if (!iduser || !commentaire) {
        return res.status(400).json("Tous les champs sont requis.");
    }

    // Insérer le commentaire dans la base de données
    const insertCommentQuery = "INSERT INTO commentaire (iduser, commentaire) VALUES (?, ?)";
    const values = [iduser, commentaire];

    db.query(insertCommentQuery, values, (err, data) => {
        if (err) {
            console.error("Erreur lors de la création du commentaire :", err);
            return res.status(500).json("Une erreur s'est produite lors de la création du commentaire.");
        }
        return res.status(200).json("Le commentaire a été créé avec succès.");
    });
};

export const getComments = (req, res) => {
    const selectCommentsQuery = `
        SELECT c.id, c.commentaire, u.username, u.role
        FROM commentaire c
        JOIN users u ON c.iduser = u.id
    `;

    db.query(selectCommentsQuery, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des commentaires :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération des commentaires.");
        }
        return res.status(200).json(data);
    });
};