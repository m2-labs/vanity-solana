# Solana Vanity Address Generator

Generate a vanity Solana address starting or ending with any letter or phrase.

⚡️ Supports multi-core processors<br />
⚡️ Generates awesome addresses<br />
⚡️ Solana!

## Installation

```sh
npm i -g @m2-labs/solana-vanity-address
```

## Usage

```sh
solana-vanity-address --prefix m --suffix 2
```

## Options

```sh
Usage: solana-vanity-address [options]

Options:
  -p, --prefix <prefix>  prefix of the address (default: "")
  -s, --suffix <suffix>  suffix of the address (default: "")
  -h, --help             display help for command
```

## Examples

Generate an address

```sh
solana-vanity-address
```

Generate an address starting with "aa"

```sh
solana-vanity-address -p aa
```

Generate an address ending with "zz"

```sh
solana-vanity-address -s zz
```

## Note on prefix and suffix length

This tool runs using brute-force, generating thousands or millions
of addresses before matching your constraints. The longer prefix or suffix you
choose, the longer it will take to find a match.

## Brought to you by M2 Labs

<img src="https://m2.xyz/github.png" alt="M2 Labs" width="427" height="94" />

This project is maintained and funded by [M2 Labs](https://m2.xyz), a Web3
product development studio.
