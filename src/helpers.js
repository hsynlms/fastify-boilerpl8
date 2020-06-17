'use strict';

// import required modules
import path  from 'path';
import { fileURLToPath } from 'url';

// definition of base path
const basePath = path.dirname(fileURLToPath(import.meta.url));

// definition of helper methods
const helpers = Object.assign(
  Object.create({}),
  {
    // gets current project path
    projectPath: basePath
  }
);

// export the frozen helpers object
export default Object.freeze(helpers);
