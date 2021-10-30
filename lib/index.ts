#!/usr/bin/env node

import chalk from "chalk"
import { Command } from "commander"
import ora from "ora"
import { generateVanityAddress } from "./address"

const spinner = ora("Generating addresses...")
// spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏")

const program = new Command()
program
  .option("-v, --verbose", "output all addressees as they are generated")
  .option("-p, --prefix <prefix>", "prefix of the address")
  .option("-s, --suffix <suffix>", "suffix of the address")

program.parse(process.argv)

const { verbose, prefix, suffix } = program.opts()

if ((!prefix || !prefix.length) && (!suffix || !suffix.length)) {
  console.error(chalk.red("Please specify a --prefix or --suffix"))
  process.exit(1)
}

if (!verbose) {
  spinner.start()
}

const startTime = Date.now()
generateVanityAddress({ verbose, prefix, suffix }, (err, keypair) => {
  const endTime = Date.now()
  console.log("Total time:", endTime - startTime, "ms")
  if (err || !keypair) {
    console.error(err)
    process.exit(1)
  }

  console.log("\n\n")
  console.log(chalk.underline.blue("Public Key:"))
  console.log(keypair.publicKey.toBase58())
  console.log(chalk.underline.blue("\nPrivate Key:"))
  console.log(Buffer.from(keypair.secretKey).toString("hex"))

  process.exit(0)
})
