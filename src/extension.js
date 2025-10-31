"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('scriptTracker.saveSnapshot', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const document = editor.document;
        const content = document.getText();
        const fileName = document.fileName.split(path.sep).pop()?.split('.')[0] || 'Script';
        const timestamp = new Date().toISOString().slice(0, 16).replace('T', '-');
        const description = await vscode.window.showInputBox({ prompt: 'Descripción del estado (opcional)' });
        const tag = `${fileName}-${timestamp}`;
        const snapshot = {
            [tag]: {
                description: description || '',
                content: content
            }
        };
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No hay carpeta abierta en el workspace.');
            return;
        }
        const historyFolder = path.join(workspaceFolders[0].uri.fsPath, 'script-history');
        if (!fs.existsSync(historyFolder)) {
            fs.mkdirSync(historyFolder);
        }
        const jsonPath = path.join(historyFolder, `${fileName}.json`);
        let existingData = {};
        if (fs.existsSync(jsonPath)) {
            const raw = fs.readFileSync(jsonPath, 'utf8');
            existingData = JSON.parse(raw);
        }
        const updatedData = { ...existingData, ...snapshot };
        fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
        vscode.window.showInformationMessage(`Snapshot guardado como ${tag}`);
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map