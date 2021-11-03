# Vanity Solana

## Vanity Solana Address Generator

Generate a Solana address starting or ending with any letter or phrase.

⚡️ Supports multi-core processors!<br />
⚡️ Generates awesome addresses!<br />
⚡️ QR Codes!<br />
⚡️ Solana!

## Installation

```sh
npm i -g vanity-solana
```

## Usage

```sh
vanity-solana --prefix m --suffix 2
```

## Options

```sh
Usage: vanity-solana [options]

Options:
  -p, --prefix <prefix>  prefix of the address (default: "")
  -s, --suffix <suffix>  suffix of the address (default: "")
  -c, --case-sensitive   case sensitive vanity address (default: false)
  -q, --qr-code          show a scannable qr code (default: false)
  -w, --workers          number of worker processes to use (default: half the number of CPUs of your system)
  -h, --help             display help for command
```

## Examples

Generate an address

```sh
vanity-solana
```

Generate an address starting with "aa", case insensitive

```sh
vanity-solana -p aa
```

Generate an address ending with "zz", case insensitive

```sh
vanity-solana -s zz
```

Generate an address starting with "A" and ending with "z", case sensitive:

```sh
vanity-solana -p A -s z -c
```

Generate an address and show a qr code to scan

```sh
vanity-solana -q
```

Only use 1 worker process

```sh
vanity-solana -w 1
```

## Note on prefix and suffix length

Most Solana apps will truncate your address, only showing the first and last 4
characters of your address, so it is not recommended to use longer strings
than 4 characters.

Also, this tool runs using brute-force, generating thousands or millions
of addresses before matching your constraints. The longer prefix and/or suffix
you choose, the longer it will take to find a match.

## Brought to you by M2 Labs

<img src="https://m2.xyz/github.png" alt="M2 Labs" width="427" height="94" />

This project is maintained and funded by [M2 Labs](https://m2.xyz), a Web3
product development studio.
