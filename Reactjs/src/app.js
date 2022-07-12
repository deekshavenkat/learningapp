
/* new file -- app.js */

import React, { Component } from 'react';
import "./App.css"

class Home extends Component {


    state = {
        show: false,
        data: [],
        rating: 1,
    }
    componentDidMount = () => {
        // Write your code here
        this.handleGetData()
    }


    handleGetData = () => {
        // Write your code here
        fetch("https://localhost:8001/courses/get")
        .then(res => res.json())
        .then(json =>{
            this.setState({
                data:json
            })
        })
    }

    handleApply = async (id) => {
        // Write your code here
        await fetch(`https://localhost:8001/courses/enroll/${id}`,
        {
            method:"post",
            headers:{"Content-Type":"application/json"}
        })
        .then(res => res.json())
        .then(json=>{
            if(json.message)
            {
                alert(json.message)
            }
            else{
                alert(json.console.error())
            }
        })
    };

    handleRating = (e) => {
        // Write your code here
        this.setState({
            rating:e.target.value
        })
    }

    handleAddRating = async (id) => {
        // Write your code here
        await fetch(`https://localhost:8001/courses/enroll/${id}`,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({rating:this.state.rating})
        })
        .then(res => res.json())
        .then(json => this.handleGetData())
    }

    handleDrop = async (id) => {
        // Write your code here
        await fetch(`https://localhost:8001/courses/drop/${id}`,
        {
            method:"DELET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res =>res.json())
        .then(json =>{
            if(json.message){
                alert(json.messge)
            }
            else{
                alert(json.error)
            }
            this.handleGetData()
        })
    }

    render() {
        return (
            <div className="home">
                <header>
                    <h2>ABC Learning</h2>
                </header>
                {/* write your code here */}
                <div className="cardContainer">
                    {this.state.data.map(d =>(

                    
                    <div className="card">
                        <ul>
                            <div className="header">
                                <li>{d.courseName}</li>
                                <li>{d.courseDept}</li>
                                <li>{d.description}</li>
                                {d.isApplied&&
                                <li>{!d.isRated&&
                                    <li>Rate:
                                        <select className="rating" onChange={this.handleRating} name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                        <button className="rate" onClick ={()=> this.handleAddRating(d._id)}>Add</button>
                                    </li>}
                                    <button className="drop" onClick ={()=> this.handleDrop(d._id)}>Drop Course</button>
                                </li>}
                                <li><button className="btn">Apply</button></li>
                            </div>
                            <div className="footer">
                                <li>
                                    {d.duration} hrs . {d.noOfRatings} Ratings. {d.rating}/5
                                </li>
                            </div>
                        </ul>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;