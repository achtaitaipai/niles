import { addParamsToUrl, getCssVariableName, parseUrl } from '../../lib'
import { Section } from '../'
import { z } from 'zod'

export type ColorParams = {
	/**Colors names @default ['surface','shade','text']*/
	colorsKeys: string[]
	/**Colors values in hexFormat @default ['#f1f3f5','#868e96','#343a40']*/
	colorsValues: string[]
	/** Css prefix for colors variables @default 'clr'*/
	colorCssPrefix: string
}

const defaultColorsParams = {
	colorCssPrefix: 'clr',
	colorsKeys: ['surface', 'shade', 'text'],
	colorsValues: ['#f1f3f5', '#868e96', '#343a40'],
}

const urlSchema = z.object({
	c: z.array(z.string()).optional(),
})

type UrlParams = z.infer<typeof urlSchema>

export const colorSection: Section<ColorParams> = {
	title: 'Colors',
	defaultParams: defaultColorsParams,
	gerUrlParams: (query) => {
		const urlParams = parseUrl(query, urlSchema)
		const colorsValues = urlParams.c
		if (colorsValues)
			return {
				colorsValues,
			}
		return {}
	},
	addControls: (params, page) => {
		if (
			!page ||
			params.colorsKeys.length === 0 ||
			params.colorsValues.length === 0
		)
			return
		for (let index = 0; index < params.colorsKeys.length; index++) {
			const key = params.colorsKeys[index]
			const value = params.colorsValues[index]
			if (key && value)
				page.addBinding(params.colorsValues, index, {
					label: key,
				})
		}
	},
	getVariables: (params) => {
		const colors: Record<string, string> = {}
		for (let index = 0; index < params.colorsKeys.length; index++) {
			const key = params.colorsKeys[index]
			const value = params.colorsValues[index]
			if (key && value)
				colors[getCssVariableName(params.colorCssPrefix, key)] = value
		}
		return colors
	},
	getUrl: (params) => {
		const urlParams: UrlParams = {
			c: params.colorsValues,
		}
		return addParamsToUrl(urlParams)
	},
}
