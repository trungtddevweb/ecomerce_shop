import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validator: (value) => {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: true,
    validator: (value) => {
      return validator.isByteLength(value, {
        min: 1,
        max: 255,
      });
    },
  },
  picture: {
    type: String,
    required: true,
    default: '',
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
