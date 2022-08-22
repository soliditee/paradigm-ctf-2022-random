const { ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

async function solve() {
    const gasLimit = 100000
    const player = (await ethers.getSigners())[0]
    const setup = await ethers.getContractAt("Setup", "0x63c6cF7eA9727aC604a3A996e8Ac3B9a84C19ff0", player)

    const randomAddress = await setup.random()
    const random = await ethers.getContractAt("Random", randomAddress, player)

    await random.solve("4")

    const isSolved = await setup.isSolved()
    console.log(`Result=${isSolved}`)
}

solve()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
