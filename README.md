// Description du projet Création d'une API pour un site de bars qui permet de gérer les bars, les biere et les commandes des clients. Il permet aussi de faire des recherche avancées sur les biere et les commandes.

// Schéma de base de donnée Bars id : integer name : string, unique adresse: string tel: string email: string description: text

Biere name: string description: text degree : float prix: float, min(0) bars_id: integer

Biere_Commande (table de liaison) plat_id: commande_id:

Commande name: string prix: float, min(0) bars_id: integer date: date status : string (en cours, terminée)

// Liste des endpoints BARS : POST /bars => Ajouter un bars PUT /bars/:id_bar => Modifier un bars DELETE /bars/:id_bar => Supprimer un bars GET /bars => Liste des bars GET /bars/:id_bar => Détail d'un bars

BIERE : POST /bars/:id_bar/biere => Ajouter un plat à un bars PUT /biere/:id_biere => Modifier un plat DELETE /biere/:id_biere => Supprimer un plat d'un bars GET /bars/:id_bar/biere => Liste des biere d'un bars GET /biere/:id_biere => Détail d'un plat

COMMANDE : POST /bars/:id_bar/commandes => Ajouter une commande à un bars PUT /commandes/:id_commande => Modifier une commande d'un bars DELETE /commandes/:id_commande => Supprimer une commande d'un bars GET /bars/:id_bar/commandes => Liste des commandes d'un bars GET /commandes/:id => Détail d'une commande d'un bars

BIERE_COMMANDE : POST /commandes/:id/biere/:id => Ajouter un plat à une commande DELETE /commandes/:id/biere/:id => Supprimer un plat d'une commande

// Liste des endpoints avancés GET /bars/:id_bar/commandes?date=2021-01-01 => Liste des commandes d'un bars à une date donnée GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bars avec un prix compris entre 10 et 20 GET /bars?ville=Paris => Liste des bars d'une ville donnée GET /bars?name=example => Liste des bars dont le nom contient "example" GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bars

// Liste des fichiers recommandés - models/ - bars.js - biere.js - commande.js - biere_commande.js - router/ - barsRouter.js - biereRouter.js - commandeRouter.js - biere_commandeRouter.js - controllers/ - barsController.js - biereController.js - commandeController.js - biere_commandeController.js - validateur/ - barsValidator.js - biereValidator.js - commandeValidator.js - biere_commandeValidator.js - config/ - database.js .env index.js package.json

// Liste des modules à installer (recommendation) - express - body-parser - sequelize - sqlite3 - nodemon - express-validator - dotenv - faker(Optionnel pour générer des fausses données) - jest(Optionnel pour les tests) - supertest(Optionnel pour les tests)

// Liste des contraintes sur mes routes et models : - Tous les champs obligatoires doivent être renseignés - Le nom d'un bars doit être unique - Le prix d'une biere doit être positif - Le prix d'une commande doit être positif - Le status d'une commande doit être "en cours" ou "terminée" - Le status d'une commande ne peut pas être modifié si elle contient des biere - une commande ne peut pas être modifié si elle est terminée - La date d'une commande ne peut pas être supérieure à la date du jour - Quand je supprime un bars, je supprime toutes les biere et les commandes associées - Quand je supprime une biere, je supprime toutes les commandes associées - Quand je supprime une commande, je supprime toutes les biere_commande associées

// BONUS

GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bars avec un prix compris entre 10 et 20 GET /bars/:id_bar/degree?date=2021-01-01 => Degré d'alcool moyen des bières des commandes d'un bars à une date donnée GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20 => Liste des commandes d'un bars à une date donnée avec un prix compris entre 10 et 20 GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée => Liste des commandes d'un bars à une date donnée avec un prix compris entre 10 et 20 et terminée GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée&name=example => Liste des commandes d'un bars à une date donnée avec un prix compris entre 10 et 20 et terminée et dont le nom contient "example" GET /bars/:id_bar/biere?sort=asc => Liste des biere d'un bars triées par ordre alphabétique GET /bars/:id_bar/biere?sort=desc => Liste des biere d'un bars triées par ordre alphabétique inversé GET /bars/:id_bar/biere?sort=asc&limit=10 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10 GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10 GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10 et un prix compris entre 10 et 20 (amusez-vous bien) GET /commande/details/:id_commande => renvoie un pdf de la commande

// BONUS 2 Tester les routes avec Jest et Supertest

// BONUS 3 Venez me voir pour le bonus 3
