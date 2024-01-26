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

  const tokenAddress = "0xF8aFD010F137071c1FFaef51025259E128615d5A";
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const contract =  new ethers.Contract(tokenAddress, abi, provider);
  const receiverAddress = "0x12785FC9Ad49ABEA2dA1A019e071B88F37aC9f10"; // Replace with the actual address to transfer funds to

  // Transfer funds
  const amountToSend = ethers.utils.parseUnits('2', 18); // Replace with the actual amount you want to transfer
  const transferTx = await contract.connect(relaySigner).transfer(
    receiverAddress,
    amountToSend,
  );
  await transferTx.wait();

  console.log(`Tokens transferred successfully to ${receiverAddress}`);
  console.log("Transaction Hash: ", transferTx.hash);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
