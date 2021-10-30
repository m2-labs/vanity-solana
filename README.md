# Solana Vanity Address Generator

Generate a vanity Solana address starting or ending with any letter or phrase.

## Installation

```
npm i -g @m2-labs/solana-vanity-address
```

## Usage

```
solana-vanity-address --prefix m --suffix 2
```

## Options

```
Usage: solana-vanity-address [options]

Options:
  -v, --verbose          output all addressees as they are generated
  -p, --prefix <prefix>  prefix of the address
  -s, --suffix <suffix>  suffix of the address
  -h, --help             display help for command
```

## Note on prefix and suffix length

This tool runs using brute-force, potentially generating thousands or millions
of addresses before matching your constraints. The longer prefix or suffix you
choose, the longer it will take to find a match.

## Brought to you by M2 Labs

<img src="https://m2.xyz/github.png" alt="M2 Labs" width="427" height="94" />

This project is maintained and funded by [M2 Labs](https://m2.xyz), a Web3
product development studio.
