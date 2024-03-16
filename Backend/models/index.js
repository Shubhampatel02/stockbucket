const mongoose = require("mongoose");
const url = "mongodb+srv://shubhampatel7865:Spatel7869@cluster0.4zdt1rg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


function main() {
    mongoose.connect(url).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };