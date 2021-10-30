import chalk from "chalk"
import { Spinner } from "cli-spinner"
import { Command } from "commander"
import { generateVanityAddress } from "./address"

const spinner = new Spinner(chalk.green("%s Generating..."))
spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏")

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

generateVanityAddress({ verbose, prefix, suffix }, (err, keypair) => {
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
