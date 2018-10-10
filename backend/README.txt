
Instructions:
1. Download node.js from https://nodejs.org/en/download/

2. Install dependencies
  npm install

3. Set up database.

use mysql;
create database app;
CREATE USER 'cs561group'@'localhost' IDENTIFIED BY 'Ih34RTAcc0unt1ng';
GRANT ALL PRIVILEGES ON app.* TO 'cs561group'@'localhost';
use app;
CREATE TABLE profile (USER_NAME VARCHAR(20) NOT NULL UNIQUE, FIRST_NAME VARCHAR(20) NOT NULL, LAST_NAME VARCHAR(20),AGE INT, BIRTH_DAY DATE, SEX CHAR(1), INCOME FLOAT);
CREATE TABLE user (USER_NAME VARCHAR(20) NOT NULL UNIQUE, PASSWORD CHAR(60), SALT CHAR(29));
   
   (Note: you may use a script at /backend/resetDBTables.js to automatically drop and reset all tables)

4. Run test cases
  npm test

5. Start Server
  npm start

If you go to localhost:3000/ you should see "It works!!!"

ROUTES:
You can interact with the backend at the following addresses:
http://localhost:3000/createAccount  	 POST
   Inputs:
   user        - the user id (required)
   password    - the password (required)
   first_name  - first name (required)
   last_name   - last name
   age         - age of user
   sex         - sex of user
   income      - income of user
   dob         - date of birth of user
   (soon will include picture as an input)
   
   Outputs:
   SUCCESS          - user's data was successfully added to the database
   ERR_NO_USER      - no user name
   ERR_NO_PASS      - no password
   ERR_NO_FNAME     - no first name
   ERR_USER_EXISTS  - a user with that name is already in the database

user,password


EXAMPLES:
examples using jquery to send requests to the backend are:
localhost:3000/createAccountExample.html
localhost:3000/javascript/accApp.js
