import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 24,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 6,
    max: 24,
  },
  picture: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;
