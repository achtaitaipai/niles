import {
	addParamsToUrl,
	getCssVariableName,
	modernFontStack,
	parseUrl,
} from '../../lib'
import { Section } from '../'
import { z } from 'zod'

export type FontParams = {
	/**Fonts names */
	fontsKeys: string[]
	/**Fonts values */
	fontsValues: string[]
	/**Fonts options */
	fontsOptions: Record<string, string>
	/** Css prefix for fonts variables */
	fontCssPrefix: string
}

const defaultFontParams = {
	fontCssPrefix: 'font',
	fontsKeys: [],
	fontsValues: [],
	fontsOptions: modernFontStack,
}

const urlSchema = z.object({
	f: z.array(z.coerce.number()).optional(),
})

type UrlParams = z.infer<typeof urlSchema>

export const fontSection: Section<FontParams> = {
	title: 'Fonts',
	defaultParams: defaultFontParams,
	gerUrlParams: (query, options) => {
		const urlParams = parseUrl(query, urlSchema).f
		const fontsOptions = Object.values(
			options.fontsOptions ?? defaultFontParams.fontsOptions,
		)
		if (!urlParams) return {}
		return {
			fontsValues: urlParams.map((i) => fontsOptions[i] ?? ''),
		}
	},
	addControls: (params, page) => {
		if (
			!page ||
			params.fontsKeys.length === 0 ||
			params.fontsValues.length === 0
		)
			return
		for (let index = 0; index < params.fontsKeys.length; index++) {
			const key = params.fontsKeys[index]
			page.addBinding(params.fontsValues, index, {
				label: key,
				options: params.fontsOptions,
			})
		}
	},
	getVariables: (params) => {
		const fonts: Record<string, string> = {}
		for (let index = 0; index < params.fontsKeys.length; index++) {
			const key = params.fontsKeys[index]
			const value = params.fontsValues[index]
			if (key && value)
				fonts[getCssVariableName(params.fontCssPrefix, key)] = value
		}
		return fonts
	},
	getUrl: (params) => {
		const options = Object.values(params.fontsOptions)
		const urlParams: UrlParams = {
			f: params.fontsValues.map((val) =>
				options.findIndex((option) => option === val),
			),
		}
		return addParamsToUrl(urlParams)
	},
}
