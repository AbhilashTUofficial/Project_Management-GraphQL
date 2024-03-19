import {gql} from '@apollo/client';

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!) {
        addProject(name: $name, description: $description){
            id,
            name,
            description,
            status
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id){
            id,
            name,
            description,
            status
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String!, $status: String!) {
        updateProject(id: $id, name: $name, description: $description, status: $status){
            id,
            name,
            description,
            status
        }
    }
`;

export {DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT};