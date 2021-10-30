import { Keypair } from "@solana/web3.js"

type Opts = { verbose?: boolean; prefix?: string; suffix?: string }
type Callback = (err?: Error | null, keypair?: Keypair) => void

function matches(address: string, { prefix, suffix }: Opts): boolean {
  let prefixMatch = true
  let suffixMatch = true

  if (prefix) {
    prefixMatch = address.toLowerCase().startsWith(prefix.toLowerCase())
  }

  if (suffix) {
    suffixMatch = address.toLowerCase().endsWith(suffix.toLowerCase())
  }

  return prefixMatch && suffixMatch
}

export async function generateVanityAddress(
  { verbose, prefix, suffix }: Opts,
  callback: Callback
): Promise<void> {
  const keypair = Keypair.generate()

  if (verbose) {
    console.log(`${keypair.publicKey.toBase58()}`)
  }

  if (matches(keypair.publicKey.toBase58(), { prefix, suffix })) {
    callback(null, keypair)
  }

  setTimeout(() => {
    generateVanityAddress({ verbose, prefix, suffix }, callback)
  }, 0)
}
