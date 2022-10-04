import * as cors from 'cors'

// const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// export default cors(corsOptions)

export default function () {
  return cors()
}
