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

__________________________________________________

# Script Tracker

**Script Tracker** es una extensión para Visual Studio Code que te permite guardar snapshots de tu script con marca de tiempo y notas personalizadas. Ideal para desarrolladores que describen cada paso de su proceso creativo.

---

## ✨ Utilidad

Para regresar a las versiones funcionales de un código, o tener un rastro de los avances evolutivos del mismo.

---

## ⚠️ Compatibilidad con VS Code

Esta extensión requiere Visual Studio Code versión **1.105.0** o superior.

Si ves el mensaje:

> Extension is not compatible with Code 1.104.2. Extension requires: ^1.105.0

Tienes dos opciones:

1. **Actualizar VS Code** desde el menú `Ayuda → Buscar actualizaciones`
2. **Modificar el archivo `package.json`** para permitir versiones anteriores:
   ```json
   "engines": {
     "vscode": "^1.104.0"
   }

## 🧪 Ejemplo de snapshot generado

Al ejecutar `Script Tracker: Guardar snapshot`, se genera un archivo `.json` como este:

```json
{
  "Prueba extensión-2025-10-22-08_18": {
    "description": "Primer prueba de la extensión",
    "content": "// Código fuente capturado en ese momento"
  }
}
