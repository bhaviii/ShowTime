import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  //console.log(users);
  return res.status(201).json({ users });
};

export const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && name.trim() == " " && !email && !password) {
    return res.status(422).json({ message: "Inavalid Data" });
  }
  let user;
  try {
    user = new User({ name, email, password: bcrypt.hashSync(password) });
    user = await user.save();
  } catch (error) {
    return console.log("EROORRRRR");
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    return res.status(422).json({ message: "Inavalid Data" });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: bcrypt.hashSync(password),
    });
  } catch (error) {
    return console.log("cant find put");
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "updated successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(error);
  }
  //console.log(user);

  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({ message: "Inavalid Data" });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) return res.status(400).json({ message: "User not found" });
  if (!bcrypt.compareSync(password, existingUser.password)) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({ message: "Login Sucessfull" });
};

/*export const Glogin = async (props) => {
  const { name, email } = props.match.params;
  console.log(name);
  console.log(email);
};*/
