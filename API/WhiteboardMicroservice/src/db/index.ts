import { Schema, Model, model } from 'mongoose';

export const WhiteboardSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  audience: {
    type: String,
    required: false,
    trim: true,
  },
  boardState: {
    type: [
      {
        index: Number,
        tile: {
          letters: String,
          color: String,
        },
        deltaPosition: {
          x: Number,
          y: Number,
        },
      },
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Whiteboard: Model<IWhiteboardModel> = model<IWhiteboardModel>(
  'Whiteboard',
  WhiteboardSchema
);

export default Whiteboard;
