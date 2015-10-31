// // 'use strict';

// import io from 'socket.io-client';
// const ORIGIN = 'http://localhost:1337';
// const WS = ORIGIN;

// export default io.connect(WS);

import io from 'socket.io-client';
import os from  "os";
const hostname = os.hostname();

const port = process.env.PORT || 5000;
const ORIGIN = `${hostname}:${port}` 

// const HOST = `localhost:${process.env.PORT}`;
 console.log('what is ORIGIN', ORIGIN);
export default io.connect(ORIGIN);