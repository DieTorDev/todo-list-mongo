import { useEffect, useState } from 'react';
import { deleteData, getData, patchData, postData } from '../../utils/api';
import { URLS } from '../../constants/urls';

const MainContainer = () => {
	const [tasks, setTasks] = useState();
	const [newTask, setNewTask] = useState({
		task: '',
		completed: false
	});

	useEffect(() => {
		getTasks(setTasks);
	}, []);

	console.log(tasks);

	if (tasks)
		return (
			<main>
				<form onSubmit={e => handleSubmit(e, newTask, setTasks)}>
					<input
						onChange={({ target }) =>
							setNewTask({ ...newTask, task: target.value })
						}
						type='text'
					/>
				</form>
				<section>
					{tasks.map(task => (
						<div key={task._id}>
							<div>
								<p>{task.task}</p>
								<input
									onChange={() => handleCompleted(task, setTasks)}
									type='checkbox'
									defaultChecked={task.completed}
								/>
								<button onClick={() => handleDelete(task._id, setTasks)}>
									DELETE
								</button>
							</div>
						</div>
					))}
				</section>
			</main>
		);
};

const getTasks = async setTasks => {
	try {
		const data = await getData(URLS.USER_API);
		setTasks(data);
	} catch (err) {
		console.error(err);
	}
};

const handleSubmit = async (event, newTask, setTasks) => {
	event.preventDefault();

	try {
		const data = await postData(URLS.USER_API, newTask);
		setTasks(data);
	} catch (err) {
		console.error(err);
	}
};

const handleCompleted = async (task, setTasks) => {
	console.log(task);
	try {
		const data = await patchData(URLS.USER_API + task._id, {
			...task,
			completed: !task.completed
		});
		setTasks(data);
	} catch (err) {
		console.error(err);
	}
};

const handleDelete = async (id, setTasks) => {
	console.log(id);
	try {
		const data = await deleteData(URLS.USER_API + id);
		setTasks(data);
	} catch (err) {
		console.error(err);
	}
};

export default MainContainer;
