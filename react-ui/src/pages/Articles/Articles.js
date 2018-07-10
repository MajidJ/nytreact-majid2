import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";

class Articles extends Component {
    state = {
        savedArticles: [],
        searchedArticles: [], 
        searchInput: '',
        startYear: '',
        endYear: '',
    };

    componentDidMount() {
        this.loadSavedArticles();
        this.loadSearchedArticles("Trump");
    }

    loadSearchedArticles = (searchField, startYear, endYear) => {
        this.setState({searchedArticles: []});
        console.log("startYear", startYear);
        console.log("endYear", endYear);
        API.searchArticles(searchField, startYear, endYear)
        .then(res => {
            res.data.response.docs.forEach(nytArticle => {
                let newArticle = {
                    title : nytArticle.headline.main,
                    date : nytArticle.pub_date,
                    url : nytArticle.web_url
                };
                this.setState(prevState => ({
                    searchedArticles: [...prevState.searchedArticles, newArticle]
                }))
            });
        })
        .catch(err => console.log(err));
    };

    loadSavedArticles = () => {
        this.setState({ savedArticles: []});
        API.getArticles()
        .then(res => this.setState({ savedArticles: res.data }))
            // console.log(typeof res.data, res.data))
            
        .catch(err => console.log(err));
    };
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchInput) {
            this.loadSearchedArticles(this.state.searchInput, this.state.startYear, this.state.endYear)
        }
    };

    handleSaveBtnClick = (index, event) => {
        event.preventDefault();
        API.saveArticle(this.state.searchedArticles[index])
        this.loadSavedArticles();
    };

    handleDeleteBtnClick = (id, event) => {
        event.preventDefault();
        API.deleteArticle(id)
        this.loadSavedArticles();
    };

    render() {
        return (
            <div>
                <form>
                    <Input
                        value={this.state.searchInput}
                        onChange={this.handleInputChange}
                        name="searchInput"
                        placeholder="Search (required)"
                    />
                    <Input
                        value={this.state.startYear}
                        onChange={this.handleInputChange}
                        name="startYear"
                        placeholder="Start Year"
                    />
                    <Input
                        value={this.state.endYear}
                        onChange={this.handleInputChange}
                        name="endYear"
                        placeholder="End Year"
                    />
                    <FormBtn
                        disabled={!(this.state.searchInput)}
                        onClick={this.handleFormSubmit}>
                        Search
                    </FormBtn>
                </form>
                <h1>Searched Articles On My List</h1>
                {this.state.searchedArticles.length ? (
                    <ul className="list-group">
                    {this.state.searchedArticles.map((searchedArticle,index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={"searchedArticle-" + index}>
                            <a href={searchedArticle.url} target="_blank">
                                <strong>
                                {searchedArticle.title} - {searchedArticle.date},
                                </strong>
                            </a>
                            <span className="badge">
                                <SaveBtn className="btn btn-primary btn-sm" onClick={(e) => {this.handleSaveBtnClick(index, e)}}/>
                            </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <h3>No Search Results to Display</h3>
                )}
                <h1>Saved Articles On My List</h1>
                {this.state.savedArticles.length ? (
                    <ul className="list-group">
                    {this.state.savedArticles.map(savedArticle => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={savedArticle._id}>
                            <a href={savedArticle.url} target="_blank">
                                <strong>
                                {savedArticle.title} - {savedArticle.date}
                                </strong>
                            </a>
                            <span className="badge">
                                <DeleteBtn className="btn btn-danger btn-sm" onClick={(e) => {this.handleDeleteBtnClick(savedArticle._id, e)}}/>
                            </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </div>
        )
    }
}

export default Articles;
