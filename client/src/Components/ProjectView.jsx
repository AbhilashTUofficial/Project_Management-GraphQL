import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../Apollo/projectQueries";
import Client from "./Client";
import { ADD_CLIENT } from "../Apollo/clientMutations";
import { GET_CLIENTS } from "../Apollo/clientQueries";

function ProjectView() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  console.log(data);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (name === "" || email === "" || phone === "") return alert("Please fill all the fields");
    // addClient( name, email, phone);
    // setShowModal(false);
  };

  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: { name: name, email: email, phone: phone },
  //   update(cache, { data: { addClient } }) {
  //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: { clients: clients.concat([addClient]) },
  //     });
  //   },
  // });
  if (error) return <p>Error : Something went wrong</p>;

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <div className="projectViewContainer">
          <div className="container">{data}</div>
          <div className="clientsContainer">
            <h1>Clients</h1>
            <div className="clients">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {loading ? (
              <Client
                client={{ name: "...", id: "...", email: "...", phone: "..." }}
              />
            ) : (
              data.clients.map((client) => <Client client={client} />)
            )} */}
                </tbody>
              </table>
            </div>
            <div className="addClient">
              {/* <button onClick={() => setShowModal(true)}>Add Client</button> */}
            </div>
            {showModal && (
              <div className="modal">
                <div className="modalContent">
                  <form>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </form>
                  <div className="btns">
                    <button className="cls" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className="sub"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ProjectView;
