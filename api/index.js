// // const express = require('express');
// // const mongoose = require('mongoose');
// // const app = express();

// // mongoose.connect("mongodb+srv://f04128838:Firdavs_f2981@cluster0.4hiqsjw.mongodb.net/box")
// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     age: Number,
// //     // email: String
// // })
// // const User = mongoose.model("User", userSchema)


// // app.listen(3221, ()=>{
// //     console.log("Server is running on port 3221")
// // })


// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const app = express();

// // MongoDB-ga ulanish
// mongoose.connect("mongodb+srv://f04128838:Firdavs_f2981@cluster0.4hiqsjw.mongodb.net/box", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDBga muvaffaqiyatli ulandi");
// }).catch((err) => {
//     console.error("MongoDB ulanishda xatolik:", err);
// });

// // Schema va model
// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
// });
// const User = mongoose.model("User", userSchema);

// // Static fayllar uchun `public` papkasini ochish
// app.use(express.static(path.join(__dirname, 'public')));

// // GET /sahifa → HTML faylni ko‘rsatadi
// app.get('/sahifa', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // GET /sahifa/malumot → API ko‘rinishida foydalanuvchilarni qaytaradi
// app.get('/sahifa/malumot', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.json({
//             status: "success",
//             count: users.length,
//             data: users
//         });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server xatosi", error });
//     }
// });

// // Serverni ishga tushurish
// const PORT = 3221;
// app.listen(PORT, () => {
//     console.log(`Server ishga tushdi: http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB-ga ulanish
mongoose.connect("mongodb+srv://f04128838:Firdavs_f2981@cluster0.4hiqsjw.mongodb.net/box", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDBga ulandi");
}).catch((err) => {
    console.error("MongoDB ulanish xatosi:", err);
});

// Schema va model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
const User = mongoose.model("User", userSchema);

// Statik HTML fayllar uchun papka
app.use(express.static(path.join(__dirname, 'public')));

// GET /sahifa → HTML sahifa
app.get('/sahifa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /sahifa/malumot → faqat data ro'yxati qaytariladi
app.get('/sahifa/malumot', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server xatosi" });
    }
});

// Serverni ishga tushurish
const PORT = 3221;
app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
