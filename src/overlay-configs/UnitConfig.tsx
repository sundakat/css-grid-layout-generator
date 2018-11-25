import { Label, NumericInput, Switch } from '@blueprintjs/core'
import { Atom } from '@grammarly/focal'
import * as React from 'react'
import { IUnit } from '../_generic/types/common'
import { MapElement } from '../_generic/ui/MapElement'
import { ShowIf } from '../_generic/ui/ShowIf'
import { GridUnitSize } from './GridUnitSize'
import { actionsGrid } from '../_generic/actions'
import { Btn } from '../_generic/ui/Btn'
import { HLLeave, HLAddRow, HLAddCol, HLRemoveRow, HLRemoveCol } from '../grid/Highlighter'
const $ = require('../_generic/ui/Overlay/style.scss')

type TProps = {
	unit$: Atom<IUnit>
	row?: true
	start: number
	end: number
}

export const UnitConfig = ({ unit$, row, start, end }: TProps) => {
	const value$ = unit$.lens('value')
	const min$ = unit$.lens('min')
	const max$ = unit$.lens('max')
	const minmax$ = unit$.lens('minmax')
	const repeat$ = unit$.lens('repeat')
	const addBefore = row ? actionsGrid.addBeforeRow : actionsGrid.addBeforeCol
	const addAfter = row ? actionsGrid.addAfterRow : actionsGrid.addAfterCol
	const remove = row ? actionsGrid.removeRow : actionsGrid.removeCol
	const HLAdd = row ? HLAddRow : HLAddCol
	const HLRemove = row ? HLRemoveRow : HLRemoveCol
	return (
		<div
			style={{
				width: 'max-content',
			}}
		>
			<div className={$.group}>
				<div className={$.btnPanel}>
					<Btn
						ico={row ? 'addBeforeRow' : 'addBeforeCol'}
						transparent
						onMouseOver={HLAdd(start)}
						onMouseOut={HLLeave}
						onClick={addBefore(unit$)}
					/>
					<Btn
						ico={row ? 'addAfterRow' : 'addAfterCol'}
						transparent
						onMouseOver={HLAdd(end)}
						onMouseOut={HLLeave}
						onClick={addAfter(unit$)}
					/>
					<Btn
						ico={row ? 'removeRow' : 'removeCol'}
						transparent
						onMouseOver={HLRemove({ start, end })}
						onMouseOut={HLLeave}
						onClick={remove(unit$)}
					/>
				</div>
			</div>
			<div className={$.space} />
			<div className={$.group}>
				<ShowIf value={minmax$} eq={false}>
					{() => (
						<>
							<Label>Size</Label>
							<GridUnitSize v$={value$} />
						</>
					)}
				</ShowIf>
				<ShowIf value={minmax$} eq={true}>
					{() => (
						<>
							<Label>Min Size</Label>
							<GridUnitSize v$={min$} />
							<div className={$.space} />
							<Label>Max Size</Label>
							<GridUnitSize v$={max$} />
						</>
					)}
				</ShowIf>
				<div className={$.space} />
				<MapElement stream={minmax$}>
					{(isMinmax) => (
						<Switch
							checked={isMinmax}
							label="minmax()"
							onChange={(event) => {
								const v = (event.target as HTMLInputElement).checked
								minmax$.set(v)
							}}
						/>
					)}
				</MapElement>
			</div>
			<div className={$.space} />
			<MapElement stream={repeat$}>
				{(v) => {
					const isActive = v > 1
					return (
						<div className={$.group}>
							{isActive && (
								<>
									<NumericInput
										buttonPosition="left"
										min={0}
										majorStepSize={1}
										minorStepSize={1}
										value={v}
										onValueChange={(nextNum) => repeat$.set(nextNum > 1 ? nextNum : 0)}
										selectAllOnFocus={true}
										clampValueOnBlur={true}
										style={{ width: '2em' }}
									/>
									<div className={$.space} />
								</>
							)}
							<Switch
								checked={isActive}
								label="repeat()"
								onChange={(event) => {
									const val = (event.target as HTMLInputElement).checked
									repeat$.set(val ? 2 : 0)
								}}
							/>
						</div>
					)
				}}
			</MapElement>
		</div>
	)
}
