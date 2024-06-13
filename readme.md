Construire l'image Docker :

`docker build -t my-mariadb-image .`

Lancer le container : 

`docker compose up -d`

# Ouvrir une session shell dans le conteneur
docker exec -it my-mariadb bash

# Une fois dans le conteneur, accéder au client MariaDB
mariadb -u root -p

# Entrer le mot de passe root (dans ce cas "password")
Enter password: password

# Lister les bases de données
SHOW DATABASES;