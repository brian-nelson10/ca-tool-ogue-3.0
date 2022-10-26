const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

const toolSchema = new Schema(
  {
    toolName: {
      type: String,
      required: 'You need to leave a tool!',
      minlength: 1,
      maxlength: 80
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    checkedIn: {
        type: Boolean,
        required: true
    },
    checkedInBy: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'    
        }
    ],
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

toolSchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Tool = model('Tool', toolSchema);

module.exports = Tool;
