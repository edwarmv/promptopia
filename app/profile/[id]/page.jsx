"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = () => {
  const { id: userId } = useParams();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <Profile
      name={user ? user.username : "..."}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  );
};

export default UserProfile;
