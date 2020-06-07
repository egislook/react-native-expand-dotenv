# react-native-expand-dotenv

Loads npm & environment variables from a .env to react native

## Installation

```sh
$ npm install react-native-expand-dotenv
```

## Usage

**package.json / .babelrc**

```json
{
  "plugins": ["react-native-expend-dotenv"]
}
```

**.env**

```
NAME=$npm_package_name
VERSION=$npm_package_version
DOMAIN=https://example.domain
```

In **any.js**

```js
import { NAME, VERSION, DOMAIN } from "react-native-expand-dotenv"
console.log({
  NAME, VERSION, DOMAIN
})
```
