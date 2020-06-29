#!/usr/bin/env node

const { argv } = require("yargs");
const { fetchPublicIp } = require(".");

if (!(argv.host && argv.username && argv.password)) {
  console.log(
    "missing arguments, please supply ['host', 'username', 'password']"
  );
  process.exit(1);
}

async function main() {
  const publicIP = await fetchPublicIp(argv.host, argv.username, argv.password);
  process.stdout.write(publicIP);
}

main();
