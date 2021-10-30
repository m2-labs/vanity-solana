import { Keypair } from "@solana/web3.js"

type Opts = {
  verbose?: boolean
  prefix?: string
  suffix?: string
  chunkSize: number
}

type MatchOpts = {
  prefix?: string
  suffix?: string
}

type UpdateCallback = (count: number) => void
type FinalCallback = (err?: Error | null, keypair?: Keypair) => void

function matches(address: string, { prefix, suffix }: MatchOpts): boolean {
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

export function generateVanityAddress(
  { verbose, prefix, suffix, chunkSize }: Opts,
  updateCallback: UpdateCallback,
  callback: FinalCallback
): void {
  const keypairs = Array.from({ length: chunkSize }, () => Keypair.generate())

  const keypair = keypairs.find((keypair) =>
    matches(keypair.publicKey.toBase58(), { prefix, suffix })
  )

  updateCallback(chunkSize)

  if (keypair) {
    callback(null, keypair)
  }

  setTimeout(() => {
    generateVanityAddress(
      { verbose, prefix, suffix, chunkSize },
      updateCallback,
      callback
    )
  }, 0)
}
