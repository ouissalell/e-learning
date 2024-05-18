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

// Utiliser multer pour télécharger l'image
// Utiliser multer pour télécharger l'image
export const createEvent = (req, res) => {
    
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Une erreur multer s'est produite
        console.error("Erreur Multer :", err);
        return res.status(500).json("Une erreur s'est produite lors du téléchargement de l'image.");
      } else if (err) {
        // Une erreur inattendue s'est produite
        console.error("Erreur inattendue lors du téléchargement de l'image :", err);
        return res.status(500).json("Une erreur inattendue s'est produite lors du téléchargement de l'image.");
      }
  
      // L'image a été téléchargée avec succès, maintenant enregistrez son nom dans la base de données
      const { titre, description, datedebut, heuredebut, datefin, heurefin,iduser,ville,categorie } = req.body;
      const imageName = req.file.filename; // Nom de l'image téléchargée
  
      // Formater les dates au format "aaaa/mm/dd"
      const formattedDateDebut = formatDate(datedebut);
      const formattedDateFin = formatDate(datefin);
  
      // Vérifier si toutes les données requises sont fournies
      if (!titre || !description || !datedebut || !heuredebut || !datefin || !heurefin || !imageName || !ville || !categorie ) {
        return res.status(400).json("Tous les champs sont requis.");
      }
  
      const insertEventQuery = "INSERT INTO evenement (titre, description, datedebut, heuredebut, datefin, heurefin, image, iduser,ville,categorie) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";
      const values = [titre, description, formattedDateDebut, heuredebut, formattedDateFin, heurefin, imageName, iduser,ville,categorie];
  
      db.query(insertEventQuery, values, (err, data) => {
        if (err) {
          console.error("Erreur lors de la création de l'événement :", err);
          return res.status(500).json("Une erreur s'est produite lors de la création de l'événement.");
        }
        return res.status(200).json("L'événement a été créé avec succès.");
      });
    });
  };
  
  // Fonction pour formater la date au format "aaaa/mm/dd"
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  

  export const getAllEvents = (req, res) => {
    const selectEventsQuery = "SELECT * FROM evenement";
  
    db.query(selectEventsQuery, (err, data) => {
        if (err) {
            console.error("Erreur lors de la récupération des événements :", err);
            return res.status(500).json("Une erreur s'est produite lors de la récupération des événements.");
        }

        // Convertir les objets Date en chaînes de caractères au format "aaaa-mm-jj"
        const eventsWithFormattedDates = data.map(event => {
            // Convertir les dates en chaînes de caractères au format "aaaa-mm-jj"
            const formattedEvent = {
                ...event,
                datedebut: event.datedebut.toISOString().split('T')[0], // Convertir la date de début en chaîne au format "aaaa-mm-jj"
                datefin: event.datefin.toISOString().split('T')[0], // Convertir la date de fin en chaîne au format "aaaa-mm-jj"
            };
            return formattedEvent;
        });

        return res.status(200).json(eventsWithFormattedDates); // Renvoyer les événements avec les dates formatées en tant que réponse
    });
};


export const getAllEventsId = (req, res) => {
  const iduser = req.params.id;
  const selectEventsQuery = "SELECT * FROM evenement WHERE iduser = ?";

  db.query(selectEventsQuery, iduser,(err, data) => {
      if (err) {
          console.error("Erreur lors de la récupération des événements :", err);
          return res.status(500).json("Une erreur s'est produite lors de la récupération des événements.");
      }

      // Convertir les objets Date en chaînes de caractères au format "aaaa-mm-jj"
      const eventsWithFormattedDates = data.map(event => {
          // Convertir les dates en chaînes de caractères au format "aaaa-mm-jj"
          const formattedEvent = {
              ...event,
              datedebut: event.datedebut.toISOString().split('T')[0], // Convertir la date de début en chaîne au format "aaaa-mm-jj"
              datefin: event.datefin.toISOString().split('T')[0], // Convertir la date de fin en chaîne au format "aaaa-mm-jj"
          };
          return formattedEvent;
      });

      return res.status(200).json(eventsWithFormattedDates); // Renvoyer les événements avec les dates formatées en tant que réponse
  });
};

