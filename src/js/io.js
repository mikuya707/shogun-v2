// // 'use strict';

// import io from 'socket.io-client';
// const ORIGIN = 'http://localhost:1337';
// const WS = ORIGIN;

// export default io.connect(WS);

import io from 'socket.io-client';
import os from  "os";
const hostname = os.hostname();
var ENV = process.env.NODE_ENV;
const ORIGIN;

const port = process.env.PORT || 1337;
if(ENV === 'development'){
 	ORIGIN = `${hostname}:${port}`; 
}
else{
	ORIGIN = `${hostname}`;
}


// const HOST = `localhost:${process.env.PORT}`;
 console.log('what is ORIGIN', ORIGIN);
export default io.connect(ORIGIN);