#!/usr/bin/env node

const jf = require('jsonfile')
const fs = require('fs')
const fileNameToRead = process.argv[2]
const prefix = process.argv[3] ? process.argv[3] + '.' : ''
const path = require('path')
const createConfigMap = require(path.join(__dirname, '../index.js'))

let configFile = jf.readFileSync(fileNameToRead)
fs.writeFileSync('./configMap.yml', createConfigMap(configFile, prefix))
