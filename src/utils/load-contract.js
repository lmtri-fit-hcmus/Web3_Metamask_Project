//import contract from "@truffle/contract"

export const loadContract = async(filepath,provider)=>{
    const res = await fetch('/contract/${filepath}.json')
    const artifact = await res.json()

    const _contract = contract(artifact)
    _contract.setProvider(provider)

    const deployedContract = await _contract.deployed()

    return deployedContract
}