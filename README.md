Projet React
GUILLOT Clémentine, FORESTIER Louis, FRADET Amandine

- [1. Installation et lancement](#1-installation-et-lancement)
- [2. Présentation](#2-présentation)
- [3. Base de données](#3-base-de-données)
- [4. Développement](#4-développement)
  - [Single page html (public)](#single-page-html-public)
  - [Vues et Composants (src/app, src/app/view, src/app/component)](#vues-et-composants-srcapp-srcappview-srcappcomponent)
  - [Serveur et Routeurs (src/server, src/server/router)](#serveur-et-routeurs-srcserver-srcserverrouter)

# 1. Installation et lancement
Le projet web react_project peut s'ouvrir avec IntelliJ.   
Dans ce répertoire, effectuez la commande suivante : npm install   
Pour accéder à la base de données hébergée sur CleverCloud, les informations de connexion se trouvent dans le fichier ".env".
Pour lancer le projet, toujours depuis IntelliJ, faites un clic droit sur le fichier package.json -> Show npm Scripts. 
Un nouvel encart apparaît d'où vous pourrez lancer start-web (client) et start-dev (serveur).   
L'adresse de l'application est localhost:3002.   
Vous pouvez ouvrir votre navigateur à cet adresse et vous aurez accès à notre application.   
Nous avons réussi à utiliser parcel build mais nous n'avons pas réussi à relier les fichiers générés au back. 

# 2. Présentation
Lorsque vous arriver sur l'application, vous pouvez voir le planning complet ainsi que les manches et le nombre de personnes inscrites. 
Il n'est pas possible d'interagir avec lui tant que vous n'êtes pas connecté.   
Pour vous connecter, utiliser la barre de navigation pour accéder à "Sign in". Là, vous pourrez entrer votre pseudo et votre mot de passe.   
Si vous n'êtes pas déjà inscrit dans la base de données, vous pouvez vous enregistrer avec "Sign up". Il faudra entrer votre nom, prénom, pseudo et mot de passe. 
Vous pourrez ainsi, en revenat sur "Planning", vous inscrire à une manche en cliquant sur le bouton "S'inscrire" correspondant.   
L'administrateur dispose de quelques fonctionnalités supplémentaires, comme ajouter un planning, inscrire un utilisateur à une manche et déconnecter un utilisateur.

# 3. Base de données
Nous avons essayé de respecter au maximum le schéma. 
La table user s'appelle client. Elle a en plus les champs username, password et admin.
Pour se connecter avec un compte admin : username = toto, password = tata.
Pour se connecter avec un compte client : username = lanceflamme, password = 8d6.

# 4. Développement

## Single page html (public)
Puisqu'il s'agit d'une single page application, une seule page html est requise, placée dans un répertoire public qui est rendu accessible. 
Avec l'élément `div`, on dispose d'un identifiant "main". 
On peut récupérer cet élément grâce à cet identifiant pour afficher différentes vues. 
Dans notre application, trois vues sont possible :
- visitor_app : la vue par défaut lors du lancement de l'application qui affiche le planning et les manches.
- client_app : la vue réservée aux clients pour pouvoir s'inscrire aux manches.
- admin_app : la vue de l'administrateur qui dispose d'une page supplémentaire spécifique à son rôle.
Ces vues sont décrites avec plus de précision dans la section suivante.
Nous n'avons pas eu le temps de faire des retours d'erreurs propres pour les formulaires, notamment pour la connexion.

## Vues et Composants (src/app, src/app/view, src/app/component)
La première vue est celle réservée aux visiteurs (vistor_app). Elle affiche le planning ainsi que les manches et le nombre d'inscrit à chacune d'elle. 
Pour afficher les manches, il faut cliquer sur un planning.
En plus de celà, une barre de navigation permet de s'identifier (signin) ou de s'inscrire (signup).   
L'inscription se fait via un formulaire où chaque champ doit être rempli pour créer un client. 
Quant à l'identification, deux champs sont à remplir pour vérifier l'existence de ce compte client. Ainsi, un token est créé avec un temps de connexion limité (de 10 minutes).   

Une fois connecté, l'utilisateur devient un client et il peut s'inscrire aux différentes manches.
Lorsque le temps de connexion est épuisé, il devra se connecter de nouveau pour accéder aux fonctionnalités du client.   
Quant à l'administrateur, il peut en plus ajouter un planning (add_planning) grâce à un formulaire, inscrire un client dans une manche (enroll_client) 
et déconnecter un utilisateur (disconnect_clients) avec un bouton.   
Les vues et composants ne font que solliciter le back avec des requêtes avant de lire la réponse et de l'appliquer selon leur utilité.


## Serveur et Routeurs (src/server, src/server/router)
Cette partie concerne la partie back de l'application (NodeJS).   
Dans ce dossier server se trouve tout d'abord server.js et pgConnect.js.   
Dans `pgConnect.js` se trouve toutes les requêtes à la base de données.  
`server.js` permet de vérifier le statut de l'utilisateur courant (visiteur ou client) et de définir des chemin d'entrée
pour les routeurs : `visitor-app-router.js`, `client-app-router.js` et `admin-app-router.js`.
Le premier est une api ne vérifiant pas l'utilisateur. Le second vérifie que l'utilisateur est connecté. Le dernier vérifie
que celui-ci est connecté et est un administrateur. Cela permet de protéger notre api.

Ces routeurs utilisent les routeurs `client-router.js`, `planning-router.js` et `inscription-router.js`.
Chacun de ces routeurs gère une partie des requêtes faites sur la base de données. 
Les requêtes http sont séparées sur plusieurs sous-routeurs et les xxx-app-router.js n'importent que ceux qui leur correspondent.


