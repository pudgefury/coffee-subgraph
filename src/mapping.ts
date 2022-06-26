import { BigInt } from "@graphprotocol/graph-ts"
import {
  CoffeeManager,
  CoffeeChanged
} from "../generated/CoffeeManager/CoffeeManager"
import { Coffee } from "../generated/schema"

export function handleCoffeeChanged(event: CoffeeChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // Use proper id to load an entity from store
  const id = event.params.id.toHex();

  // Load the entity to be updated
  let gCoffee = Coffee.load(id);

  // Create the entity if it doesn't already exist
  if (!gCoffee) {
    gCoffee = new Coffee(id);
  }

  // Set updated fields to entity
  gCoffee.addr = event.params.addr;
  gCoffee.amount = event.params.amount;

  // Save updated entity to store
  gCoffee.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.coffee(...)
  // - contract.index(...)
  // - contract.ownerIndex(...)
}
