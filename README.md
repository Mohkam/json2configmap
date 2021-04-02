## Creates a configMap.yml file for Kubernetes from a JSON file
This package converts appsettings.json to configmap.yaml
this fork particularly converts .net core appsettings.json to environment variables (config maps) to be used in kubernetes pods.

### Example
this will convert  c:\appsettings.json
 ```
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Elasticsearch",
      "TransPerfect.ReefReview.Core.Serilog"
    ],  
    "Enrich": [
      "FromLogContext",
      "WithMachineName",
      "WithThreadId",
      "WithExceptionDetails",
      "WithEnvPodName"
    ],
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "Microsoft.AspNetCore.Authentication": "Information"
      }
    }
  }
}
```
to :
```
apiVersion: v1
kind: ConfigMap
metadata:
    name: YourCMapNameHere
    namespace: namesapce
data:
    Serilog__Using__0: Serilog.Sinks.Elasticsearch
    Serilog__Using__1: TransPerfect.ReefReview.Core.Serilog
    Serilog__Enrich__0: FromLogContext
    Serilog__Enrich__1: WithMachineName
    Serilog__Enrich__2: WithThreadId
    Serilog__Enrich__3: WithExceptionDetails
    Serilog__Enrich__4: WithEnvPodName
    Serilog__MinimumLevel__Default: Debug
    Serilog__MinimumLevel__Override__Microsoft: Warning
    Serilog__MinimumLevel__Override__System: Warning
    Serilog__MinimumLevel__Override__Microsoft.AspNetCore.Authentication: Information
```
### install
```shell
npm i -g json-to-configmap
```

### Usage
```shell
json2configmap <config-file.json> [optinal]<prefix>
```

