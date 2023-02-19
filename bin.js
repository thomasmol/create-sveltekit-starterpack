#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { bold, cyan, gray, green, yellow } from 'kleur/colors';
import prompts from 'prompts';
import { create } from './index.js';
import { dist } from './utils.js';

const disclaimer = `
${bold(yellow('Welcome to SvelteKit Starterpack!'))}
`;

const { version } = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf-8'));

async function main() {
	console.log(gray(`\ncreate-sveltekit-starterpack version ${version}`));
	console.log(disclaimer);

	let cwd = process.argv[2] || '.';

	if (cwd === '.') {
		const opts = await prompts([
			{
				type: 'text',
				name: 'dir',
				message: 'Where should we create your project?\n  (leave blank to use current directory)'
			}
		]);

		if (opts.dir) {
			cwd = opts.dir;
		}
	}

  if (fs.existsSync(cwd)) {
		if (fs.readdirSync(cwd).length > 0) {
			const response = await prompts({
				type: 'confirm',
				name: 'value',
				message: 'Directory not empty. Continue?',
				initial: false
			});

			if (!response.value) {
				process.exit(1);
			}
		}
	}
const options = /** @type {import('./types/internal').Options} */ (
		await prompts(
			[
				{
					type: 'select',
					name: 'template',
					message: 'Which Svelte app template?',
					choices: fs.readdirSync(dist('templates')).map((dir) => {
						const meta_file = dist(`templates/${dir}/meta.json`);
						const { title, description } = JSON.parse(fs.readFileSync(meta_file, 'utf8'));

						return {
							title,
							description,
							value: dir
						};
					})
				},
				{
					type: 'toggle',
					name: 'tailwindcss',
					message: 'Add TailwindCSS CSS framework?',
					initial: false,
					active: 'Yes',
					inactive: 'No'
				},
				{
					type: 'toggle',
					name: 'openai',
					message: 'Add OpenAI API?',
					initial: false,
					active: 'Yes',
					inactive: 'No'
				}
			],
			{
				onCancel: () => {
					process.exit(1);
				}
			}
		)
	);

	options.name = path.basename(path.resolve(cwd));

	await create(cwd, options);

}

main();