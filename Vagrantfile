Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.network :private_network, ip: "192.168.1.107"
  config.vm.network "public_network", :bridge => 'en0: Wi-Fi (AirPort)', ip: "192.168.1.107"
  config.vm.network "forwarded_port", guest: 80, host: 8281
  config.vm.network "forwarded_port", guest: 11100, host: 11100
  config.vm.network "forwarded_port", guest: 11109, host: 11109
  config.vm.network "forwarded_port", guest: 11110, host: 11110
  config.vm.network "forwarded_port", guest: 11111, host: 11111
  config.vm.network "forwarded_port", guest: 11112, host: 11112
  config.vm.network "forwarded_port", guest: 11113, host: 11113
  config.vm.network "forwarded_port", guest: 8150, host: 8150
  config.vm.network "forwarded_port", guest: 8001, host: 8001
  config.vm.network "forwarded_port", guest: 8000, host: 8000


  config.vm.boot_timeout = 120

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provision/playbook.yml"
  end
end
