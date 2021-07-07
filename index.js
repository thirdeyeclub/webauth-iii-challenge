const server = require("./api/server");
require('./database/config00.js')

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\n** Server listening on port ${PORT} **\n`)
);