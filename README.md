# react-native-expand-dotenv

Loads npm & environment variables from a .env to react native

## Installation

```sh
$ npm install --save-dev react-native-expand-dotenv
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
**if its monorepo please add `["module:react-native-expand-dotenv", { "dirname": "your_monorepo_package_directory_name"}]`**

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
