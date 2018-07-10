const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

//console.log(db)

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  );

const articleSeed = [
    {
      title: 'Why Cats? Why Not Cats?',
      url: "https://lens.blogs.nytimes.com/2017/12/14/why-cats-why-not-cats-new-york/",
      date: "01/01/18",
      saved: false,
    },
    {
      title: 'Yoga With Cats',
      url: "https://www.nytimes.com/2017/06/07/well/family/yoga-with-cats.html",
      date: "01/01/18",
      saved: false,
    },
    {
      title: 'At a Cat Cafe, Sipping and Purring',
      url: "https://www.nytimes.com/2015/11/08/fashion/at-a-cat-cafe-sipping-and-purring.html",
      date: "01/01/18",
      saved: false,
    },
    {
      title: 'I Came Back to Australia, and the Milk Bars Were Gone',
      url: "https://www.nytimes.com/2018/06/07/dining/milk-bars-australia.html",
      date: "01/01/18",
      saved: false,
    },
  ]

  // db.Article.remove({})