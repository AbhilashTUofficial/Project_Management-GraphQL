import React, { useState } from "react";
import { GET_CLIENTS } from "../Apollo/clientQueries";
import { useMutation, useQuery } from "@apollo/client";
import Client from "./Client";
import { ADD_CLIENT } from "../Apollo/clientMutations";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [showModal, setShowModal] = useState(false);
    // input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name: name, email: email, phone: phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") return alert("Please fill all the fields");
    addClient( name, email, phone);
    setShowModal(false);
  };


  // if (loading) return <Suspense fallback={<p>Loading...</p>} />;
  if (error) return <p>Error : Somthing went wrong</p>;

  return (
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
            {loading ? (
              <Client
                client={{ name: "...", id: "...", email: "...", phone: "..." }}
              />
            ) : (
              data.clients.map((client) => <Client client={client} />)
            )}
          </tbody>
        </table>
      </div>
      <div className="addClient">
        <button onClick={() => setShowModal(true)}>Add Client</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <form>
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
            </form>
            <div className="btns">
              <button className="cls" onClick={() => setShowModal(false)}>Close</button>
              <button className="sub" type="submit" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
