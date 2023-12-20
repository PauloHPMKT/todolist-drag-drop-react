import { useState, FormEvent } from "react"
import { Task } from "./components/Task"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

interface Task {
  id: number
  title: string
}

function App() {
  const [newTask, setNewTask] = useState("") // Update the type of newTask

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Learn React'
    },
    {
      id: '2',
      title: 'Learn TypeScript'
    },
    {
      id: '3',
      title: 'Learn Next.js'
    }
  ])

  function handleAddTask(e: FormEvent<HTMLFormElement>) { // Update the type of the event parameter
    e.preventDefault();

    if (newTask === '') return;

    let newItem = {
      id: `${tasks.length + 1}`,
      title: newTask
    }

    setTasks((allTasks) => [...allTasks, newItem]) // Update the setTasks function
    setNewTask('') // Update the setNewTask function
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0 , removed);

    return result;
  }

  function onDragend(result: any) {
    if (!result.destination) return;
    
    const items = reorder(tasks, result.source.index, result.destination.index);

    setTasks(items);
    localStorage.setItem('tasks', JSON.stringify(items));
  }
 
  return (
    <div className="w-full h-screen flex flex-col items-center px-4 pt-52">
      <h1 className="font-bold text-4xl mb-4">Tarefas</h1>

      <form className="w-full max-w-2xl mb-4 flex" onSubmit={handleAddTask}>
        <input 
          type="text"
          placeholder="Digite uma tarefa"
          className="flex-1 h-10 rounded-md px-2 border"
          value={newTask} // Update the value of newTask
          onChange={e => setNewTask(e.target.value)} // Update the setNewTask function
        />
        <button type="submit" className="bg-blue-500 ml-4 rounded-md px-4 text-white font-medium">
          Add
        </button>
      </form>
      
        
      <section className="bg-zinc-100 p-3 rounded-md w-full max-w-2xl">
        <DragDropContext onDragEnd={onDragend}>
          <Droppable droppableId="tasks" type="list" direction="vertical">{/* vertical or horizontal*/}
            {(provided) => (
              <article
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}

                { provided.placeholder }
              </article>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  )
}

export default App
