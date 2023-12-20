import { Draggable } from "@hello-pangea/dnd"

interface TaskProps {
    task: {
        id: string
        title: string
    };
    index: number
}

export function Task({ task, index }: TaskProps) {
    return(
        <Draggable draggableId={task.id} index={index}> 
            {(provided) => (
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="w-full bg-zinc-300 mb-2 last:mb-0 px-2 py-3 rounded border-[2px] border-zinc-400"
                >
                    <p>{task.title}</p>
                </div>
            )}
        </Draggable>
    )
}