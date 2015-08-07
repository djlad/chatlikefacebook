# chatlikefacebook
full account system that allows you to send/recieve messages to other accounts the way Facebook does using mongodb.


requires mongodb to be installed
and running (run mongod)

in the command line:
npm install
node app.js

on the client:
you can sign up at /signup
sign in at /login

example chat object in /user
send message with chat.sendMessage(username,message);
