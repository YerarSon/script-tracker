# Script Tracker

Script Tracker is a Visual Studio Code extension that lets you save snapshots of your script with timestamps and personalized notes. Perfect for developers who document each step of their creative process.

---

## ✨ Purpose

To return to functional versions of your code or trace its evolutionary progress over time.
---

## ⚠️ VS Code Compatibility

This extension requires Visual Studio Code version 1.105.0 or higher.

If you see the message:

Extension is not compatible with Code 1.104.2. Extension requires: ^1.105.0

You have two options:

1. Update VS Code via the menu Help → Check for Updates

2. Modify the package.json file to allow older versions:
   ```json
   "engines": {
     "vscode": "^1.104.0"
   }

## 🧪 Example of a Generated Snapshot

When you run Script Tracker: Save snapshot, a .json file is created like this:

```json
{
  "Extention Try-2025-10-22-08_18": {
    "description": "First test of the extension",
    "content": "// Source code captured at that moment"
  }
}
This file is automatically saved in the script-history folder inside the open workspace.