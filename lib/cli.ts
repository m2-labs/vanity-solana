#!/usr/bin/env node

import cluster from "cluster"
import os from "os"
import process from "process"
import chalk from "chalk"
import { Command } from "commander"
import ora from "ora"
import qrcode from "qrcode-terminal"
import { generateVanityAddress } from "./vanity-address"

// Default to half your CPUs
const defaultWorkers = Math.max(1, os.cpus().length / 2)

const exit = (err?: Error) => {
  for (const id in cluster.workers) {
    const worker = cluster.workers[id]
    worker?.process.kill()
  }

  if (err) {
    console.error(err)
    process.exit(1)
  }

  process.exit(0)
}

/**
 * Parse arguments
 */
const program = new Command()
const { prefix, suffix, caseSensitive, qrCode, workers } = program
  .name("vanity-solana")
  .option("-p, --prefix <prefix>", "prefix of the address", "")
  .option("-s, --suffix <suffix>", "suffix of the address", "")
  .option("-c, --case-sensitive", "case sensitive vanity address", false)
  .option("-q, --qr-code", "show a scannable qr code", false)
  .option("-w, --workers <workers>", "number of worker processes to use", defaultWorkers.toString())
  .parse(process.argv)
  .opts()

if (cluster.isMaster || cluster.isPrimary) {
  let addressesGenerated = 0
  const spinner = ora(`Generating vanity address`).start()
  const numWorkers = Number(workers)

  for (let i = 0; i < numWorkers; i++) {
    const childProcess = cluster.fork()
    childProcess.on("message", function (message) {
      if (message.keypair) {
        const successMessage = [
          `Done after ${addressesGenerated.toLocaleString()} addresses`,

          chalk.underline.blue("\nPublic Key:"),
          message.keypair.publicKey,
          chalk.underline.blue("Private Key:"),
          message.keypair.secretKey
        ].join("\n")

        spinner.succeed(successMessage)
        if (qrCode) {
          qrcode.generate(message.keypair.secretKey, { small: true })
        }
        exit()
      } else if (message.incrementCounter) {
        addressesGenerated++
        spinner.text = `Generating vanity address (${addressesGenerated.toLocaleString()})`
      }
    })
  }
} else {
  /**
   * Worker Process
   */
  const keypair = generateVanityAddress(prefix, suffix, caseSensitive, () => {
    process.send && process.send({ incrementCounter: true })
  })

  if (keypair) {
    process.send &&
      process.send({
        keypair: {
          raw: keypair,
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString("hex")
        }
      })
  }
}

process.stdin.resume()
process.on("exit", exit.bind({}))
process.on("SIGINT", exit.bind({}))
process.on("uncaughtException", exit.bind({}))
