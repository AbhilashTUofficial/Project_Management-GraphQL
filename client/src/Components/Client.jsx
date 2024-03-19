import { useMutation } from "@apollo/client";
import React from "react";
import {FaTrash, FaEdit} from 'react-icons/fa';
import { DELETE_CLIENT } from "../Apollo/clientMutations";



function Client({ client }) {

    const [deleteClient] = useMutation(DELETE_CLIENT,{
      variables: {id: client.id},
      // refetchQueries:[{query: GET_CLIENTS}],
      update(cache, {data:{deleteClient}}){
        cache.modify({
          fields: {
            clients(existingClients = [], {readField}){
              return existingClients.filter(
                (clientRef) => client.id !== readField("id", clientRef)
              );
            }
          }
        });
      }
    });

    return (
      <tr key={client.id}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        {
           client.id!=="..." && client.id!=null&&<td className="btns">
           <button className="edi">
               <FaEdit/>
               <div>Edit</div>
           </button>
           <button className="del" onClick={deleteClient}>
               <FaTrash/>
               <div>Delete</div>
           </button>
         </td>
        }
       
  
      </tr>
    );

}

export default Client;
