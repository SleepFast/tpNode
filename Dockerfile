# Utiliser l'image de base MariaDB
FROM mariadb:latest

# Définir les variables d'environnement
ENV MARIADB_ROOT_PASSWORD=password

# Exposer le port 3306
EXPOSE 3306