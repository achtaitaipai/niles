import { z } from 'zod'
import { Section } from '../'
import { addParamsToUrl, parseUrl } from '../../lib'
import { addUtopiaControls } from './controls.js'
import { getUtopiaVariables } from './getVariables.js'

export type UtopiaParams = {
	/**Minimum viewport width in px @default 320 */
	minWidth: number
	/**Maximum viewport width in px @default 1240*/
	maxWidth: number
	/**Base font size for minimum viewport in px @default 18*/
	minFontSize: number
	/**Base font size for maximum viewport in px @default 20*/
	maxFontSize: number
	/**Scale between fontsizes for minimum viewport @default 1.2*/
	minTypeScale: number
	/**Scale between fontsizes for maximum viewport @default 1.25*/
	maxTypeScale: number
	/**Number of negatives types steps @default 2*/
	negativeTypeSteps: number
	/**Number of positives types steps @default 5*/
	positiveTypeSteps: number
	/**Multipliers < 0 for spaces @default [0.75,0.5,0.25]*/
	negativeSpaceSteps: number[]
	/**Multipliers >= 0 for spaces @default [1,1.5,2,3,4,6]*/
	positiveSpaceSteps: number[]
	/** Css prefix for types variables @default 'step'*/
	typeCssPrefix: string
	/** Css prefix for spaces variables @default 'space'*/
	spaceCssPrefix: string
}

const defaultUtopiaParams: UtopiaParams = {
	minWidth: 320,
	maxWidth: 1240,
	minFontSize: 18,
	maxFontSize: 20,
	minTypeScale: 1.2,
	maxTypeScale: 1.25,
	negativeTypeSteps: 2,
	positiveTypeSteps: 5,
	negativeSpaceSteps: [0.75, 0.5, 0.25],
	positiveSpaceSteps: [1, 1.5, 2, 3, 4, 6],
	typeCssPrefix: 'step',
	spaceCssPrefix: 'space',
}

const utopiaUrlSchema = z.object({
	m: z.array(z.coerce.number()).optional(),
	t: z
		.tuple([
			z.coerce.number(), //maxWidth
			z.coerce.number(), //maxFontsize
			z.coerce.number(), //maxTypyeScale
			z.coerce.number(), //minWidth
			z.coerce.number(), //minFontsize
			z.coerce.number(), //minTypyeScale
		])
		.optional(),
})

type UrlUtopia = z.infer<typeof utopiaUrlSchema>

export const utopiaSection: Section<UtopiaParams> = {
	title: 'Utopia',
	gerUrlParams: (query, options) => {
		const urlParams = parseUrl(query, utopiaUrlSchema)
		const spacesMultipliers = urlParams.m
		let negativeSpaceSteps =
			options.negativeSpaceSteps ?? defaultUtopiaParams.negativeSpaceSteps
		let positiveSpaceSteps =
			options.positiveSpaceSteps ?? defaultUtopiaParams.positiveSpaceSteps

		if (spacesMultipliers) {
			negativeSpaceSteps = negativeSpaceSteps.map(
				(el, i) => spacesMultipliers[i] ?? el,
			)
			positiveSpaceSteps = positiveSpaceSteps.map(
				(el, i) => spacesMultipliers[i + negativeSpaceSteps.length] ?? el,
			)
		}

		const typeParams = urlParams.t
		let maxWidth = options.maxWidth ?? defaultUtopiaParams.maxWidth
		let maxFontSize = options.maxFontSize ?? defaultUtopiaParams.maxFontSize
		let maxTypeScale = options.maxTypeScale ?? defaultUtopiaParams.maxTypeScale
		let minWidth = options.minWidth ?? defaultUtopiaParams.minWidth
		let minFontSize = options.minFontSize ?? defaultUtopiaParams.minFontSize
		let minTypeScale = options.minTypeScale ?? defaultUtopiaParams.minTypeScale
		if (typeParams)
			[
				maxWidth,
				maxFontSize,
				maxTypeScale,
				minWidth,
				minFontSize,
				minTypeScale,
			] = typeParams

		return {
			negativeSpaceSteps,
			positiveSpaceSteps,
			maxWidth,
			maxFontSize,
			maxTypeScale,
			minWidth,
			minFontSize,
			minTypeScale,
		}
	},
	defaultParams: defaultUtopiaParams,
	addControls: addUtopiaControls,
	getVariables: getUtopiaVariables,
	getUrl: (params) => {
		const urlParams: UrlUtopia = {
			m: [...params.negativeSpaceSteps, ...params.positiveSpaceSteps],
			t: [
				params.maxWidth,
				params.maxFontSize,
				params.maxTypeScale,
				params.minWidth,
				params.minFontSize,
				params.minTypeScale,
			],
		}
		return addParamsToUrl(urlParams)
	},
}
