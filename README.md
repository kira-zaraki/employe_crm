
# BETA EMPLOYE CRM

Mini CRM gestion des employés la version actuelle support une seul version dashboard un seul admin pricipal

## Envirenement

- PHP LARAVEL
- ANGULAR

## FIRST

- Clone le projets dans votre racine

## INSTALLATION FRONT
- Accéder au dossie front
- Commencé par faire un petit `npm cache clean --force`
- Après `npm i`
- Dans le dossier (src\environments) modifie le dossier `environment` pour ajouter le url de l'api
```js 
/* ./environment.ts */
export const environment = {
  production: false,
  apiUrl: 'https://backend.api/api/'
};
```
- lancer le serveur `ng serve`

## INSTALLATION BACK
- Accéder au dossie back 
- Commencé par faire un petit `php artisan cache:clear`
- Après `composer install`
- Dans le fichier .env configure les variables MAIL
- Ajoute une variable `FRONT_URL` avec le lien de l'url racine de site front
```md
FRONT_URL = 'https://home.com/'
```
- Lancé la commande `php artisan migrate` pour mis a joure votre base de donne lie au projet
- Initialise les donnes de la base de données `php artisan db:seed --class=RoleSeeder` and `php artisan db:seed --class=AdminSeeder`

La version actuelle et toujour une version beta pas encore stable il manque quelque validation, controlle, controlle de redirection aussi optimisation des requêtes aussi implémentation de system de cache. ses correction vont être présent dans les futures commit  