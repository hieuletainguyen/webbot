# ESP32-WEBBOT

<h2>Description </h2>

In this project, I use frontend on local machine, backend and database on google cloud vm and ESP32 will connect to the google cloud vm

<h2>Before running </h2>

Need to create an .env file in the main directory

```
MYSQLDB_USER=
MYSQLDB_ROOT_PASSWORD=
MYSQLDB_LOCAL_PORT=
MYSQLDB_DOCKER_PORT=

REACT_APP_BACKEND_URL=

FRONTEND_URL= 
```

Need to create a config.h file in the **ESP32_main_service** folder

```
#ifndef CONFIG_H
#define CONFIG_H

#define WIFI_SSID "your-wifi-name"
#define WIFI_PASSWORD "your-wifi-password"
#define SERVER_IP "google-cloud-vm-external-ip-address"

#endif
```

Need to create a  secret-data.js file in **backend** folder

```
const bcrypt = require("bcrypt");

const jwtSecretkey = "";
const saltRounds = 5;
const generate_salt = async () => {
    const new_salt = bcrypt.genSalt(saltRounds);
    return new_salt;
}

const myEmail = "main-email";
const myEmailPassword = "password-for-app";

const default_user = "";
const default_password = "";
const default_database = "";
const default_host = "";
const admin_password = "";

module.exports = {
    jwtSecretkey, 
    generate_salt,
    default_user,
    default_password,
    default_database,
    default_host, 
    admin_password, 
    myEmail, 
    myEmailPassword, 
    user
}
```

<h2>NOTE </h2> 

For the myEmailPassword, it is ***NOT YOUR EMAIL PASSWORD***. 

It is obtained by go to *Google Account -> Security -> Enable 2-Step Verification -> App passwords -> Create a new app password*



<h2 align="center"> &nbsp;Some Tools I Have Used and Learned In This Project</h2>
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="vscode" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="bash" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain-wordmark.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg" width="45" height="45"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" width="45" height="45" />




</p>
