import * as vscode from 'vscode';
import { promises as fs } from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const saveSnapshotCommand = vscode.commands.registerCommand('scriptTracker.saveSnapshot', async () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No hay un editor de texto activo para guardar un snapshot.');
        return;
      }

      const document = editor.document;
      const content = document.getText();
      const fileName = path.basename(document.fileName, path.extname(document.fileName)) || 'Script';
      const timestamp = new Date().toISOString().slice(0, 16).replace('T', '-').replace(':', '_');
      const description = await vscode.window.showInputBox({ prompt: 'Descripción del estado (opcional)' });

      // Si el usuario presiona 'Escape', showInputBox devuelve undefined.
      if (description === undefined) {
        vscode.window.showInformationMessage('Operación cancelada.');
        return;
      }

      const tag = `${fileName}-${timestamp}`;
      const snapshot = {
        [tag]: {
          description: description || '',
          content: content
        }
      };

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
if (!workspaceFolder) {
  vscode.window.showErrorMessage('Por favor, abre una carpeta en el workspace para guardar el historial.');
  return;
}
const workspaceRoot = workspaceFolder.uri.fsPath;


const historyFolder = path.join(workspaceRoot, 'script-history');
      await fs.mkdir(historyFolder, { recursive: true });

const jsonPath = path.join(workspaceRoot, 'script-history', `${fileName}.json`);      let existingData = {};

      try {
        const raw = await fs.readFile(jsonPath, 'utf8');
        existingData = JSON.parse(raw);
      } catch (error: any) {
        // Si el archivo no existe (ENOENT) o está vacío, lo ignoramos y continuamos.
        // Si es otro error (p. ej. JSON malformado), lo notificamos.
        if (error.code !== 'ENOENT') {
          vscode.window.showWarningMessage(`El archivo de historial '${fileName}.json' podría estar corrupto. Se creará uno nuevo.`);
        }
      }

      const updatedData = { ...existingData, ...snapshot };
      await fs.writeFile(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

      vscode.window.showInformationMessage(`Snapshot guardado como ${tag}`);
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error al guardar el snapshot: ${error.message}`);
    }
  });

  const restoreSnapshotCommand = vscode.commands.registerCommand('scriptTracker.restoreSnapshot', async () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('Abre un archivo para restaurar un snapshot.');
        return;
      }

      const document = editor.document;
      const fileName = path.basename(document.fileName, path.extname(document.fileName)) || 'Script';

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
if (!workspaceFolder) {
  vscode.window.showErrorMessage('Por favor, abre una carpeta en el workspace para guardar el historial.');
  return;
}
const workspaceRoot = workspaceFolder.uri.fsPath;



const jsonPath = path.join(workspaceRoot, 'script-history', `${fileName}.json`);
      let historyData = {};

      try {
        const raw = await fs.readFile(jsonPath, 'utf8');
        historyData = JSON.parse(raw);
      } catch (error) {
        vscode.window.showErrorMessage(`No se encontró historial para '${fileName}.json' o el archivo está corrupto.`);
        return;
      }

      const snapshotItems = Object.entries(historyData).map(([tag, data]: [string, any]) => ({
        label: tag,
        description: data.description || 'Sin descripción',
        content: data.content
      }));

      if (snapshotItems.length === 0) {
        vscode.window.showInformationMessage('No hay snapshots para restaurar en este archivo.');
        return;
      }

      const selectedSnapshot = await vscode.window.showQuickPick(snapshotItems.reverse(), {
        placeHolder: 'Selecciona un snapshot para restaurar'
      });

      if (selectedSnapshot) {
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(document.getText().length)
        );
        editor.edit(editBuilder => {
          editBuilder.replace(fullRange, selectedSnapshot.content);
        });
        vscode.window.showInformationMessage(`Snapshot '${selectedSnapshot.label}' restaurado.`);
      }
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error al restaurar el snapshot: ${error.message}`);
    }
  });

  context.subscriptions.push(saveSnapshotCommand, restoreSnapshotCommand);
}

export function deactivate() {}
