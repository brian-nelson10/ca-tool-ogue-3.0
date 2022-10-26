const { User, Tool } = require('../models');


const resolvers = {
    Query: {
      tools: async (parent, { checkedInBy }) => {
        const params = checkedInBy ? { checkedInBy } : {};
        return Tool.find(params).sort({ createdAt: -1 });
      },
      tool: async (parent, { _id }) => {
        return Tool.findOne({ _id });
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
      }
    }
  };
  
  module.exports = resolvers;