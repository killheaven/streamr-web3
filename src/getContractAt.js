var _ = require("lodash")
var rest = require("restling");
var debug = require('debug')('getContractAt')

const web3 = require("./signed-web3")

// https://etherscan.io/myapikey (testnet seems to work without)
//const API_KEY = "EKGYIQ8GW3F96C1PQAP6UV3MW8M4R7AJAI"

function getContractAt(address) {
    if (!address) { throw new Error("'at' query parameter required (contract address)") }
    var bytecode = web3.eth.getCode(address)
    if (bytecode.length < 3) { throw new Error("no contract at " + address) }

    // TODO: Query https://etherscan.io/apis#contracts
    var url = `https://ropsten.etherscan.io/api?module=contract&action=getabi&address=${address}`//&apikey=${API_KEY}`
    return rest.get(url).then((response) => {
        debug(`Response from ${url}: ${response.data}`)
        if (response.data.result == "") {
            return {address}
        } else {
            return {address, abi: JSON.parse(response.data.result)}
        }
    })
}

module.exports = getContractAt
