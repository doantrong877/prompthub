// "use client"
// import { useState, useEffect } from "react";
// import PromptCard from './PromptCard';

// const PromptCardList = ({data, handleTagClick}) => {
//   return (
//     <div className="mt-16 prompt_layout">
//       {data.map((post) => (
//         <PromptCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//     </div>
//   )
// }
// const Feed = () => {
//   const [searchText, setSearchtext] = useState('');
//   const [posts, setPosts] = useState([]);
//   const handleSearchChange = (e) => {

//   }

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch('/api/prompt');
//       const data = await response.json();
//       setPosts(data);
//     }
//     fetchPosts();
//   }, [])
//   return (
//     <section className="feed">
//       <form className="relative w-full flex-center">
//         <input 
//           type="text" 
//           placeholder="Search for a tag or username"
//           value={searchText}
//           onChange={handleSearchChange}
//           required
//           className="search_input peer"
//         />
//       </form>
//       <PromptCardList 
//         data={posts}
//         handleTagClick= { () => {}}

//       />
//     </section>
//   )
// }

// export default Feed

"use client";
import { useState, useEffect } from "react";
import PromptCard from './PromptCard';

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
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (query = '') => {
    const response = await fetch(`/api/prompt/search?searchText=${encodeURIComponent(query)}`);
    const data = await response.json();
    setPosts(data);
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
        data={posts} 
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed;
