import { Schema, Model, model } from 'mongoose';

const boardStateSchema = new Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    tile: {
      type: {
        letters: String,
        color: String,
      },
      required: true,
    },
    deltaPosition: {
      type: {
        x: Number,
        y: Number,
      },
      required: true,
    },
  },
  { _id: false }
);

export const WhiteboardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  audience: {
    type: String,
    required: false,
    default: 'none',
    trim: true,
  },
  boardState: {
    type: [boardStateSchema],
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
