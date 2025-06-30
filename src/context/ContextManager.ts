import * as vscode from 'vscode';

// ContextManager: gestiona el contexto del editor
export class ContextManager {
    /**
     * Captura el contexto relevante del editor de VS Code.
     * @returns Un objeto con el contexto o null si no se puede obtener.
     */
    async captureContext(): Promise<{
        documentText: string | null;
        languageId: string | null;
        cursorPosition: vscode.Position | null;
        selectionText: string | null;
    } | null> {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            // No hay editor activo, no hay contexto que capturar.
            return null;
        }

        const document = editor.document;
        const selection = editor.selection;

        const context = {
            documentText: document.getText(),
            languageId: document.languageId,
            cursorPosition: selection.isEmpty ? editor.selection.active : null, // Si no hay selección, capturamos la posición del cursor
            selectionText: selection.isEmpty ? null : document.getText(selection) // Si hay selección, capturamos el texto seleccionado
        };

        return context;
    }

    /**
     * Obtiene el texto seleccionado o el texto del documento si no hay selección.
     * Útil para prompts directos.
     */
    async getContextForPrompt(): Promise<string | null> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return null;
        }

        const selection = editor.selection;
        if (!selection.isEmpty) {
            return editor.document.getText(selection);
        } else {
            // Si no hay selección, devolvemos una descripción simple del contexto actual
            // Esto es una simplificación, en el futuro aquí podríamos incluir más detalles
            return `// Contexto: Archivo ${editor.document.fileName}\n// Posición del cursor: ${editor.selection.active.line + 1}:${editor.selection.active.character + 1}`;
        }
    }
}
