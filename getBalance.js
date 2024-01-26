const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('hardhat');
const {abi} = require('./artifacts/contracts/aat.sol/ERC20.json');

async function main() {
  require('dotenv').config();

  const apiKey = process.env.RELAYER_KEY;
  const apiSecret = process.env.RELAYER_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing API key or API secret in environment variables.');
  }

  const credentials = { apiKey, apiSecret };

  const provider = new DefenderRelayProvider(credentials);
  
  const tokenAddress = "0xF8aFD010F137071c1FFaef51025259E128615d5A";
  const receiverAddress = "0xEBAC76325F9AD5C2bA935C6c5cD164B8fD7b8785"; // Replace with the actual address to transfer funds to
  const erc20Contract = new ethers.Contract(tokenAddress, abi, provider);
  const balance = await erc20Contract.balanceOf(receiverAddress);
  console.log(`Balance of ${receiverAddress}: ${ethers.utils.formatUnits(balance, 18)} ERC-20 tokens`);

}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
