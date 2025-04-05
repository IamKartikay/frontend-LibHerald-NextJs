'use client';

import React, { useState, useContext, useEffect } from "react";
import Context from "../context/StateContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

/**
 * Client component for handling article likes and interactions
 */
export function ArticleLikes({ id, initialLikes }) {
  const [liked, setLiked] = useState(false);
  const [currLikes, setCurrLikes] = useState(initialLikes || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if article was liked before
  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setLiked(likedArticles.includes(id));
  }, [id]);

  const handleLikeButton = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    const action = liked ? 'unlike' : 'like';
    
    try {
      // Use server-side API for handling likes
      const response = await fetch(`/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action }),
      });
      
      if (response.ok) {
        // Update local state
        const newLikeCount = liked ? currLikes - 1 : currLikes + 1;
        setCurrLikes(newLikeCount);
        
        // Update localStorage
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        if (liked) {
          localStorage.setItem('likedArticles', JSON.stringify(likedArticles.filter(item => item !== id)));
        } else {
          localStorage.setItem('likedArticles', JSON.stringify([...likedArticles, id]));
        }
        
        setLiked(!liked);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="likesContainer">
      <button 
        onClick={handleLikeButton} 
        className="likeButton"
        disabled={isUpdating}
        aria-label={liked ? "Unlike article" : "Like article"}
      >
        {liked ? (
          <AiFillHeart color="red" size={22} />
        ) : (
          <AiOutlineHeart size={22} />
        )}
      </button>
      <span>{currLikes}</span>
    </div>
  );
}

/**
 * Client component for article sharing functionality
 */
export function ArticleShare({ title }) {
  const {
    fbshare,
    twittershare,
    lkdshare,
    copyLink,
    sharepopup,
    setSharepopup
  } = useContext(Context);
  
  const [shareOpen, setShareOpen] = useState(false);
  
  const toggleShare = () => {
    setShareOpen(!shareOpen);
  };
  
  const handleCopyLink = () => {
    copyLink();
    setShareOpen(false);
  };
  
  const handleFacebookShare = () => {
    fbshare();
    setShareOpen(false);
  };
  
  const handleTwitterShare = () => {
    twittershare();
    setShareOpen(false);
  };
  
  const handleLinkedInShare = () => {
    lkdshare();
    setShareOpen(false);
  };

  return (
    <div className="shareContainer">
      <button 
        onClick={toggleShare} 
        className="shareButton"
        aria-label="Share article"
        aria-expanded={shareOpen}
      >
        Share
      </button>
      
      {shareOpen && (
        <div className="shareOptions">
          <button onClick={handleFacebookShare} aria-label="Share on Facebook">
            <FaFacebookF size={18} />
          </button>
          <button onClick={handleTwitterShare} aria-label="Share on Twitter">
            <FaXTwitter size={18} />
          </button>
          <button onClick={handleLinkedInShare} aria-label="Share on LinkedIn">
            <FaLinkedinIn size={18} />
          </button>
          <button onClick={handleCopyLink} aria-label="Copy link">
            <AiOutlineLink size={20} />
          </button>
        </div>
      )}
    </div>
  );
} 