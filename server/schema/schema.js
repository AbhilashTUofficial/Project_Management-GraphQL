
// MongoDB Models
const Project = require("../models/project");
const Client = require("../models/client");


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
    },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);},
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find({});
    },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.find((client) => client.id == args.id);
    },
    },
  },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addClient:{
            type: ClientType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        addProject:{
            type: ProjectType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                status: {type: new GraphQLNonNull(GraphQLString)},
                clientId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }
        },
        updateClient: {
          type: ClientType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
          },
          resolve(parent, args) {
            const updateFields = {};
            if (args.name) updateFields.name = args.name;
            if (args.email) updateFields.email = args.email;
            if (args.phone) updateFields.phone = args.phone;
            return Client.findByIdAndUpdate(args.id, updateFields, { new: true });
          },
        },
        updateProject: {
          type: ProjectType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            status: { type: GraphQLString },
            clientId: { type: GraphQLID },
          },
          resolve(parent, args) {
            const updateFields = {};
            if (args.name) updateFields.name = args.name;
            if (args.description) updateFields.description = args.description;
            if (args.status) updateFields.status = args.status;
            if (args.clientId) updateFields.clientId = args.clientId;
            return Project.findByIdAndUpdate(args.id, updateFields, { new: true });
          },
        },
        deleteClient:{
            type: ClientType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            }
        },
        deleteProject:{
            type: ProjectType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Project.findByIdAndRemove(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
