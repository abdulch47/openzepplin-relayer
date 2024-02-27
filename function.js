const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('hardhat');

async function main() {
  require('dotenv').config();

  const apiKey = process.env.RELAYER_KEY;
  const apiSecret = process.env.RELAYER_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing API key or API secret in environment variables.');
  }

  const credentials = { apiKey, apiSecret };

  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

  const receiverAddress = "0x12785FC9Ad49ABEA2dA1A019e071B88F37aC9f10"; // Replace with the actual address to transfer funds to

  // Transfer funds
  const amountToSend = ethers.utils.parseUnits('0.001', 18); // Replace with the actual amount you want to transfer
  const transferTx = await relaySigner.sendTransaction({
    to: receiverAddress,
    value: amountToSend,
  });
  await transferTx.wait();

  console.log(`Funds transferred successfully to ${receiverAddress}`);
  console.log("Transaction Hash: ", transferTx.hash);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
