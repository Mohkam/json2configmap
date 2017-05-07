#!/usr/bin/env node

const jf = require('jsonfile')
const fs = require('fs')
const fileNameToRead = process.argv[2]
const prefix = process.argv[3] ? process.argv[3] + '.' : null

const YAML = require('yamljs')
const path = require('path')

let configFile = jf.readFileSync(fileNameToRead)
let template = YAML.load(path.join(__dirname, './template.yml'))
template.data = {}

let replaceWithPath = (obj, prefix, result) => {
  Object.keys(obj).map(key => {
    let name = prefix ? prefix + key : key
    if (typeof obj[key] !== 'object' || Array.isArray(obj[key])) {
      if (typeof obj[key] === 'number') obj[key] = obj[key].toString()
      result.push({key: name, value: obj[key]})
    } else result.concat(replaceWithPath(obj[key], name + '.', result))
  })
  return result
}

let configData = replaceWithPath(configFile, prefix, [])
configData.forEach(conf => {
  template.data[conf.key] = conf.value
})

fs.writeFileSync('./configMap.yml', YAML.stringify(template, 4))
