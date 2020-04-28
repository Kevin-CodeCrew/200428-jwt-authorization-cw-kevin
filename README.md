# 20-04-28 JSON Web Tokens Authorization CW

### Requirements
Create a full-stack mern application that allows users to register and login. When a user is not logged in allow them to view a list comments. When a user is logged in allow them to view and add comments.

### Set Up
- Create a server directory called `server`
- Create a react app called `client`
- npm install mongoose express nodemon bcryptjs and jsonwebtoken in server directory
- npm install react-router-dom in client 
- Pull mongoose connection string and secret key from `keys.js` file in `config` directory
### Server Endpoints
- Register new user in UserCollection
    - properties : name, email, password (encrypted), dateCreated
- Login existing user from UserCollection
- Verify user json web token
- Add comment to CommentsCollection
    - properties : title, body
- Read list of comments from CommentsCollection
### Client Views
- Login Form (only visible if not logged in)
- Registration Form (only visible if not logged in)
- View Comments 
- Add Comment (only visible if logged in)
- Logout (only visible if logged in)
    - this doesn't need to be a page, can just be a link