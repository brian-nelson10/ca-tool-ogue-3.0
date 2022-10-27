const { User, Tool } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id})
              .select('-__v -password')
              .populate('tools')
              .populate('checkedInBy');
        
            return userData;
          }
          throw new AuthenticationError('Not Logged In!');
        },
              //get all users
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('checkedInBy')
        .populate('tools');
      },
      //get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('checkedInBy')
        .populate('tools');
      },
      tools: async (parent, { checkedInBy }) => {
        const params = checkedInBy ? { checkedInBy } : {};
        return Tool.find(params).sort({ createdAt: -1 });
      },
      tool: async (parent, { _id }) => {
        return Tool.findOne({ _id });
      }
      },

      Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };       
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);
            return { token, user };
          },
          
    addTool: async (parent, args, context) => {
        if (context.user) {
          const tool = await Tool.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { tools: tool._id } },
            { new: true }
          );
      
          return tool;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addNote: async (parent, { toolId, noteBody }, context) => {
        if (context.user) {
          const updatedTool = await Tool.findOneAndUpdate(
            { _id: toolId },
            { $push: { notes: { noteBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
      
          return updatedTool;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addcheckedInBy: async (parent, { toolId }, context) => {
        if (context.user) {
          const updatedTool = await Tool.findOneAndUpdate(
            { _id: toolId },
            { $push: { tools: { checkedInBy, username: context.user.username } } },
            { new: true }
          ).populate('checkedInBy');
      
          return updatedTool;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }
    }
  };
  
  module.exports = resolvers;

  //make checkedinby checkedTool? 