



const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here
usersRouter.get("/courses/get",async(req, res)=>{
    await Course.find()
    .then((resp)=>{
        res.status(200).json(resp)
    })
    .catch(()=>{
        res.status(400)
    })
})

usersRouter.post("/courses/enroll/:id",(req, res)=>{
    const id = req.params.id
     Course.findById(id)
     .then((course)=>{
        if(course.isApplied=== true){
            res.status(403).json({
                error:"You have already applied for this course"
            })
        }
        else{
            course.isApplied = true
            course.save().then(()=>{
                res.status(200).json({
                    message:"You have successfully enrolled fo this course "
                })
            })
        }
     })

    
})


usersRouter.delete("/courses/drop/:id", (req, res)=>{
    Course.findById(req.params.id).then((course)=>{
        if(course.isApplied === true){
            course.isApplied = false
            course.save()
            .then(()=>{
                res.status(200).json({
                    message: "You have dropped the course"
                })
            })
        }else{
            res.ststus(403).json({
                error:"You have not enrolled for this course"
            })
        }
    })
})

usersRouter.patch("/courses/rating/:id", (req, res)=>{
    Course.findById(req.params.id)
    .then((course)=>{
        if(course.isApplied== false){
            res.status(403).json({
                error:"You have not enrolled for this  course"
            })
        }

       else  if(course.isRated === true){
            res.status(403).json({
                error:"You have already rated this course"
            })
        }else {
            var newRating = parseInt(req.body.rating)
            var oldnoOfRatings = course.noOfRatings;
            var makeRating = ((course.rating*oldnoOfRatings)+ newRating)/(oldnoOfRatings+ 1)
            course.rating = makeRating.toFixed(1);
            course.save().then(()=>{
                res.status(200).json({
                    message: "You have rated this course "
                })
            })
            
        }
    })
    .catch((err)=>{
        res.status(400)
        console.log(err)
    })
})
module.exports = usersRouter;
