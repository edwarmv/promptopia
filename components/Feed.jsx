"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

let initialPosts = [];

const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setPosts(initialPosts);
      return;
    }
    let filteredPosts = [];
    filteredPosts = initialPosts.filter(
      (value) =>
        value.prompt.includes(searchText) ||
        value.tag.includes(searchText) ||
        value.creator.username.includes(searchText),
    );
    setPosts(filteredPosts);
  }, [searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      initialPosts = data;
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;
