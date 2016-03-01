# Install node
apt-get install -y git-core curl

curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash

echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

nvm install stable
