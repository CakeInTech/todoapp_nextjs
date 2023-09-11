"use client"

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

type AddTaskProps = {
  fetchTodos: () => void
}

const AddTask = ({fetchTodos}: AddTaskProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({ title: newTaskValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setNewTaskValue("");
        fetchTodos();
        setModalOpen(false);

      } else {
        console.log("Error creating todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex-grow">
      <button
        onClick={() => {setModalOpen(true)}}
        className="btn btn-primary w-full"
      >
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask;
