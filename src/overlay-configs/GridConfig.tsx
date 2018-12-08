import { Label, Switch, H4 } from '@blueprintjs/core'
import { Atom } from '@grammarly/focal'
import * as React from 'react'
import { IGridSettings } from '../_generic/types/common'
import { MapElement } from '../_generic/ui/MapElement'
import { GridPropSelect } from './GridPropSelect'
import { GridSize } from './GridSize'
import { GridAutoFlow } from './GridAutoFlow'
import $ from '../_generic/ui/Overlay/style.scss'

type TProps = {
	gridSettings$: Atom<IGridSettings>
}

const IAJ_OPTIONS = ['start', 'end', 'center', 'stretch']
const CAJ_OPTIONS = [...IAJ_OPTIONS, 'space-around', 'space-between', 'space-evenly']

export const GridConfig = ({ gridSettings$ }: TProps) => {
	const isInline$ = gridSettings$.lens('isInline')
	const isGrow$ = gridSettings$.lens('isGrow')
	const isGuided$ = gridSettings$.lens('isGuided')
	return (
		<div
			style={{
				width: 'max-content',
			}}
		>
			<div className={$.group}>
				<MapElement stream={isInline$}>
					{(isInline) => (
						<Switch
							checked={isInline}
							label="Inline Grid"
							onChange={(e) => isInline$.set((e.target as HTMLInputElement).checked)}
						/>
					)}
				</MapElement>
				<div className={$.space} />
				<div className={$.split}>
					<div>
						<Label>Container Width</Label>
						<GridSize v$={gridSettings$.lens('width')} withSpecial />
					</div>
					<div>
						<Label>Container Height</Label>
						<GridSize v$={gridSettings$.lens('height')} withSpecial />
					</div>
				</div>
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<div className={$.split}>
					<div>
						<Label>Justify Items</Label>
						<GridPropSelect v$={gridSettings$.lens('justifyItems')} options={IAJ_OPTIONS} />
					</div>
					<div>
						<Label>Align Items</Label>
						<GridPropSelect v$={gridSettings$.lens('alignItems')} options={IAJ_OPTIONS} />
					</div>
				</div>
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<div className={$.split}>
					<div>
						<Label>Justify Content</Label>
						<GridPropSelect v$={gridSettings$.lens('justifyContent')} options={CAJ_OPTIONS} />
					</div>
					<div>
						<Label>Align Content</Label>
						<GridPropSelect v$={gridSettings$.lens('alignContent')} options={CAJ_OPTIONS} />
					</div>
				</div>
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<div className={$.split}>
					<div>
						<Label>Column Gap</Label>
						<GridSize v$={gridSettings$.lens('colGap')} />
					</div>
					<div>
						<Label>Row Gap</Label>
						<GridSize v$={gridSettings$.lens('rowGap')} />
					</div>
				</div>
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<Label>Auto Flow</Label>
				<GridAutoFlow v$={gridSettings$.lens('autoFlow')} />
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<H4 style={{ marginBottom: '1em' }}>Preview Options</H4>
				<div className={$.split}>
					<div>
						<MapElement stream={isGrow$}>
							{(isGrow) => (
								<Switch
									checked={isGrow}
									label="Container Flex Grow"
									onChange={(e) => isGrow$.set((e.target as HTMLInputElement).checked)}
								/>
							)}
						</MapElement>
					</div>
					<div>
						<MapElement stream={isGuided$}>
							{(isGuided) => (
								<Switch
									checked={isGuided}
									label="Render Guides As Items"
									onChange={(e) => isGuided$.set((e.target as HTMLInputElement).checked)}
								/>
							)}
						</MapElement>
					</div>
				</div>
			</div>
		</div>
	)
}
