import axios from "axios";

export default {
  searchArticles: function(searchField) {
    let beginYear = 2018;
    let endYear = 2018;
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchField}&facet_field=source&begin_date=${beginYear}0101&end_date=${endYear}1231&api-key=7ed0a22d92cc4cd9b5fd37efbca49ff9`;
    return axios.get(queryURL);
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
