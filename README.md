# node-express-mongo-JWT
A Node.js App JWT boilerplate 


prerequisites
---------------
1. Make sure you have docker engine installed.
2. Make sure you have latest mongodb docker instance running with below command [`docker run --name mongo -d -p27017:27017 mongo`]
3. Check if mongo server is up and running with telnet command `telnet localhost 27017`
4. You should get output as 
    ```bash
        Connected to localhost.
        Escape character is '^]'.
    ```
4. Run command `npm install`
5. Run command `npm install nodemon  -g`
6. Run command `nodemon app`
7. Goto : http://localhost:3000