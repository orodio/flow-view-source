import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchLockedTokens(address) {
  return fcl
    .send([
      fcl.script`
        import LockedTokens from ${await fcl.config().get("contract.LockedTokens")}   

        pub struct Summary {
          pub let address: Address
          pub let locked: UFix64

          init(_ t: &{LockedTokens.LockedAccountInfo}) {
            self.address = t.getLockedAccountAddress()
            self.locked = t.getLockedAccountBalance()
          }
        }

        pub fun main(address: Address): Summary? {
          let cap = getAccount(address)
            .getCapability(LockedTokens.LockedAccountInfoPublicPath)!
             
          if let t = cap.borrow<&{LockedTokens.LockedAccountInfo}>() {
            return Summary(t)
          }
          return nil
        }
    `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}
