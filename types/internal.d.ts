// all options other than name or 'null', must also be in type Condition
export type Options = {
	name: string;
	tailwindcss: boolean;
	template: 'default' | 'openai'; // | 'openai' | 'ethers.js';

};

export type File = {
	name: string;
	contents: string;
};

export type Condition =
	| 'default'
	| 'openai'
	| 'tailwindcss';

export type Common = {
	files: Array<{
		name: string;
		include: Condition[];
		exclude: Condition[];
		contents: string;
	}>;
};