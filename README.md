# Navigator VSCode editor Debugging

## Setup environment

### 1) Instal `Debugger for Chrome` Extension for VSCode

- In editor - Go to Extensions window
- Search for `Debugger for Chrome`
- Install

### 2) Create `launch.json` debug configuration

- In editor - Go to Debug window
- `Add configuration` - will open `launch.json` configuration file
- Insert this object into `configurations` array. (Values depends on OS)

```json
    {
        "name": "Attach to chrome",
        "type": "chrome",
        "request": "attach",
        "port": 9222,
        "urlFilter": "localhost:8080/*",
        "webRoot": "ABSOLUTE-PATH-TO-mews-js-FOLDER",
        "trace": true,
        "sourceMaps": true,
        "sourceMapPathOverrides": {
            "webpack:///./*": "${webRoot}/packages/mews-navigator/web-app/*"
        }
    }
```

### 3) Run your application with devtool: 'source-map'

Instead of running `yarn start` **run** `yarn start:debug`

It will runs webpack-dev-server with option `devtool: 'source-map'` which allows VSCode to debug code in editor.


### 3) Run Google Chrome with debugging enabled

Close all chrome processes and then:

**Windows**

Right click the Chrome shortcut, and select properties
In the "target" field, append `--remote-debugging-port=9222`
Or in a command prompt, execute `<path to chrome>/chrome.exe --remote-debugging-port=9222`

**macOS**

In a terminal, execute `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222`

**Linux**

In a terminal, launch `google-chrome --remote-debugging-port=9222`

Then open `http://localhost:8080/` in this chrome window

Thats' it. Happy debbuging.

## How to debug

1) Run your configuration

- Run your newly created debug configuration
- It will attach your chrome browser
- place breakpoints to your code
- In chrome - Refresh the page or do action which will trigger the breakpoint

- Tadáá

