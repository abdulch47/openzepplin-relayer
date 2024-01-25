const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('hardhat');
const {writeFileSync} = require('fs');

async function main() {
  require('dotenv').config();
  const credentials = {apiKey: process.env.RELAYER_KEY, apiSecret: process.env.RELAYER_SECRET};
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const targetAddress = "0x93f0f2cE305FA659E2192aDe17C9d4Ff73f3d350";
  const MyContract = await ethers.getContractFactory("AAT");
  const myContract = await MyContract.connect(relaySigner).deploy(targetAddress).then(f => f.deployed());

  writeFileSync('deploy.json', JSON.stringify({
    MyContract: myContract.address,
  }, null, 2));

  console.log(`MyContract: ${myContract.address}\n`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}