Projet React
GUILLOT Clémentine, FORESTIER Louis, FRADET Amandine

- [1. Installation et lancement](#1-installation-et-lancement)
- [2. Présentation](#2-présentation)
- [3. Développement](#3-développement)
  - [Single page html (public)](#single-page-html-public)
  - [Vues et Composants (src/app, src/app/view, src/app/component)](#vues-et-composants-srcapp-srcappview-srcappcomponent)
  - [Serveur et Routeurs (src/server, src/server/router)](#serveur-et-routeurs-srcserver-srcserverrouter)

# 1. Installation et lancement
Le projet web react_project peut s'ouvrir avec IntelliJ.   
Dans ce répertoire, effectuez la commande suivante : npm init   
Pour accéder à la base de données, voici le nom d'utilisateur : ux1bpep878lrboh2kvba et le mot de passe : Wz0SJMe0LzcqrqQkEMYc   
Pour lancer le projet, toujours depuis IntelliJ, faites un clic droit sur le fichier package.json -> Show npm Scripts. Un nouvel encart apparaît d'où vous pourrez lancer start-web (client) et start-dev (serveur).   
L'adresse de l'application est localhost:3002.   
Vous pouvez ouvrir votre navigateur à cet adresse et vous aurez accès à notre application.   

# 2. Présentation
Lorsque vous arriver sur l'application, vous pouvez voir le planning complet ainsi que les manches et le nombre de personnes inscrites. Il n'est pas possible d'interagir avec lui tant que vous n'êtes pas connecté.   
Pour vous connecter, utiliser la barre de navigation pour accéder à "Sign in". Là, vous pourrez entrer votre pseudo et votre mot de passe.   
Si vous n'êtes pas déjà inscrit dans la base de données, vous pouvez vous enregistrer avec "Sign up". Il faudra entrer votre nom, prénom, pseudo et mot de passe. Vous pourrez ainsi, en revenat sur "Planning", vous inscrire à une manche en cliquant sur le bouton "S'inscrire" correspondant.   
L'administrateur dispose de quelques fonctionnalités supplémentaires.   

# 3. Développement

## Single page html (public)
Puisqu'il s'agit d'une single page application, une seule page html est requise, placée dans un répertoire public qui est rendu accessible. Avec l'élément `div`, on dispose d'un identifiant "main". On peut récupérer cet élément grâce à cet identifiant pour afficher différentes vues. Dans notre application, trois vues sont possible :
- visitor_app : la vue par défaut lors du lancement de l'application qui affiche le planning et les manches.
- client_app : la vue réservée aux clients pour pouvoir s'inscrire aux manches.
- admin_app : la vue de l'administrateur qui dispose d'un composant supplémentaire spécifique à son rôle.
Ces vues sont décrites avec plus de précision dans la section suivante.   

## Vues et Composants (src/app, src/app/view, src/app/component)
La première vue est celle réservée aux visiteurs (vistor_app). Elle affiche le planning ainsi que les manches et le nombre d'inscrit à chacune d'elle. En plus de celà, une barre de navigation permet de s'identifier (signin) ou de s'inscrire (signup).   
L'inscription se fait via un formulaire où chaque champ doit être rempli pour créer un client. Quant à l'identification, deux champs sont à remplir pour vérifier l'existence de ce compte client. Ainsi, un token est créé avec un temps de connexion limité.   
Une fois connecté, l'utilisateur devient un client et il peut s'inscrire aux différentes manches. On ne montre que le nombre d'inscrits, même si le client est bien ajouté dans la base de données. Lorsque le temps de connexion est épuisé, il devra se connecter de nouveau pour accéder aux fonctionnalités du client.   
Quant à l'administrateur, il peut en plus ajouter un planning (add_planning) grâce à un formulaire, inscrire un client dans une manche (enroll_client) et déconnecter un utilisateur (delete_user) avec un bouton.   
Les vues et composants ne font que solliciter le back avec des requêtes avant de lire la réponse et de l'appliquer selon leur utilité.   
Chacune des actions décrites côté front sont exécutées par les routers.


## Serveur et Routeurs (src/server, src/server/router)
Cette partie concerne la partie back de l'application (NodeJS).   
Dans ce dossier server se trouve tout d'abord server.js et pgConnect.js.   
`server.js` permet de vérifier le statut de l'utilisateur courant (visiteur ou client).   
Quant à `pgConnect.js`, c'est là que sont faites toutes les requêtes à la base de données. Il peut s'agir de récupérer tous les clients de la base ou encore d'ajouter un planning en prenant en compte son identifiant, son nom et sa date.   
Dans le répertoire `router`, le premier fichier `visitor-app-router.js` permet de rediriger vers client-router, inscription-router ou planning-router selon la vue active (c'est-à-dire la vue où se trouve l'utilisateur).   
Chacun de ces router récupère les éléments envoyés par le front via un chemin qui leur ait propre. Puis, selon la méthode (use, get, post, delete), ces éléments sont utilisés pour interroger la base via `pgConnect`. Ce fichier contient toutes les requêtes faites à la base et ces requêtes retournent une réponse au besoin. Le router retourne à son tour cette réponse et il laisse le soin aux vues et composants de traiter l'information.    

