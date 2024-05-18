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


export const getChapitreAndActivite = (req, res) => {
    const id_cours = req.params.id;

    // Sélectionner tous les chapitres du cours en fonction de l'id_cours
    const selectChapitresQuery = "SELECT * FROM chapitre WHERE id_cours = ?";
    db.query(selectChapitresQuery, id_cours, (errChapitres, chapitresData) => {
        if (errChapitres) {
            console.error("Erreur lors de la récupération des chapitres :", errChapitres);
            return res.status(500).json("Une erreur s'est produite lors de la récupération des chapitres.");
        }

        // Pour chaque chapitre, récupérer toutes les activités associées
        const chapitresWithActivites = [];

        const getActivitesForChapitre = (chapitre, index) => {
            const selectActivitesQuery = "SELECT * FROM activite WHERE id_chapitre = ?";
            db.query(selectActivitesQuery, chapitre.id_chapitre, (errActivites, activitesData) => {
                if (errActivites) {
                    console.error("Erreur lors de la récupération des activités pour le chapitre", chapitre.id_chapitre, ":", errActivites);
                    return res.status(500).json("Une erreur s'est produite lors de la récupération des activités.");
                }

                // Ajouter les activités récupérées au chapitre correspondant
                chapitre.activites = activitesData;

                // Ajouter le chapitre avec ses activités au tableau
                chapitresWithActivites.push(chapitre);

                // Si toutes les activités de tous les chapitres ont été récupérées, retourner les résultats
                if (index === chapitresData.length - 1) {
                    return res.status(200).json(chapitresWithActivites);
                }
            });
        };

        // Pour chaque chapitre, récupérer toutes les activités associées
        chapitresData.forEach((chapitre, index) => {
            getActivitesForChapitre(chapitre, index);
        });
    });
};
