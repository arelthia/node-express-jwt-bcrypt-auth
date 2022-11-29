# Boilerplate for Node Express Auth using JWT and Bcrypt

## How to install express
```

npm install express --save

```

## How to install bcrypt

```
npm install -g node-gyp
npm install bcrypt

```

## How to install jsonwebtoken
```

npm install jsonwebtoken --save

```

## Use
- Add data source to store user info in the users controller.
- Use the authorization middleware to protect routes as shown in the example below

```js

route.get('profile/:id', auth, async (req, res) => {

});

```

