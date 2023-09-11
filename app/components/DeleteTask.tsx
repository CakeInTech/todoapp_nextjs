import { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "./Modal";

type DeleteTodoProps = {
  todosList: TodosProps;
  getTodos: () => void;
};
const DeleteTask = ({ todosList, getTodos }: DeleteTodoProps) => {
  const [newTodo, setNewTodo] = useState(todosList.title);
  const [todoId, setTodoId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`api/todo/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
      }
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];

  const handleEdit = (id: string) => {
    setTodoId(id);
  };

  const handleTodoUpdate = async ({ id, updatedTodo: updatedTodo }: any) => {
    console.log("id:", id, "updated data:", updatedTodo);

    const res = await fetch(`api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: updatedTodo }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      getTodos();
      setModalOpen(false);
    } else {
      console.log("Error creating todo");
    }
  };

  return (
    <>
      <td className="flex gap-5">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={25}
          onClick={() => {
            setModalOpen(true), handleEdit(todosList.id);
          }}
        />
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form
            onSubmit={(e) => {
              e.preventDefault(),
                handleTodoUpdate({ id: todosList.id, updatedTodo: newTodo });
            }}
          >
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full w-full"
              />
              <button type="submit" className="btn">
                submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash
          cursor="pointer"
          className="text-red-500"
          size={25}
          onClick={() => deleteTodo(todosList.id)}
        />
      </td>
    </>
  );
};

export default DeleteTask;
