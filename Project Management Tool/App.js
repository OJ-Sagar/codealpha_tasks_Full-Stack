import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
    };

    const addProject = async () => {
        const response = await axios.post('http://localhost:5000/api/projects', {
            name: projectName,
            tasks: [],
        });
        setProjects([...projects, response.data]);
        setProjectName('');
    };

    return (
        <div>
            <h1>Project Management Tool</h1>
            <div>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button onClick={addProject}>Add Project</button>
            </div>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h2>{project.name}</h2>
                        <ul>
                            {project.tasks.map((task, index) => (
                                <li key={index}>
                                    <p>{task.name}</p>
                                    <p>Assigned to: {task.assignedTo}</p>
                                    <p>Comments: {task.comments.join(', ')}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;