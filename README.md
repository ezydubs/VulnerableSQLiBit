# Custom CTF Web Application Challenge

## About The Project
This is a custom CTF (Capture The Flag) Web Application Challenge created for the purpose of learning and having fun. It demonstrates SQL Injection (SQLi) and SUID bit privilege escalation techniques, serving as a platform to enhance web security skills.

### Built With
- [MYSQL Server for Windows](https://dev.mysql.com/downloads/installer/)
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Express-Session](https://www.npmjs.com/package/express-session)
- [HTTP](https://nodejs.org/api/http.html)

## Getting Started
To set up a local copy and run the project, follow the steps below.

### Prerequisites
1. Download and install the latest [Ubuntu Image](https://ubuntu.com/download). Configure it with any username and any password (note this down for later use).
2. After installing Ubuntu, open a terminal and run:
   ```sh
   sudo apt install mysql-server nodejs -y
   ```

### Installation
1. Install MYSQL and set the root password to have an entropy above 50 bits, making it reasonably hard to bruteforce.
2. Inside the project directory, run:
   ```sh
   npm install
   ```
3. Open `query.sql` in MYSQL Workbench and execute **ALL COMMANDS** in the file.
4. Start the challenge by running:
   ```sh
   npm start
   ```

## Usage
With the application up and running, you are all set to tackle the challenges involving SQLi vulnerabilities and SUID bit privilege escalation!

The write up is in Writeup.md
