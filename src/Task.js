export const Task = (props) => {
	return (
		<li className="task">
			<label style={{ color: props.completed && "darkgreen" }}>
				{props.taskName}
			</label>
			<button
				onClick={() => {
					props.completeTask(props.id);
				}}
			>
				Complete
			</button>
			<button
				onClick={() => {
					props.editTask(props.id);
				}}
			>
				Edit
			</button>
			<button
				onClick={() => {
					props.deleteTask(props.id);
				}}
			>
				Delete
			</button>
		</li>
	);
};
