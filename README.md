Projet React
GUILLOT Clémentine, FORESTIER Louis, FRADET Amandine

- [1. Installation et lancement](#1-installation-et-lancement)
- [2. Présentation](#2-présentation)
- [3. Développement](#3-développement)
  - [Single page html (public)](#single-page-html-public)
  - [Serveur et Routeurs (src/server)](#serveur-et-routeurs-srcserver)
  - [Vues et Composants (src/app/view, src/app/component)](#vues-et-composants-srcappview-srcappcomponent)

# 1. Installation et lancement
Le projet web react_project peut s'ouvrir avec IntelliJ.   
Dans ce répertoire, effectuez la commande suivante : npm init   
Pour accéder à la base de données, voici le nom d'utilisateur : ux1bpep878lrboh2kvba et le mot de passe : Wz0SJMe0LzcqrqQkEMYc   
Pour lancer le projet, toujours depuis IntelliJ, faites un clic droit sur le fichier package.json -> Show npm Scripts. Un nouvel encart apparaît d'où vous pourrez lancer start-web (client) et start-dev (serveur).   
L'adresse de l'application est localhost:3002.   
Vous pouvez ouvrir votre navigateur à cet adresse et vous aurez accès à notre application.   

# 2. Présentation
Lorsque vous arriver sur l'application, vous pouvez voir le planning complet ainsi que les manches et les personnes inscrites. Il n'est pas possible d'interagir avec lui tant que vous n'êtes pas connecté.   
Pour vous connecter, utiliser la barre de navigation pour accéder à "Sign in". Là, vous pourrez entrer votre pseudo et votre mot de passe.   
Si vous n'êtes pas déjà inscrit dans la base de données, vous pouvez vous enregistrer avec "Sign up". Il faudra entrer votre nom, prénom, pseudo et mot de passe. Vous pourrez ainsi, en revenat sur "Planning", vous inscrire à une manche en cliquant sur le bouton "S'inscrire" correspondant.   

# 3. Développement

## Single page html (public)

## Serveur et Routeurs (src/server)
Cette partie concerne la partie back de l'application (NodeJS).   
Dans ce dossier server se trouve tout d'abord server.js et pgConnect.js.   
'server.js' permet de vérifier le statut de l'utilisateur courant (visiteur ou client).
Quant à 'pgConnect.js', c'est là que sont faites toutes les requêtes à la base de données. Il peut s'agir de récupérer tous les clients de la base ou encore d'ajouter un planning en prenant en compte son identifiant, son nom et sa date.   
Dans le répertoire 'router', le premier fichier 'app-router.js' permet de rediriger vers client-router ou planning-router selon la vue active (c'est-à-dire la vue où se trouve l'utilisateur).   

## Vues et Composants (src/app/view, src/app/component)

