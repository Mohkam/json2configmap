## Creates a configMap.yml file for Kubernetes from a JSON file
This package converts appsettings.json to configmap.yaml
this fork particularly converts .net core appsettings.json to environment variables (config maps) to be used in kubernetes pods.

### install
```shell
npm i -g json-to-configmap
```

### Usage
```shell
json2configmap <config-file.json> [optinal]<prefix>
```
UseCase
