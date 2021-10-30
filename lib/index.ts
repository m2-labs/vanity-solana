#!/usr/bin/env node

import chalk from "chalk"
import { Command } from "commander"
import ora from "ora"
import { generateVanityAddress } from "./address"

const spinner = ora("Generating addresses...")

const program = new Command()
const { verbose, prefix, suffix, chunks } = program
  .option("-p, --prefix <prefix>", "prefix of the address")
  .option("-s, --suffix <suffix>", "suffix of the address")
  .option("-c, --chunks <chunks>", "generate addresses in bunches", "100")
  .option("-v, --verbose", "output all addressees as they are generated")
  .parse(process.argv)
  .opts()

if ((!prefix || !prefix.length) && (!suffix || !suffix.length)) {
  console.error(chalk.red("Please specify a --prefix or --suffix"))
  process.exit(1)
}

const chunkSize = parseInt(chunks, 10)
if (chunks <= 0) {
  console.error(chalk.red("Please specify a chunk size > 0"))
  process.exit(1)
}

if (!verbose) {
  spinner.start()
}

const startTime = Date.now()
let generatedAddresses = 0
generateVanityAddress(
  { verbose, prefix, suffix, chunkSize },
  (newCount) => {
    generatedAddresses += newCount
    spinner.text = `Generating addresses (${generatedAddresses})...`
  },
  (err, keypair) => {
    const endTime = Date.now()
    console.log("Total time:", endTime - startTime, "ms")
    if (err || !keypair) {
      console.error(err)
      process.exit(1)
    }

    console.log(chalk.underline.blue("\nPublic Key:"))
    console.log(keypair.publicKey.toBase58())
    console.log(chalk.underline.blue("\nPrivate Key:"))
    console.log(Buffer.from(keypair.secretKey).toString("hex"))

    process.exit(0)
  }
)
