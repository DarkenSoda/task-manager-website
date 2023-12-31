import "./App.css";
import { useState } from "react";
import { Task } from "./Task";

function App() {
	const [taskList, setList] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTaskID, setCurrentTaskID] = useState(null);
	const [index, setIndex] = useState(1);

	const sortTaskList = () => {
		setList((prevlist) => {
			const completedtasks = prevlist.filter((task) => task.completed);
			const incompletetasks = prevlist.filter((task) => !task.completed);

			const updatedtasklist = [...incompletetasks, ...completedtasks];
			return updatedtasklist;
		});
	}

	const addTask = () => {
		if (newTask === "") return;

		const task = {
			id: index,
			taskName: newTask,
			completed: false,
		};
		setIndex((previndex) => previndex + 1);
		setList([...taskList, task]);
		sortTaskList();

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
		ToLast(taskID);
	};

	const ToLast = (taskId) => {
		setList((prevlist) => {
			const updatedlist = [...prevlist];
			const completedtaskindex = updatedlist.findIndex(
				(task) => task.id === taskId
			);

			if (completedtaskindex !== -1) {
			  	const completedtask = updatedlist.splice(completedtaskindex, 1)[0];
			  	updatedlist.push(completedtask);
			}

			return updatedlist;
		});
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

	const uncompleteTask = () => {
		setList(
			taskList.map((task) => {
				return task.id === currentTaskID
					? { ...task, completed: false }
					: task;
			})
		);
		sortTaskList();
		cancelEditTask();
	};

	const deleteTask = (taskID) => {
		setList(taskList.filter((task) => task.id !== taskID));
	};

	return (
		<div className="App">
			<div className="taskArea">
				<div>
					<label className="header" for="textInput">
						{isEditing ? (
							<>Edit Your Task!</>
						) : (
							<>Add Your Task Here!</>
						)}
					</label>
					<div className="addTask">
						<input
							id="textInput"
							placeholder="My Task"
							onChange={handleChange}
						/>
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
								<button
									className="UncompleteButton"
									onClick={uncompleteTask}
								>
									Incomplete
								</button>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="list">
				<label className="header">Your Tasks</label>
				<div className="slider">
					<ol className="slider-content">
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
					</ol>
				</div>
			</div>
		</div>
	);
}

export default App;
