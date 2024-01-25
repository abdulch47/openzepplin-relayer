
async function main() {
const [deployer] = await ethers.getSigners();
  // Get the contract factory
  const tokenFactory = await ethers.getContractFactory("AAT");

  // Deploy the contract
  const myTokenFactory = await tokenFactory.deploy("0x93f0f2ce305fa659e2192ade17c9d4ff73f3d350");

  console.log("token deployed to:", myTokenFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
