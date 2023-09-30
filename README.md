For Windows, in `package.json` write
```shell
"scripts": {
    "dev": "nodemon server.js",
    "start": "set NODE_ENV=production && node server.js",
},
```

For running the server in development mode, use
```shell
npm run dev
```

For running the server in production mode, use
```shell
npm run start
```

Postman Documentation
```shell
https://documenter.getpostman.com/view/19470822/2s9YJaYPuF
```