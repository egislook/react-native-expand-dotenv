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
  "presets": [
    "module:metro-react-native-babel-preset",
    "module:react-native-expand-dotenv"
  ]
}
```

**.env**

```
NAME=$npm_package_name
VERSION=$npm_package_version
DOMAIN=https://example.domain
```

In **index.js**

```js
import env, { NAME, VERSION, DOMAIN} from 'react-native-expand-dotenv'
process.env = { ...process.env, ...env }

console.log(process.env, { NAME, VERSION, DOMAIN })
```

### Inspiration

`react-native-dotenv`
