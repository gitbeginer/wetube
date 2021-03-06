import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: String,
  username: { type: String, required: true, unique: true },
  password: { type: String},
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 5);
  }
  //console.log(this.password);
});
userSchema.post('findOneAndUpdate', function(doc) {
  //console.log("sdf", this,doc);
});

const User = mongoose.model("User", userSchema);
export default User;