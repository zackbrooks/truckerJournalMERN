const Comp = require("../models/Comp");

exports.createComp = async (req, res) => {
  try {
    await Comp.create({
      name: req.body.compInfo.name,
      userId: "631bb8fbaee3dafac6fea6e1",
      // userId: req.body.id,
      location: req.body.compInfo.location,
      phoneNumber: req.body.compInfo.phoneNumber,
      rating: req.body.compInfo.rating,
      routing: req.body.compInfo.routing,
      notes: req.body.compInfo.notes,
      email: req.body.compInfo.email,
    });
    console.log("Company has been added!");
    res.json({ message: "Company created" });
  } catch (err) {
    console.log(err);
  }
};

exports.getComps = async (req, res) => {
  try {
    const allComps = await Comp.find({ userId: "631bb8fbaee3dafac6fea6e1" });
    // const allComps = await Comp.find({ userId: req.query.userId });
    res.json({ message: "all comps", allComps });
  } catch (err) {
    console.log(err);
  }
};

exports.getComp = async (req, res) => {
  try {
    const comp = await Comp.findById(req.params.id);
    res.json(comp);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCompany = async (req, res) => {
  console.log("this the params", req.body.companyId);
  try {
    await Comp.findOneAndDelete({ _id: req.body.companyId });
    console.log("Deleted Company");
    res.status(201).json({ message: "Deleted It" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateComp = async (req, res) => {
  try {
    console.log(req.params.id);
    await Comp.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          userId: "631bb8fbaee3dafac6fea6e1",
          // userId: req.body.id,
          location: req.body.location,
          phoneNumber: req.body.phoneNumber,
          rating: req.body.rating,
          routing: req.body.routing,
          notes: req.body.notes,
          email: req.body.email,
        },
      }
    );
    const comp = await Comp.findById(req.params.id);
    res.json({ message: "comp updated" });
  } catch (err) {
    console.log(err);
  }
};
