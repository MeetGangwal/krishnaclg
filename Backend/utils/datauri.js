import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    if (!file || !file.buffer) {
        console.error("File is missing or invalid:", file);
        return null;
    }
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};


export default getDataUri;

//claudeai

// //getDataUri.js
// import DataUriParser from "datauri/parser.js";
// import path from "path";

// const getDataUri = (file) => {
//   try {
//     if (!file || !file.buffer) {
//       console.error("Invalid file object:", file);
//       return null;
//     }

//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     const dataUri = parser.format(extName, file.buffer);

//     return dataUri;
//   } catch (error) {
//     console.error("Error in getDataUri:", error);
//     return null;
//   }
// };

// export default getDataUri;