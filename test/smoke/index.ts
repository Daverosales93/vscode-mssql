import {
	downloadAndUnzipVSCode
} from '@vscode/test-electron';

import { _electron as electron } from '@playwright/test';
import * as path from 'path';

async function main() {
	const vscodeExecutablePath = await downloadAndUnzipVSCode('insiders');
	console.log('VS Code is downloaded to:', vscodeExecutablePath);

	const extensionPath = path.resolve(__dirname, '../../../');
	console.log('Extension path is:', extensionPath);

	const electronApp = await electron.launch({
		executablePath: vscodeExecutablePath,
		args: [
			'--extensionDevelopmentPath=' + extensionPath,
			'--disable-extensions',
			'--disable-gpu-sandbox', // https://github.com/microsoft/vscode-test/issues/221
			'--disable-updates', // https://github.com/microsoft/vscode-test/issues/120
			'--disable-workspace-trust',
			'--new-window', // Opens a new session of VS Code instead of restoring the previous session (default).
			'--no-sandbox', // https://github.com/microsoft/vscode/issues/84238
			'--profile-temp', // "debug in a clean environment"
			'--skip-release-notes',
			'--skip-welcome'
		],
	});

	const page = await electronApp.firstWindow({
		timeout: 10000
	});

	const window = await electronApp.firstWindow();
	// Print the title.
	console.log(await window.title());
	window.on('console', console.log);

		/// wait for 30 seconds
		await new Promise(resolve => setTimeout(resolve, 3000));
	await window.click('a[aria-label="SQL Server (Ctrl+Alt+D)"]');

	/// wait for 30 seconds
	await new Promise(resolve => setTimeout(resolve, 3000));
	page.close();

}

main();