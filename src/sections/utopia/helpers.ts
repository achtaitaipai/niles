import { getCssVariableName } from '../../lib'

export const spaceLabel = (index: number) => {
	if (index === 1) return 'm'
	if (index === 2) return 'l'
	if (index === 3) return 'xl'
	if (index > 3) return `${index - 2}xl`
	if (index === -1) return 'xs'
	if (index < -1) return `${Math.abs(index)}xs`
	return 's'
}

export const typeScalesOptions = {
	'minor second (1.067)': 1.067,
	'major second (1.2)': 1.2,
	'minor third (1.25)': 1.25,
	'major third (1.333)': 1.333,
	'perfect fourth (1.414)': 1.414,
	'augmented fourth (1.5)': 1.5,
	'perfect fifth (1.618)': 1.618,
	'golden ratio (1.667)': 1.667,
	'major sixth (1.778)': 1.778,
	'minor seventh (1.875)': 1.875,
	'octave (2)': 2,
}

const round = (n: number, d = 6) => Math.round(n * 10 ** d) / 10 ** d

const buildClamp = (
	minWidthPx: number,
	maxWidthPx: number,
	minSizePx: number,
	maxSizePx: number,
) => {
	const pixelsPerRem = 16
	const minWidth = round(minWidthPx / pixelsPerRem)
	const maxWidth = round(maxWidthPx / pixelsPerRem)
	const minSize = round(minSizePx / pixelsPerRem)
	const maxSize = round(maxSizePx / pixelsPerRem)
	const slope = (maxSize - minSize) / (maxWidth - minWidth)
	const yAxisIntersection = round(-minWidth * slope + minSize)

	return `clamp(${minSize}rem, ${yAxisIntersection}rem + ${round(
		slope * 100,
	)}vw, ${maxSize}rem)`
}

export const buildTypeSizes = (
	minWidth: number,
	maxWidth: number,
	minFontSize: number,
	maxFontSize: number,
	minTypeScale: number,
	maxTypeScale: number,
	negativeTypeSteps: number,
	positiveTypeSteps: number,
	cssPrefix: string,
): Record<string, string> => {
	const min = -1 * negativeTypeSteps
	const max = positiveTypeSteps
	const variables: Record<string, string> = {}
	for (let i = min; i <= max; i++) {
		const minSize = minFontSize * minTypeScale ** i
		const maxSize = maxFontSize * maxTypeScale ** i
		const value = buildClamp(minWidth, maxWidth, minSize, maxSize)
		variables[getCssVariableName(cssPrefix, i.toString())] = value
	}
	return variables
}

export const buildSpaces = (
	minWidth: number,
	maxWidth: number,
	minFontSize: number,
	maxFontSize: number,
	negativeSpaceSteps: number[],
	positiveSpaceSteps: number[],
	cssPrefix: string,
) => {
	const variables: Record<string, string> = {}
	for (let index = negativeSpaceSteps.length - 1; index >= 0; index--) {
		const label = spaceLabel(-index - 1)
		const multiplier = negativeSpaceSteps[index]
		const minSize = minFontSize * multiplier!
		const maxSize = maxFontSize * multiplier!
		const value = buildClamp(minWidth, maxWidth, minSize, maxSize)
		variables[getCssVariableName(cssPrefix, label)] = value
	}
	for (let index = 0; index < positiveSpaceSteps.length; index++) {
		const label = spaceLabel(index)
		const multiplier = positiveSpaceSteps[index]
		const minSize = minFontSize * multiplier!
		const maxSize = maxFontSize * multiplier!
		const value = buildClamp(minWidth, maxWidth, minSize, maxSize)
		variables[getCssVariableName(cssPrefix, label)] = value
	}
	return variables
}
