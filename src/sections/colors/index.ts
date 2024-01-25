import { addParamsToUrl, getCssVariableName, parseUrl } from '../../lib'
import { Section } from '../'
import { z } from 'zod'

export type ColorParams = {
	/**Colors names */
	colorsKeys: string[]
	/**Colors values in hexFormat */
	colorsValues: string[]
	/** Css prefix for colors variables */
	colorCssPrefix: string
}

const defaultColorsParams = {
	colorCssPrefix: 'clr',
	colorsKeys: [],
	colorsValues: [],
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
