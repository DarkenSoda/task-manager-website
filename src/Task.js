export const Task = (props) => {
	
	return (
		<li className="task">
			<label style={{ color: props.completed && "#45b878" }}>
				<span>{props.taskName}</span>
			</label>
			<button
				className="SecondaryButton"
				onClick={() => {
					props.completeTask(props.id);
				}}
			>
				Complete
			</button>
			<button
				className="PrimaryButton"
				onClick={() => {
					props.editTask(props.id);
				}}
			>
				Edit
			</button>
			<button
				className="DeleteButton"
				onClick={() => {
					props.deleteTask(props.id);
				}}
			>
				Delete
			</button>
		</li>
	);
};
