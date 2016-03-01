#!/bin/bash



apt-get update
apt-get upgrade -y

# # Install git
# apt-get install -y git

# # Install node
# apt-get install -y git-core curl

# curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash

# echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
# source /home/vagrant/.profile

# nvm install stable


# Install db

# Edit the following to change the name of the database user that will be created:
APP_DB_USER=umsagent
APP_DB_PASS=umsagentpassword

# Edit the following to change the name of the database that is created (defaults to the user name)
APP_DB_NAME=umsdb

# Edit the following to change the version of PostgreSQL that is installed
PG_VERSION=9.3

###########################################################
# Changes below this line are probably not necessary
###########################################################
print_db_usage () {
  echo "Your PostgreSQL database has been setup and can be accessed on your local machine on the forwarded port (default: 15432)"
  echo "  Host: localhost"
  echo "  Port: 5432"
  echo "  Database: $APP_DB_NAME"
  echo "  Username: $APP_DB_USER"
  echo "  Password: $APP_DB_PASS"
  echo ""
  echo "Admin access to postgres user via VM:"
  echo "  vagrant ssh"
  echo "  su - postgres"
  echo ""
  echo "psql access to app database user via VM:"
  echo "  vagrant ssh"
  echo "  su - postgres"
  echo "  PGUSER=$APP_DB_USER PGPASSWORD=$APP_DB_PASS psql -h localhost $APP_DB_NAME"
  echo ""
  echo "Env variable for application development:"
  echo "  DATABASE_URL=postgresql://$APP_DB_USER:$APP_DB_PASS@localhost:5432/$APP_DB_NAME"
  echo ""
  echo "Local command to access the database via psql:"
  echo "  PGUSER=$APP_DB_USER PGPASSWORD=$APP_DB_PASS psql -h localhost -p 5432 $APP_DB_NAME"
}


apt-get -y install "postgresql-$PG_VERSION" "postgresql-contrib-$PG_VERSION"

PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"
PG_DIR="/var/lib/postgresql/$PG_VERSION/main"

# Edit postgresql.conf to change listen address to '*':
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"

# Append to pg_hba.conf to add password auth:
echo "host    all             all             all                     md5" >> "$PG_HBA"

# Explicitly set default client_encoding
echo "client_encoding = utf8" >> "$PG_CONF"

# Restart so that all new config is loaded:
service postgresql restart

cat << EOF | su - postgres -c psql
-- Create the database user:
CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';

-- Create the database:
CREATE DATABASE $APP_DB_NAME WITH OWNER=$APP_DB_USER
                                  LC_COLLATE='en_US.utf8'
                                  LC_CTYPE='en_US.utf8'
                                  ENCODING='UTF8'
                                  TEMPLATE=template0;
EOF

# Tag the provision time:
date > "$PROVISIONED_ON"

echo "Successfully created PostgreSQL dev virtual machine."
echo ""
print_db_usage

#Set up the config files for postgres
service postgresql restart

#Overwrite the config files
cp /vagrant/vagrant/edited_pg_hba.conf /etc/postgresql/9.3/main/pg_hba.conf
#cp /vagrant/vagrant/edited_postgresql.conf /etc/postgresql/9.3/main/postgresql.conf


#Redirect traffic heading to port 80 to port 8888
iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 80 -j REDIRECT --to-port 3000

#Install pm2
npm install -g pm2

#Clone the project
cd /home/vagrant/app

#git clone http://github.com/tratnayake/ums
