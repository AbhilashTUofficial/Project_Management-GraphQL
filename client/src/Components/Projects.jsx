import React, { useState } from "react";
import { GET_PROJECTS } from "../Apollo/projectQueries";
import { useMutation, useQuery } from "@apollo/client";
import Project from "./Project";
// import Project from "./Project";
// import { ADD_PROJECT } from "../Apollo/projectMutations";

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [showModal, setShowModal] = useState(false);
  // input states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");


  // const [addProject] = useMutation(ADD_PROJECT, {
  //   variables: { name: name, description: description },
  //   update(cache, { data: { addProject } }) {
  //     const { projects } = cache.readQuery({ query: GET_PROJECTS });
  //     cache.writeQuery({
  //       query: GET_PROJECTS,
  //       data: { projects: projects.concat([addProject]) },
  //     });
  //   },
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "")
      return alert("Please fill all the fields");
    // addProject(name, description);
    setShowModal(false);
  };

  if (error) return <p>Error : Something went wrong</p>;

  return (
    <div className="projectsContainer">
      <h1>Projects</h1>
      <div className="projects">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Project
                project={{ name: "...", id: "...", description: "..." }}
              />
            ) : (
              data.projects.map((project) => <Project project={project} />)
            )}
          </tbody>
        </table>
      </div>
      <div className="addProject">
        <button onClick={() => setShowModal(true)}>Add Project</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <form>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
            <div className="btns">
              <button className="cls" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="sub" type="submit" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
