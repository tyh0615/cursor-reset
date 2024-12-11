# Cursor Trial Reset Tool

A utility tool that helps manage Cursor editor's device identification system by resetting stored device IDs. This can help Mac users to resolve issues related to account restrictions when switching between accounts or during trial periods.

## How It Works

The tool generates a new device identifier, which allows Cursor to recognize your system as a new device.

![Device ID Management](./public/ids.png)

## Key Features

- ✨ Automatic random device ID generation
- 🔄 Automatic backup of original configuration
- 📦 Zero dependencies - runs with built-in Python only.

## Installation & Usage
```bash
curl -sL dub.sh/cursorreset | python3
```
> [dub.sh/cursorreset](https://dub.sh/cursorreset) is a shortcut for downloading the script file [`reset.py`](./reset.py) from this repository.


You can also download the script file [`reset.py`](./reset.py) from this repository, customize it and run it manually.

```bash
python3 reset.py
```


This will generate a new random device ID automatically.

**Important**: You need to completely close Cursor before running the script. If Cursor runs in the background, it may override the new device ID with the old one eventually.

## Configuration Location
You can also manually edit the configuration file to set a specific device ID. The default configuration file is located at:
```
~/Library/Application Support/Cursor/User/globalStorage/storage.json
```

## Important Notice

This tool is developed for research and educational purposes only. Please use responsibly. The developer assumes no liability for any issues that may arise from using this tool.
