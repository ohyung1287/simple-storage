module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  networks: {
    // Ganache local testing
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match any network id
    }
  }
  // networks: { // Ropsten testing network
  // 	development: {
  // 		host: "127.0.0.1",
  // 		port: 8545,
  // 		network_id: "*" // Match any network id
  // 	},
  // 	ropsten: {
  // 		network_id: 3,
  // 		host: "127.0.0.1",
  // 		port: 8545,
  // 		gas: 2900000
  // 	}
  // },
  // rpc: {
  // 	host: "localhost",
  // 	post:8080
  // }
};
