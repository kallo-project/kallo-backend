# kallo-backend
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[https://github.com/kallo-project/about](https://github.com/kallo-project/about)

#### NPM Commands
Running in development mode: `npm run dev`

Compiling into JavaScript (outputs to the `dist` folder): `npm run build`

Starting application (after building): `npm run start`

----

### Environment Variables
`DATABASE_URL`—MongoDB URL

`PORT`—The port which the back-end will listen to (not required for hosts such as [Heroku](https://heroku.com))

`G_SECRET`—Google Recaptcha secret key

----

### Technologies Used
- [Node.js](https://github.com/nodejs/node)
- [MongoDB](https://github.com/mongodb/mongo)
- [TypeScript](https://github.com/microsoft/TypeScript)

----

### Warning
To "build on deploy," TypeScript and other `@types` dependencies are required; however, services such as [Heroku](https://heroku.com), where we are currently hosting this project, do not install any development dependencies on deployment; thus, we specified them as normal dependencies.

Here are the TypeScript (development) dependencies:
```json
... {
  "@types/cors": "^2.8.7",
  "@types/dotenv": "^8.2.0",
  "@types/express": "^4.17.8",
  "@types/express-rate-limit": "^5.1.0",
  "@types/mongoose": "^5.7.36",
  "@types/node": "^14.10.1",
  "@types/request": "^2.48.5",
  "@types/socket.io": "^2.1.11",
  "ts-node": "^9.0.0",
  "typescript": "^4.0.2"
}
```

----

### License
[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2020 Kallo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
