import joplin from 'api';
import { isLink } from './utils/links';
import { composeUi } from './utils/ui';
import { randomInt } from 'crypto';

joplin.plugins.register({
	onStart: async function() {
		async function updateToView() {
			const rand = randomInt(1024);
			const panel = await joplin.views.panels.create(`panel`);

			// Loop each line
			const note = await joplin.workspace.selectedNote();
			const body = note.body;
			const lines: string[] = body.split('\n');

			const linkToPreview: string[] = [];

			for (const line of lines) {
				if (isLink(line)) {
					linkToPreview.push(line);
				}
			}

			const ui = composeUi(linkToPreview);
			await joplin.views.panels.setHtml(panel, ui);
		}

		await joplin.workspace.onNoteSelectionChange(() => {
			updateToView()
		});

		await joplin.workspace.onNoteChange(() => {
			updateToView()
		});
	},
});
