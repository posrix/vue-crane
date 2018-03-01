# vue-crane

A universal, modular, multi-page, full-stack Vue boilerplate to deal with mega project, based on Node.js, Express, PM2, Lerna, Webpack, Babel, Vue.js, Element, PostCSS.

## Features

  - `element` as UI.
  -  Combines `prettier` and `ESlint` in pre-commit hook using `lint-staged`. Stop worrying about shit code slip into your code base.
  - `pm2` as the production process manager.
  - `http-proxy-middleware` for remote server api proxy to avoid CORS error.
  - use `webpack dll` to improve build time performance.
  - Support `dynamic webpack entry` using cli.
  - `lerna` for managing multiple project in one project.
  - `postcss` for next generation css preprocessor.
  - Combine development and production server in one `express` server.
  - `winston` as the logger system.
  - Support express router customization.

## Getting started

```sh
git clone https://github.com/posrix/vue-crane my-project
cd my-project
npm install
npm run dev
```

### Server Side Development

Start a local production server with hot reload using `nodemon`.

```sh
$ npm install
$ npm run build
$ npm run local
```

## Production

There are `3` production environments in vue-crane:

- `Test` Environment
- `Pre-Release` Environment
- `Release` Environment

Each environment have their own npm script:

> Test Environment:

```sh
$ npm run stage
```

> Pre-release Environment:

```sh
$ npm run pre
```

> Release Environment:

```sh
$ npm run release
```

## Deployment

vue-crane use a bundle project called [vue-crane-bundle](https://github.com/posrix/vue-crane-bundle) for deployment. Everytime you want to iterate a new version, just simply execute a shell script. All stuff will be settled in your bundle project. There are three benefits of using a bundle project for deployment:

- Remain consistency of server dependencies in different environment.
- Quick roll-back to previous version while error occurred.
- Only deploy necessary files to online production server.

## Deployment Steps

First, Create a empty git repository as your bundle project. Add a remote url to any git repository hosting service. Make sure your bundle project is in the same folder level with your source project.

Second, Edit bundle script in `package.json`. There are three parameters required in bundle script: `source_project`, `bundle_project`, `release_branch`

```json
{
  "bundle": "sh ./tasks/bundle.sh source_project bundle_project release_branch"
}
```


Finally, Type `npm run bundle` in your source project.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
