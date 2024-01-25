const { RelayClient } = require('defender-relay-client');
const { appendFileSync, writeFileSync} = require('fs');

async function run() {
  require('dotenv').config();
  const { DEFENDER_API_KEY: apiKey, DEFENDER_API_SECRET: apiSecret } = process.env;
  const relayClient = new RelayClient({ apiKey, apiSecret });

  // create relay using defender client
  const requestParams = {
    name: 'MyRelayer',
    network: 'mumbai',
    minBalance: BigInt(1e17).toString(),
  };
  const relayer = await relayClient.create(requestParams);
  
  // store relayer info in file (optional)
  writeFileSync('relay.json', JSON.stringify({
    relayer
  }, null, 2));
  console.log('Relayer ID: ', relayer);

  // create and save the api key to .env - needed for sending tx
  const {apiKey: relayerKey, secretKey: relayerSecret} = await relayClient.createKey(relayer.relayerId);
  appendFileSync('.env', `\nRELAYER_KEY=${relayerKey}\nRELAYER_SECRET=${relayerSecret}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});