import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash, FaEdit, FaBookOpen } from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Project({ project }) {
    return (
        <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>{project.description}</td>
            <td className="btns">
                <button className="edi">
                    <FaEdit />
                    <div>Edit</div>
                </button>
                <button className="del" onClick={()=>{}}>
                    <FaTrash />
                    <div>Delete</div>
                </button>
                <button className="view" onClick={()=>{}}>
                    <FaBookOpen />
                    <Link className='menuItem' to={`/${project.id}`}>View</Link>
                </button>
            </td>
        </tr>
    );
}

export default Project;
  