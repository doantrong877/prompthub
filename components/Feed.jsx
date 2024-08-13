

"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession here
import PromptCard from './PromptCard';
import GoogleGemini from '@components/GoogleGemini';

const PromptCardList = ({ data, handleTagClick, fetchPosts, setSearchText }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          fetchPosts={fetchPosts}
          setSearchText={setSearchText}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession(); // Add session data to get current user
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (query = '') => {
    const response = await fetch(`/api/prompt/search?searchText=${encodeURIComponent(query)}`);
    const data = await response.json();
    setPosts(data.sort((a, b) => b.upvotes - a.upvotes)); // Sort by upvotes
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    fetchPosts(value);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (

    <section className="feed">
      <div>
      <GoogleGemini></GoogleGemini>
      </div>
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag, prompt, or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={posts.map(post => ({
          ...post,
          userHasVoted: post.votedUsers.includes(session?.user?.id) // Check if the user has voted
        }))}
        handleTagClick={(tag) => {
          setSearchText(tag); // Set search text to the clicked tag
          fetchPosts(tag); // Fetch posts related to the clicked tag
        }}
        fetchPosts={fetchPosts}
        setSearchText={setSearchText}
      />
    </section>
  );
};

export default Feed;
