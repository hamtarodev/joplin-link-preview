import joplin from 'api';
import { isLink } from './utils/links';
import { composeUi } from './utils/ui';

joplin.plugins.register({
	onStart: async function() {
		const panel = await joplin.views.panels.create(`panel`);
		await joplin.views.panels.addScript(panel, './styles/main.css');
		await joplin.views.panels.addScript(panel, './webview.js');

		async function updateToView() {
			const note = await joplin.workspace.selectedNote();
			const body = note.body;
			const lines: string[] = body.split('\n');

			const linkToPreview: string[] = [];

			for (const line of lines) {
				const isLinkRes = isLink(line);
				if (isLinkRes.isValid) {
					for (const validString of isLinkRes.validStrings) {
						linkToPreview.push(validString);
					}
				}
			}

			const ui = await composeUi(linkToPreview);
			await joplin.views.panels.setHtml(panel, ui);
			joplin.views.panels.postMessage(panel, 'init');
		}

		await joplin.workspace.onNoteSelectionChange(() => {
			updateToView()
		});

		await joplin.workspace.onNoteChange(() => {
			updateToView()
		});
	},
});
