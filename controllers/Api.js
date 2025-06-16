
const jwt = require("jsonwebtoken");
const apikey = '08c162b2113e3b1102edd9cfa35b8ffb';
const category = 'world';
const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apikey}`;

const GetApi = async (req,res) => {
  try {
   
    if (req.user.role !== "admin" && req.user.role !== "user") {
      console.log(req.user.role)
      return res.status(403).json({ message: "Forbidden: No Access" });
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.articles) {
      res.json({ articles: data.articles });
    } else {
      res.status(404).json({ message: "No articles found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching data", details: error.message });
  }
}

const PutApi = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const token = req.headers.authorization; 
    const decodedToken = jwt.verify(token, "Hello Taken");

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: No Access" });
    }

    const { category, lang, country } = req.body;

    if (!category || !lang || !country) {
      return res.status(400).json({ message: "Missing required fields: category, lang, country" });
    }

    const updatedUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&country=${country}&apikey=${apikey}`;

    console.log(`Updated preferences for user ${decodedToken.userId}:`, req.body);
    
    res.json({
      message: "Preferences updated successfully",
      updatedUrl
    });

  } catch (error) {
    res.status(500).json({ error: "Error updating preferences", details: error.message });
  }
}

module.exports = {GetApi,PutApi}
