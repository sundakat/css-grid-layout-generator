import { lift, F, classes } from '@grammarly/focal'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { actionsItems } from '../../_generic/actions'
import { IItem } from '../../_generic/types/common'
import { Btn } from '../../_generic/ui/Btn'
import { selectedID$ } from '../state'
import $ from './style.scss'

type TProps = {
	index: number
	item: IItem
}

export const Item = lift(({ index, item }: TProps) => {
	const { id, name, isHidden } = item
	const del = actionsItems.del(index)
	const select = () => actionsItems.select(id)
	const activeClass$ = selectedID$.view((sid) => sid === id && $.active)
	const toggleVision = actionsItems.toggleVision(index)
	const onMouseEnter = actionsItems.highlight(name)
	const onMouseLeave = actionsItems.dropHighlight
	return (
		<Draggable draggableId={id} index={index}>
			{(provided, snapshot) => (
				<F.div
					mount={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					{...classes($.item, snapshot.isDragging && $.dragging, activeClass$)}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				>
					<div className={$.vision}>
						<Btn
							ico={isHidden ? 'invisible' : 'visible'}
							icoFill={isHidden ? '#efa666' : '#373644'}
							transparent
							onClick={toggleVision}
						/>
					</div>
					<div className={$.name} onClick={select}>
						{name}
					</div>
					<div className={$.remove}>
						<Btn ico="remove" icoFill="#8d8e9a" transparent onClick={del} />
					</div>
				</F.div>
			)}
		</Draggable>
	)
})
