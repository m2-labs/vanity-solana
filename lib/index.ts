import { Keypair } from "@solana/web3.js"
import { Command } from "commander"

type Opts = { verbose?: boolean; prefix?: string; suffix?: string }

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

async function generateVanityWallet({
  verbose,
  prefix,
  suffix
}: Opts): Promise<void> {
  const opts = []
  if (prefix && prefix.length) opts.push(`prefix "${prefix}"`)
  if (suffix && suffix.length) opts.push(`suffix "${suffix}"`)
  console.log(`Generating vanity wallet with ${opts.join(" and ")} ...`)

  let keypair: Keypair

  do {
    keypair = Keypair.generate()
    if (verbose) {
      console.log(`${keypair.publicKey.toBase58()}`)
    }
  } while (!matches(keypair.publicKey.toBase58(), { prefix, suffix }))

  console.log("\n\n----")
  console.log("Public Key:")
  console.log(keypair.publicKey.toBase58())
  console.log("\nPrivate Key:")
  console.log(Buffer.from(keypair.secretKey).toString("hex"))
  console.log("----")
}

const program = new Command()
program
  .option("-v, --verbose", "output all addressees as they are generated")
  .option("-p, --prefix <prefix>", "prefix of the address")
  .option("-s, --suffix <suffix>", "suffix of the address")

program.parse(process.argv)

const { verbose, prefix, suffix } = program.opts()

if ((!prefix || !prefix.length) && (!suffix || !suffix.length)) {
  console.error("Please specify a --prefix or --suffix")
  process.exit(1)
}

generateVanityWallet({ verbose, prefix, suffix })
