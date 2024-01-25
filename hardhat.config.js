/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_API_KEY = "dI0KUb7ExII5YEn9vl5-IL0tVN2YCl1f";
const MUMBAI_PRIVATE_KEY = "2be196ac7730efebc5a0922d79bd5207b70e72ecfb2c7e09492134aca77c3eae";
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "polygon_mumbai",
  networks:{
    polygon_mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${MUMBAI_PRIVATE_KEY}`],
    }
  },
  paths: {
    tests: "./tests",
},
  etherscan:{
   apiKey: "YH572V2C142GFJGUJICCAJ7EQ5TZKYN46P"
  }
};
// module.exports = {
//   solidity: "0.8.19",
//   networks: {
//         hardhat: {
//             accounts: {
//                 count: 100,
//                 // accountsBalance: 10000000000000000000000, // default value is 10000ETH in wei
//             },
//         },
//     },
// };
