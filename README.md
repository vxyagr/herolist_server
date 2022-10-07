# herolist_server
Backend for Heroes Hire, a platform for Hero Agency to list Heroes to be viewed by public
details : https://vxyagr.gitbook.io/hiroes-heroes-for-hire/

# Installation
1. Get the code to a directory<br/>
2. Make sure you have npm and nodejs installed https://nodejs.org/en/ br/>
3. Edit .env File, change :<br/>
PORT=8000 to your desired port, we can leave it be and let the 3rd party deployer like Heroku chose if you deploy it there<br/>
LIST_PAGE="http://localhost:3000/list" change http://localhost:3000 to your front end domain
MAIN_PAGE="http://localhost:3000/" change http://localhost:3000 to your front end domain
SECRET_KEY="radamel" change this md5 secret key if necessary, and it HAS to be MATCHED with the key on the front end side <br/>
3. open terminal and go to the directory, run "npm install"<br/>
4. still on the terminal, run "nodemon index"<br/>
5. server is ready to serve on the port you set.
