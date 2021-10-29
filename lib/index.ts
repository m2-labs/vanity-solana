import { Keypair } from "@solana/web3.js"

async function generateVanityWallet(startsWith: string): Promise<void> {
  let keypair = await Keypair.generate()
  console.log(keypair.publicKey.toBase58())

  while (
    !keypair.publicKey
      .toBase58()
      .toLowerCase()
      .startsWith(startsWith.toLowerCase())
  ) {
    keypair = await Keypair.generate()
    console.log(keypair.publicKey.toBase58())
  }

  console.log("\n\n")
  console.log("Public Key: ", keypair.publicKey.toBase58())
  console.log("Private Key: ", Buffer.from(keypair.secretKey).toString("hex"))
}

const prefix = process.argv[2]
if (!prefix || prefix.length < 1) {
  console.log("Please provide a prefix")
  process.exit(1)
}

console.log(`Generating vanity wallet with prefix "${prefix}"`)
generateVanityWallet(prefix)
