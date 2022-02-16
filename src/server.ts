import 'dotenv/config';

import { app } from './app';

// Port Normalization
const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};
// set the port
const port = normalizePort(
  process.env.NODE_ENV === 'production' ? process.env.PORT : '3000'
);

// create a http server
const server = app.listen(port, () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  // eslint-disable-next-line no-console
  console.log(`Running in ${process.env.NODE_ENV} mode on ${bind}`);
});
