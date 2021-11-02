import { Keypair } from "@solana/web3.js"

const isValidVanityAddress = (
  prefix: string,
  suffix: string,
  address: string
): boolean => {
  return (
    address.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase()) &&
    address.toLowerCase().endsWith(suffix.toLowerCase())
  )
}

export const generateVanityAddress = (
  prefix: string,
  suffix: string,
  counter: () => void
) => {
  let keypair = Keypair.generate()

  while (!isValidVanityAddress(prefix, suffix, keypair.publicKey.toBase58())) {
    counter()
    keypair = Keypair.generate()
  }

  return keypair
}
