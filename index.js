bip39 = require('bip39') // npm i -S bip39
ethUtil = require('ethereumjs-util')
hdkey = require('ethereumjs-wallet/hdkey')

const getAccount = (mnemonic, accountNumber) =>
    {
        var seed = bip39.mnemonicToSeed(mnemonic)
        const root = hdkey.fromMasterSeed(seed)
        const masterPrivateKey = root._hdkey._privateKey.toString('hex')
        const addrNode = root.derivePath("m/44'/60'/0'/0/" + accountNumber.toString())
        const privKey = "0x" + addrNode._hdkey._privateKey.toString('hex')
        const pubKey = ethUtil.privateToPublic(addrNode._hdkey._privateKey)
        const addr = "0x" + ethUtil.publicToAddress(pubKey).toString('hex')
        return {address: addr, privateKey: privKey.toString('hex')}
    }

const getAccounts = (mnemonic, startIndex, endIndex) =>
{
    var seed = bip39.mnemonicToSeed(mnemonic)
    const root = hdkey.fromMasterSeed(seed)
    const masterPrivateKey = root._hdkey._privateKey.toString('hex')

    var addressPrivateKeyPairs = []
    for(var i = startIndex; i <= endIndex; i++)
    {
        const addrNode = root.derivePath("m/44'/60'/0'/0/" + i.toString())
        const privKey = "0x" + addrNode._hdkey._privateKey.toString('hex')
        const pubKey = ethUtil.privateToPublic(addrNode._hdkey._privateKey)
        const addr = "0x" + ethUtil.publicToAddress(pubKey).toString('hex')

        addressPrivateKeyPairs.push([addr, privKey.toString('hex')])
    }
    
    return addressPrivateKeyPairs;
}

module.exports = {
    getAccount: getAccount,
    getAccounts: getAccounts
}