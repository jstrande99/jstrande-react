import React, { useState, useEffect } from "react";
import './Style/News.css';

let apiIndex = 0;

export function News(process) {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            const API_KEYS = [process.REACT_APP_NEWS_API_KEY, process.REACT_APP_NEWS_API_KEY_TWO];
            let response = '';
            if(searchTerm === ""){
                response = await fetch(
                    `https://newsapi.org/v2/top-headlines?language=en&sortBy=publishedAt&country=us&apiKey=${API_KEYS[apiIndex]}`
                );
                const result = await response.json();
                setNews(result.articles);
            }else{
                response = await fetch(
                    `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${API_KEYS[apiIndex]}`
                );
                const result = await response.json();
                setNews(result.articles);
            }
            if(response.status === 429){
                apiIndex = (apiIndex + 1) % API_KEYS.length; 
                fetchData();
                return;
            }
        }
        fetchData();
    }, [searchTerm, process.REACT_APP_NEWS_API_KEY, process.REACT_APP_NEWS_API_KEY_TWO]);

    return (
        <div className='container'>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search the news..." className="search"/>
            <div className='articleContainer'>
            {news && news.length > 0 && news.map((topic, index) => (
                <a href={topic.url} className="contentContainer" target="_blank" rel="noopener noreferrer" key={index}>
                    <div key={index} className='articles'>
                        <h2 className="content">{topic.title}</h2>
                        <img src={topic.urlToImage} alt={topic.title} width="250" height="150"/>
                        <p className="content">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(new Date(topic.publishedAt))}</p>
                        <p className="content">Written by: {topic.author}</p>
                    </div>
                </a>
            ))}
            </div>
        </div>
    );
}