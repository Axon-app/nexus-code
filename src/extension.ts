// Punto de entrada principal de la extensión
import * as vscode from 'vscode';
import { ContextManager } from './context/ContextManager'; // Importamos nuestro ContextManager

// Esta función se llama cuando tu extensión se activa
export function activate(context: vscode.ExtensionContext) {
	const contextManager = new ContextManager(); // Instanciamos nuestro ContextManager

	// Comando de ejemplo para capturar contexto
	let disposableCaptureContext = vscode.commands.registerCommand('nexus-code.captureContext', async () => {
		const contextData = await contextManager.captureContext();

		if (contextData) {
			vscode.window.showInformationMessage(`Contexto capturado: ${JSON.stringify(contextData, null, 2)}`);
			// Aquí es donde enviaríamos este contexto a la API de Gemini en el futuro.
		} else {
			vscode.window.showWarningMessage('No hay editor activo para capturar contexto.');
		}
	});

	context.subscriptions.push(disposableCaptureContext);

	// Comando original (lo mantenemos por ahora)
	let disposableHelloWorld = vscode.commands.registerCommand('nexus-code.helloWorld', () => {
		vscode.window.showInformationMessage('Hello from Nexus Code!');
	});
	context.subscriptions.push(disposableHelloWorld);
}

// Esta función se llama cuando tu extensión se desactiva
export function deactivate() {}
