import Review from "../models/review.js";

export async function addReview(req, res) {
    if (req.user == null) {
        return res.status(401).json({
            message: "Please login and try again"
        });
    }

    const { rating, comment } = req.body;

    const existingReview = await Review.findOne({ email: req.user.email });
    if (existingReview) {
        return res.status(400).json({ error: "You have already submitted a review." });
    }

    const newReview = new Review({
        name: req.user.firstName + " " + req.user.lastName,
        profilePicture: req.user.profilePicture,
        email: req.user.email,
        rating,
        comment,
        isApproved: false
    });

    try {
        await newReview.save();
        res.json({ message: "Review added successfully. Awaiting admin approval." });
    } catch (err) {
        console.error("Error saving review:", err);
        res.status(500).json({ error: "Review addition failed", err });
    }
}


export async function getReviews(req, res){

    const user = req.user;

    try{

        if(user.role == "admin"){
           const reviews = await Review.find()
           res.json(reviews);
        }else{
            const reviews = await Review.find({isApproved : true})
            res.json(reviews)
        }
    }catch{
        res.status(500).json({error : "Failed to get review"})
    }
}


export function deleteReview(req, res){
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if(req.user.role == "admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.json({message : "Review deleted successfully"})
        }).catch(()=>{
            res.status(500).json({
                error : "Review deletion failed"
            })
        })

        return
    }
    
    if (req.user.role == "customer") {
        if (req.user.email == email) {
          Review.deleteOne({ email: email })
            .then(() => {
              res.json({ message: "Review deleted successfully" });
            })
            .catch(() => {
              res.status(500).json({ error: "Review deletion failed" });
            })
        } else {
          res.status(403).json({ message: "You are not authorized to perform this action" });
        }
      }
}

export function approveReview(req, res){
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({message : "Please login and try again"})
        return
    }

    if(req.user.role == "admin"){
        Review.updateOne(
            {
                email : email,
            }
            ,{
                isApproved : true,
            }
        ).then(()=>{
            res.json({message : "Review approved successfully"})
        }).catch(()=>{
            res.status(500).json({error : "Review approval failed"})
        })
    }else{
        res.status(403).json({message : "You are not an admin, Only admins can approve reviews"})
    }
}

