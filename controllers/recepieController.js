const userModel = require("../models/userModel");
const recepieModel = require("../models/recepieModel");
const { default: mongoose } = require("mongoose");

exports.getAllRecepieController = async (req, res) => {
  try {
    const recepieBlogs = await recepieModel.find({}).populate("user");
    if (!recepieBlogs) {
      return res.status(200).send({
        message: "No recpie Found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      recpieBlogCount: recepieBlogs.length,
      message: "All Blogs lists",
      recepieBlogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Getting recepieBlogs",
      error,
    });
  }
};


exports.createRecepieController = async (req, res) => {
  try {
    const { title, ingredients, image, user } = req.body;

    //validation
    if (!title || !ingredients || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);

    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newRecepieBlog = new recepieModel({
      title,
      ingredients,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newRecepieBlog.save({ session });
    exisitingUser.recepieBlogs.push(newRecepieBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newRecepieBlog.save();
    return res.status(201).send({
      success: true,
      message: "recepieBlog Created!",
      newRecepieBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creting FoodRecpie",
      error,
    });
  }
};


exports.updateRecepieController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, image } = req.body;
    const recepieBlog = await recepieModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      recepieBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};


exports.getSingleRecepieController = async (req, res) => {
  try {
    const { id } = req.params;
    const recepieBlog = await recepieModel.findById(id);
    if (!recepieBlog) {
      return res.status(404).send({
        success: false,
        message: "recepie not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single recepieBlog",
      recepieBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single recepieBlog",
      error,
    });
  }
};


exports.deleteRecepieController = async (req, res) => {
  try {
    const recepieBlog = await recepieModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    await recepieBlog.user.recepieBlogs.pull(recepieBlog);
    await recepieBlog.user.save();
    return res.status(200).send({
      message: "Recepie Deleted!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};


exports.userRecepieController = async (req, res) => {
  try {
    const userRecepieBlog = await userModel.findById(req.params.id).populate("recepieBlogs");
    if (!userRecepieBlog) {
      return res.status(404).send({
        success: false,
        message: "RecepieBlogs not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userRecepieBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in userRecepieBlog",
      error,
    });
  }
};
