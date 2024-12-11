#!/usr/bin/env python3
import json
import os
import shutil
import uuid
from datetime import datetime
from pathlib import Path


def generate_random_id():
    return os.urandom(32).hex()


def generate_random_uuid():
    return str(uuid.uuid4())


def backup_file(file_path: str):
    if os.path.exists(file_path):
        backup_path = f"{file_path}.backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        shutil.copy2(file_path, backup_path)


def reset_cursor_id():
    storage_file = (Path(os.path.expanduser("~")) / "Library" /
                    "Application Support" / "Cursor" / "User" /
                    "globalStorage" / "storage.json")
    storage_file.parent.mkdir(parents=True, exist_ok=True)
    backup_file(storage_file)

    if not storage_file.exists():
        data = {}
    else:
        with open(storage_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

    machine_id = generate_random_id()
    mac_machine_id = generate_random_id()
    dev_device_id = generate_random_uuid()

    data["telemetry.machineId"] = machine_id
    data["telemetry.macMachineId"] = mac_machine_id
    data["telemetry.devDeviceId"] = dev_device_id

    with open(storage_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print("Successfully modified IDs:")
    print(
        json.dumps(
            {
                "machineId": machine_id,
                "macMachineId": mac_machine_id,
                "devDeviceId": dev_device_id,
            },
            indent=2))


if __name__ == "__main__":
    reset_cursor_id()
