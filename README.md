# Bol.com Retailer API Wrapper

Source https://api.bol.com/retailer/public/redoc/v10/retailer.html

Github: https://github.com/team-bicep/bol-retailer-api
NPM: https://www.npmjs.com/package/bol-retailer-api/access
<br>

```bash
npm i bol-retailer-api
```

This is a unofficial npm library for the bol.com retailer api

### Initialization

```javascript
import Bol from "bol-retailer-api";

bol = new Bol(API_KEY, API_SECRET);
```

### Roadmap

#### Release

- Finish converting all api methods to js
- Add params where they havent been added yet
- Remove old/unused code and find improvement points

<br>
<br>
<br>
 
_Note_
1st: This is my first npm package. I apologize if i make a mistake somewhere along the way
2nd: The original NPM library i wanted to create was a version of v9 inspired by the library listed below. With the recent release of api v10 i have decided to convert the entire api to a library

_Why?_
_We need our own bol retailer api integration for our system. We need case specific methods and type support. In order to quickly make updates when needed, our own implementation of the library deemed the best choice. Feel free to add your own adjustments in the form of a pr or issue. The Team Bicep team will keep maintaining this repo_

Inspired by https://github.com/Vultwo/bol-api
