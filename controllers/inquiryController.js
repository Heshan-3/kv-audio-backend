import Inquiry from "../models/inquiry.js";
import { isitAdmin, isItCustomer } from "./userController.js"

export async function addInquiry(req, res) {
  try {
    if (!isItCustomer(req)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!req.user) {
      console.log("No user attached");
      return res.status(401).json({ message: "User not found in request" });
    }

    const { message, date } = req.body;

    if (!message || !date) {
      return res.status(400).json({ message: "Missing message or date" });
    }

    
    const phone = req.user?.phone || req.body.phone;
    const email = req.user?.email || req.body.email;

    if (!phone || !email) {
      return res.status(400).json({ message: "Missing user phone/email" });
    }

    const latestInquiry = await Inquiry.findOne().sort({ id: -1 });
    const id = latestInquiry ? latestInquiry.id + 1 : 1;

    const newInquiry = new Inquiry({
      id,
      email,
      phone,
      message,
      date,
    });

    const saved = await newInquiry.save();

    res.status(200).json({
      message: "Inquiry added successfully",
      id: saved.id,
    });
  } catch (e) {
    console.error("Add Inquiry Error:", e);
    res.status(500).json({ message: "Failed to add inquiry" });
  }
}

//
export async function getInquiries(req,res){
  try{

    if(isItCustomer(req)){
      const inquiries = await Inquiry.find({email:req.user.email});
      res.json(inquiries);
      return;
    }else if(isitAdmin(req)){
      const inquiries = await Inquiry.find();
      res.json(inquiries);
      return;
    }else{
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return;
    }

  }catch(e){
    res.status(500).json({
      message : "Failed to get inquiries"
    })
  }
}

export async function deleteInquiry(req,res){
  try{
    if(isitAdmin(req)){
      const id = req.params.id;

      await Inquiry.deleteOne({id:id})
      res.json({
        message : "Inquiry deleted successfully"
      })
      return
    }else if(isItCustomer(req)){
      const id = req.params.id;

      const inquiry = await Inquiry.findOne({id:id});
      if(inquiry == null){
        res.status(404).json({
          message : "Inquiry not found"
        })
        return;
      }else{
        if(inquiry.email == req.user.email){
          await Inquiry.deleteOne({id:id})
          res.json({
            message : "Inquiry deleted successfully"
          })
          return;
        }else{
          res.status(403).json({
            message : "You are not authorized to perform this action"
          })
          return
        }
      }
    }else{
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return
    }

  }catch(e){
    res.status(500).json({
      message : "Failed to delete inquiry"
    })
  }
}

export async function updateInquiry(req, res) {
  try {
    const id = req.params.id;

    if (isitAdmin(req)) {
      await Inquiry.updateOne({ id }, { isResolved: true });
      return res.json({
        message: "Inquiry updated successfully",
      });
    }

    if (isItCustomer(req)) {
      const data = req.body;
      const inquiry = await Inquiry.findOne({ id });

      if (!inquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }

      if (inquiry.email !== req.user.email) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await Inquiry.updateOne({ id }, { message: data.message });
      return res.json({ message: "Inquiry updated successfully" });
    }

    return res.status(403).json({ message: "Unauthorized" });
  } catch (e) {
    console.error("Update Inquiry Error:", e);
    return res.status(500).json({ message: "Failed to update inquiry" });
  }
}
