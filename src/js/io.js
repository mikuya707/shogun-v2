// // 'use strict';

// import io from 'socket.io-client';
// const ORIGIN = 'http://localhost:1337';
// const WS = ORIGIN;

// export default io.connect(WS);

import io from 'socket.io-client';
 //const loc = window.location;
//console.log('what is loc', loc);
 //const origin = loc.origin || `${loc.protocol}//${loc.hostname}` 
 //+ loc.port ? ':' + loc.port : '');
//console.log('what is origin', origin);

//const HOST = origin;

const HOST = 'http://shogun-game.herokuapp.com/';
export default io.connect(HOST);