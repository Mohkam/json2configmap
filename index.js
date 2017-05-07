const path = require('path')
const YAML = require('yamljs')

module.exports = (configFile, prefix, name = '<Config map name>'
  , namesapce = '<Config map namesapce>') => {
  let template = YAML.load(path.join(__dirname, './template.yml'))
  template.data = {}
  template.metadata.name = name
  template.metadata.namespace = namesapce

  let replaceWithPath = (obj, prefix, result = []) => {
    Object.keys(obj).forEach(key => {
      let name = prefix ? prefix + key : key
      if (typeof obj[key] !== 'object' || Array.isArray(obj[key])) {
        let tmp = obj[key]
        if (typeof tmp === 'number') tmp = tmp.toString()
        result.push({key: name, value: tmp})
      } else result.concat(replaceWithPath(obj[key], name + '.', result))
    })
    return result
  }

  replaceWithPath(configFile, prefix).forEach(conf => {
    template.data[conf.key] = conf.value
  })

  return YAML.stringify(template, 2)
}
