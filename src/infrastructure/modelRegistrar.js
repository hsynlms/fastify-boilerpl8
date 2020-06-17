'use strict';

// import required modules
import path  from 'path';
import readdirp  from 'readdirp';

// import required local modules
import helpers from '../helpers.js';

// model registrar function
const registerModels = async (dbCtx) => {

  // get models directory path 
  const dirPath = path.join(helpers.projectPath, 'models');

  // get model module files (recursively and asynchronously)
  // and loop found modules
  for await (const module of readdirp(dirPath, { fileFilter: '*' })) {
    // get relative path of the model module file
    // convert backslashes to forward slashes to make dynamic import work on Windows as well
    const modulePath = module.fullPath.replace(/\\/g, '/');
    
    // import the model module
    dbCtx.import(modulePath);
  }

};

// export model registrar function
export default registerModels;
