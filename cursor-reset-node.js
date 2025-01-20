#!/usr/bin/env node
/*
Cursor Trial Reset Tool

This script resets the device IDs in Cursor's configuration file to generate a new random device ID.

Repository: https://github.com/ultrasev/cursor-reset
Author: @ultrasev
Created: 10/Dec/2024
*/

const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.backup_${new Date()
      .toISOString()
      .replace(/[-:.]/g, "")}`;
    fs.copyFileSync(filePath, backupPath);
  }
}

function getStorageFile() {
  const system = os.platform();
  if (system === "win32") {
    return path.join(
      process.env.APPDATA,
      "Cursor",
      "User",
      "globalStorage",
      "storage.json"
    );
  } else if (system === "darwin") {
    return path.join(
      os.homedir(),
      "Library",
      "Application Support",
      "Cursor",
      "User",
      "globalStorage",
      "storage.json"
    );
  } else if (system === "linux") {
    return path.join(
      os.homedir(),
      ".config",
      "Cursor",
      "User",
      "globalStorage",
      "storage.json"
    );
  } else {
    throw new Error(`Unsupported operating system: ${system}`);
  }
}

function resetCursorId() {
  const storageFile = getStorageFile();
  fs.mkdirSync(path.dirname(storageFile), { recursive: true });
  backupFile(storageFile);

  let data = {};
  if (fs.existsSync(storageFile)) {
    const fileContent = fs.readFileSync(storageFile, "utf-8");
    data = JSON.parse(fileContent);
  }

  const machineId = crypto.randomBytes(32).toString("hex");
  const macMachineId = crypto.randomBytes(32).toString("hex");
  const devDeviceId = uuidv4();

  data["telemetry.machineId"] = machineId;
  data["telemetry.macMachineId"] = macMachineId;
  data["telemetry.devDeviceId"] = devDeviceId;

  fs.writeFileSync(storageFile, JSON.stringify(data, null, 2), "utf-8");

  console.log(
    "🎉 Device IDs have been successfully reset. The new device IDs are: \n"
  );
  console.log(
    JSON.stringify(
      {
        machineId: machineId,
        macMachineId: macMachineId,
        devDeviceId: devDeviceId,
      },
      null,
      2
    )
  );
   console.log(`查看地址：%APPDATA%\Cursor\User\globalStorage\storage.json`);
}

resetCursorId();
