import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import xml2js from "xml2js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB: budgetDB"))
    .catch(err => console.error("MongoDB connection error:", err));


const ArticleSchema = new mongoose.Schema({
    title: String,
    link: String,
    pubDate: Date,
    source: String,
    read: { type: Boolean, default: false }
});

const Article = mongoose.model("Article", ArticleSchema);

async function fetchRSSFeed(url, sourceName) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const result = await xml2js.parseStringPromise(text, { mergeAttrs: true });

        const items = result.rss.channel[0].item.map(item => ({
            title: item.title[0],
            link: item.link[0],
            pubDate: new Date(item.pubDate[0]),
            source: sourceName
        }));

        await Article.insertMany(items, { ordered: false }).catch(() => {});
        console.log(`Fetched and stored articles from ${sourceName}`);
    } catch (error) {
        console.error(`Error fetching ${sourceName}:`, error.message);
    }
}

app.get("/articles", async (req, res) => {
    try {
        const { source, keyword, startDate, endDate, read } = req.query;
        const query = {};

        if (source) query.source = source;
        if (keyword) query.title = new RegExp(keyword, "i");
        if (startDate || endDate) {
            query.pubDate = {};
            if (startDate) query.pubDate.$gte = new Date(startDate);
            if (endDate) query.pubDate.$lte = new Date(endDate);
        }
        if (read !== undefined) query.read = read === "true";

        const articles = await Article.find(query).sort({ pubDate: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve articles" });
    }
});

app.put("/articles/:id/read", async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!article) return res.status(404).json({ error: "Article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: "Failed to mark article as read" });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    const feeds = [
        { url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", source: "NYTimes" },
        { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC" }
    ];

    for (const feed of feeds) {
        await fetchRSSFeed(feed.url, feed.source);
    }

    setInterval(() => {
        feeds.forEach(feed => fetchRSSFeed(feed.url, feed.source));
    }, 60 * 60 * 1000);
});
