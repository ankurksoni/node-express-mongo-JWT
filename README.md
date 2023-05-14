# node-express-mongo-JWT

A Node.js App with below features,

* express framework.
* MongoDB and mongoose framework.
* JWT token implementation.
* end to end simple flow for landing page, sign up, login, logout, authorized page. 


prerequisites
---------------
1. Make sure you have docker engine installed.
2. Clone master repository on your local master. Build and create a docker image with below command,

    ```bash
    docker-compose down;docker rmi $(docker images -f "dangling=true" -q); docker system prune; docker build -t node-jwt --no-cache .
    ```
3. run command `docker-compose up -d`, you must see below output,
    ```bash
    Creating network "node-express-mongo-jwt_default" with the default driver
    Creating node-express-mongo-jwt_mongo_1 ... done
    Creating node-express-mongo-jwt_node-jwt_1 ... done
    ```
4. Goto : http://localhost:3000
5. To monitor JWT activity,

    a. press F12.

    b. Goto `Application` tab

    c. On left panel expand `Cookies`

    d. You must be able to see `http://localhost:3000` entry.

    e. a key name `jwt` will get added when you login to the system.
