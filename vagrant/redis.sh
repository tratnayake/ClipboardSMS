#!/bin/bash
#Download & Install Redis
sudo apt-get -y install redis-server redis-tools

#Overwrite the config file
cp /vagrant/vagrant/edited_redis.conf /etc/redis/redis.conf





