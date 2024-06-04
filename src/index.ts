import joplin from 'api';
import { isLink } from './utils/links';
import { randomInt } from 'crypto';

joplin.plugins.register({
	onStart: async function() {
		async function updateToView() {
			// const rand = randomInt(1024);
			// const panel = await joplin.views.panels.create(`panel_${rand}`);
			// await joplin.views.panels.setHtml(panel, `<div>Hi ${rand}</div>`)
			// Loop each line
			const note = await joplin.workspace.selectedNote();
			const body = note.body;
			const lines: string[] = body.split('\n');

			lines.forEach(async (line, index) => {
				if (isLink(line)) {
					console.log(`Link Found ${index}`);
					// Replace the existing element, example:
					// <p class="maps-to-line" source-line="4" source-line-end="5"><img src="https://www.youtube.com/watch?v=74y6zWZfQKk" alt="Youtube"></p>\
					const target = document.querySelector(`p[source-line="${index}"]`);
					console.log(target);
				}
			})
		}

		await joplin.workspace.onNoteSelectionChange(() => {
			updateToView()
		});

		await joplin.workspace.onNoteChange(() => {
			updateToView()
		});
	},
});
