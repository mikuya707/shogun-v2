'use strict';

import io from 'socket.io-client';
import os from  "os";
const hostname = os.hostname();

const port = process.env.PORT || 1337;
const ORIGIN = hostname.includes('herokuapp.com') ? hostname : hostname+":"+port;

export default io.connect(ORIGIN);