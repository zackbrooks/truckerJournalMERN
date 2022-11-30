const Comp = require("../models/Comp");

exports.createComp = async (req, res) => {
  try {
    await Comp.create({
      name: req.body.compInfo.name,
      userId: req.body.compInfo.id,
      location: req.body.compInfo.location,
      phoneNumber: req.body.compInfo.phoneNumber,
      rating: req.body.compInfo.rating,
      routing: req.body.compInfo.routing,
      notes: req.body.compInfo.notes,
      email: req.body.compInfo.email,
    });

    res.json({ message: "Company created" });
  } catch (err) {
    console.log(err);
  }
};

exports.getComps = async (req, res) => {
  try {
    const allComps = await Comp.find({ userId: req.query.userId });
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
    res.status(201).json({ message: "Deleted Company" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateComp = async (req, res) => {
  try {
    await Comp.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.data.compInfo.name,
          userId: req.body.data.compInfo.id,
          location: req.body.data.compInfo.location,
          phoneNumber: req.body.data.compInfo.phoneNumber,
          rating: req.body.data.compInfo.rating,
          routing: req.body.data.compInfo.routing,
          notes: req.body.data.compInfo.notes,
          email: req.body.data.compInfo.email,
        },
      }
    );
    const comp = await Comp.findById(req.params.id);
    res.json({ message: "comp updated" });
  } catch (err) {
    console.log(err);
  }
};
