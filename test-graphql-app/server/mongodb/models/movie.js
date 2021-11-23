const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 影片信息
const MovieSchema = new Schema({
  name: {               // 影片名称
    type: String,
    required: true,
  },
  years: Number,        // 上映年代
  director: String,     // 导演
  poster: String,       // 海报地址
  category: [String],   // 影片类型
  comments: [           // 影评
    {
      author: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
});

module.exports = new mongoose.model('movie', MovieSchema);
