## ENV
* PORT = 5000
* MONGO_URI = mongodb+srv://frank:NbiFVeQXF5ZhlU7D@cluster0.2dbpd.mongodb.net/ProductCatalog?retryWrites=true&w=majority
* NODE_ENV = development
* SESS_SECRET = thisIsASessionSecret
* SESS_LIFETIME = 60000
* JWT_SECRET = thisIsAJWTSecret


## Modules
* "bcryptjs": "^2.4.3",
* "body-parser": "^1.19.0",
* "connect-mongo": "^4.5.0",
* "dotenv": "^10.0.0",
* "ejs": "^3.1.6",
* "express": "^4.17.1",
* "express-async-handler": "^1.1.4",
* "express-session": "^1.17.2",
* "faker": "^5.5.3",
* "jsonwebtoken": "^8.5.1",
* "lodash": "^4.17.21",
* "mongoose": "^6.0.6",
* "morgan": "^1.10.0",
* "nodemon": "^2.0.12"

## Routes
### admin
* isAdmin

    //@description     Check user is admin

    //@route           POST /admin

    //@access          Public
### products
* browseProducts

    //@description     Display the product browsing page

    //@route           GET /products/

    //@access          Public

* searchProducts

    //@description     Display the filtered product browsing page

    //@route           GET /products/

    //@access          Public

* getProductPage

    //@description     Display the product page

    //@route           GET /products/:parameter

    //@access          Public

* addProduct

    //@description     Add new product to the database

    //@route           POST /products/add_product

    //@access          Admin

* editProduct

    // @description     Display the product edit page

    // @route           GET /products/edit/:parameter

    // @access          Admin

* updateProduct

    //@description     Update a products details

    //@route           POST /products/edit_product

    //@access          Admin
### user
* registerUser

    //@description     Register new user

    //@route           POST /users/

    //@access          Public

* authUser

    //@description     Auth the user

    //@route           POST /users/login

    //@access          Public

* account

    //@description     Display account page

    //@route           GET /users/account

    //@access          Public

* editDetails

    //@description     Display edit account details page

    //@route           GET /users/account

    //@access          Public

* updateDetails

    //@description     Update account details

    //@route           POST /users/account/edit-details

    //@access          Public

* logout

    //@description     Log out the user

    //@route           POST /users/logout

    //@access          Public
