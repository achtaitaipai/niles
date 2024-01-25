import { Pane } from 'tweakpane'
import { getCss, updateCssProperties, copyToClipBoard } from './lib'
import { colorSection, fontSection, utopiaSection } from './sections/index.js'
import type { ColorParams, FontParams, UtopiaParams } from './sections/index.js'

type Params = FontParams & ColorParams & UtopiaParams

export const start = (options: Partial<Params>) => {
	const sections = [utopiaSection, colorSection, fontSection]

	//Apply defaults params
	const defaultParams = sections.reduce(
		(prev, current) => Object.assign({}, prev, current.defaultParams),
		{},
	) as Params
	const urlParams = sections.reduce(
		(prev, current) =>
			Object.assign({}, prev, current.gerUrlParams(location.search, options)),
		{},
	) as Params
	const params = Object.assign({}, defaultParams, options, urlParams)

	// Create Controls
	const inspector = new Pane({ title: 'Theme inspector' })
	const tab = inspector.addTab({
		pages: sections.map((el) => ({ title: el.title })),
	})
	sections.forEach((section, index) => {
		section.addControls(params, tab.pages[index])
	})
	const copyCssBtn = inspector.addButton({ title: 'copy Css' })
	const copyParamsBtn = inspector.addButton({ title: 'copy Params' })

	// Events
	const getCssVariables = () =>
		sections.reduce(
			(acc, section) => Object.assign({}, acc, section.getVariables(params)),
			{},
		)
	const updateCss = () => updateCssProperties(getCssVariables())
	const copyCss = () => copyToClipBoard(getCss(getCssVariables()))
	const copySettings = () => copyToClipBoard(JSON.stringify(params))
	const getUrl = () =>
		sections
			.reduce<
				string[]
			>((prev, section) => (section.getUrl ? [...prev, section.getUrl(params)] : prev), [])
			.join('&')
	const updateUrl = () => history.pushState(null, '', getUrl())

	const update = () => {
		updateCss()
		updateUrl()
	}

	inspector.on('change', update)
	copyCssBtn.on('click', copyCss)
	copyParamsBtn.on('click', copySettings)

	update()
}

export { modernFontStack } from './lib'
