export enum Languages {
	IT = 'it',
	EN = 'en',
}

export class BilingualString {
	it: string;
	en: string;
	public get(l: Languages): string {
		if (l === 'it') {
			return this.it;
		}
		return this.en;
	}
	constructor(it: string, en: string) {
		this.it = it;
		this.en = en;
	}
}

export class WebsiteData {
	homepage: {
		name: BilingualString;
		desc: BilingualString;
	};
	volunteers: {
		name: BilingualString;
		desc: BilingualString;
	};

	constructor(
		homepage: { name: BilingualString; desc: BilingualString },
		volunteers: { name: BilingualString; desc: BilingualString }
	) {
		this.homepage = homepage;
		this.volunteers = volunteers;
	}
}

export interface LanguageString {
	it: string;
	en: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Languages {
	export function toNum(language: Languages): number {
		return Languages.values().indexOf(language);
	}

	export function values(): string[] {
		return (Object.values(Languages).filter((value) => typeof value === 'string') as string[]).map((element) => {
			return element.toLowerCase();
		});
	}

	export function languageSwitchPages(url: URL): string[] {
		const path = url.pathname.split('/');
		const langPages: string[] = [];
		for (let index = 0; index < Languages.values().length; index++) {
			path[1] = Languages.values()[index];
			langPages.push(path.join('/'));
		}
		return langPages;
	}
}
