import { TabPageApi } from 'tweakpane'
import { spaceLabel, typeScalesOptions } from './helpers.js'
import { UtopiaParams } from './index.js'

export const addUtopiaControls = (
	params: UtopiaParams,
	page: TabPageApi | undefined,
) => {
	if (!page) return

	const typeFolder = page.addFolder({ title: 'Type' })
	const spaceFolder = page.addFolder({ title: 'Space', expanded: false })
	const minFolder = typeFolder.addFolder({ title: 'Minimum viewport' })
	minFolder.addBinding(params, 'minWidth', {
		min: 300,
		max: 2000,
		step: 1,
		label: 'Width',
	})
	minFolder.addBinding(params, 'minFontSize', {
		min: 12,
		max: 50,
		step: 1,
		label: 'Font size',
	})
	minFolder.addBinding(params, 'minTypeScale', {
		options: typeScalesOptions,
		label: 'Scale',
	})

	const maxFolder = typeFolder.addFolder({ title: 'Maximum viewport' })
	maxFolder.addBinding(params, 'maxWidth', {
		min: 300,
		max: 2000,
		step: 1,
		label: 'Width',
	})
	maxFolder.addBinding(params, 'maxFontSize', {
		min: 12,
		max: 50,
		step: 1,
		label: 'Font size',
	})
	maxFolder.addBinding(params, 'maxTypeScale', {
		options: typeScalesOptions,
		label: 'Scale',
	})
	for (let index = params.negativeSpaceSteps.length - 1; index >= 0; index--) {
		spaceFolder.addBinding(params.negativeSpaceSteps, index, {
			label: spaceLabel(-index - 1),
			min: 0.05,
			max: 20,
			step: 0.05,
		})
	}
	for (let index = 0; index < params.positiveSpaceSteps.length; index++) {
		spaceFolder.addBinding(params.positiveSpaceSteps, index, {
			label: spaceLabel(index),
			min: 0.05,
			max: 20,
			step: 0.05,
		})
	}
}
