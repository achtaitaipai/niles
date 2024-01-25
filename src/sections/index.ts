import { TabPageApi } from 'tweakpane'

export type Section<T extends Record<string, any>> = {
	title: string
	defaultParams: T
	gerUrlParams: (locationSeach: string, options: Partial<T>) => Partial<T>
	addControls: (params: T, page: TabPageApi | undefined) => void
	getVariables: (params: T) => Record<string, string>
	getUrl?: (params: T) => string
}

export * from './utopia'
export * from './fonts'
export * from './colors'
