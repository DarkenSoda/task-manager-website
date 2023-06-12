import "./App.css";
import { useState } from "react";
import { Task } from "./Task";

function App() {
	const [taskList, setList] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTaskID, setCurrentTaskID] = useState(null);

	const addTask = () => {
		if (newTask === "") return;

		const task = {
			id:
				taskList.length === 0
					? 1
					: taskList[taskList.length - 1].id + 1,
			taskName: newTask,
			completed: false,
		};
		setList([...taskList, task]);

		document.getElementById("textInput").value = "";
		setNewTask("");
	};

	const handleChange = (event) => {
		setNewTask(event.target.value);
	};

	const completeTask = (taskID) => {
		setList(
			taskList.map((task) => {
				return task.id === taskID ? { ...task, completed: true } : task;
			})
		);
	};

	const editTask = (taskID) => {
		setIsEditing(true);
		setCurrentTaskID(taskID);
		document.getElementById("textInput").value = taskList.filter(
			(task) => task.id === taskID
		)[0].taskName;
		setNewTask(document.getElementById("textInput").value);
	};

	const editTaskID = () => {
		if (newTask === "") return cancelEditTask();

		setList(
			taskList.map((task) => {
				return task.id === currentTaskID
					? { ...task, taskName: newTask }
					: task;
			})
		);

		cancelEditTask();
	};

	const cancelEditTask = () => {
		document.getElementById("textInput").value = "";
		setIsEditing(false);
		setCurrentTaskID(null);
		setNewTask("");
	};

	const deleteTask = (taskID) => {
		setList(taskList.filter((task) => task.id !== taskID));
	};

	return (
		<div className="App">
			<div className="taskArea">
				<label className="header" for="textInput">
					Add Your Task Here!
				</label>
				<div className="addTask">
					<input id="textInput" onChange={handleChange} />
					{!isEditing && (
						<button className="PrimaryButton" onClick={addTask}>
							Add Task
						</button>
					)}
					{isEditing && (
						<>
							<button
								className="SecondaryButton"
								onClick={editTaskID}
							>
								Confirm Edit
							</button>
							<button
								className="DeleteButton"
								onClick={cancelEditTask}
							>
								Cancel
							</button>
						</>
					)}
				</div>
			</div>

			<div className="list">
				<label className="header" for="textInput">
					Your Tasks
				</label>
				<div className="slider">
					<ul className="slider-content">
						{taskList.map((task) => {
							return (
								<Task
									id={task.id}
									taskName={task.taskName}
									completed={task.completed}
									completeTask={completeTask}
									editTask={editTask}
									deleteTask={deleteTask}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
