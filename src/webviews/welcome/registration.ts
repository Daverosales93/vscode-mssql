import { ViewColumn } from 'vscode';
import { Commands } from '../../constants';
import type { WebviewsController } from '../webviewsController';
import type { State } from './protocol';

export function registerWelcomeWebviewPanel(controller: WebviewsController) {
	return controller.registerWebviewPanel<State>(
		{ id: Commands.ShowWelcomePage },
		{
			id: 'mssql.welcome',
			fileName: 'apps/welcome/welcome.html',
			iconPath: 'images/sqlserver.png',
			title: 'Welcome to MSSQL for VS Code',
			contextKeyPrefix: `mssql:webview:welcome`,
			// trackingFeature: 'welcomeWebview',
			plusFeature: false,
			column: ViewColumn.Active,
			webviewHostOptions: {
				retainContextWhenHidden: false,
				enableFindWidget: true,
			},
		},
		async (container, host) => {
			const { WelcomeWebviewProvider } = await import(
				/* webpackChunkName: "webview-welcome" */ './welcomeWebview'
			);
			return new WelcomeWebviewProvider(container, host);
		},
	);
}
