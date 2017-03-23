var assert = require("assert")
var {ethCall, ethSend} = require("../src/ethCall")

require("./setupTestKeys")

const web3 = require("../src/signed-web3")

describe("ethCall", () => {
    it("should return error if no function name given", function () {
        this.timeout(0)     // disable timeout
        Promise.resolve().then(() => {
            return ethCall("src", "target", "abi", null)
        }).then(() => {
            throw "shouldn't succeed"
        }).catch(e => {
            assert.equal(e.message, "Missing function name (function:string)")
        })
    })

    // TODO: tests
})

describe("ethSend", () => {
    it("should return the usual stuff if successful", function () {
        this.timeout(0)     // disable timeout
        from = "0x9e3d69305da51f34ee29bfb52721e3a824d59e69"
        to = "0xddc8963569bc7f237fee4eaf129d26d276fcf22e"
        return ethSend(from, to, 1).then(result => {
            assert.equal(result.valueReceived, 1)
        })
    })
})
