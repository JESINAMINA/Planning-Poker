const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  author:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create collection and add schema
const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
