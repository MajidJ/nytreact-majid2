import axios from "axios";

export default {
  searchArticles: function(searchField, startYear, endYear) {
    let start = parseInt(startYear);
    let end = parseInt(endYear);
    if (end < start || start > 2018 || !(start && end)) {
      start = 2018;
      end = 2018
    }
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchField}&facet_field=source&begin_date=${start}0101&end_date=${end}1231&api-key=7ed0a22d92cc4cd9b5fd37efbca49ff9`;
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
