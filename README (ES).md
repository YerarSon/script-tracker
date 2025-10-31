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
