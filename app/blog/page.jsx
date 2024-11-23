"use client"
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import blogs from '../../public/blog.json';
import * as Icons from 'react-icons/fa';

const BlogPostItem = ({ item }) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    // Function to dynamically import the icon
    const loadIcon = async () => {
      try {
        const { [item.icon]: LoadedIcon } = await import('react-icons/fa');
        setIcon(() => LoadedIcon);
      } catch (error) {
        console.error(`Icon ${item.icon} not found`, error);
      }
    };

    loadIcon();
  }, [item.icon]);

  const renderContent = (content) => {
    return content.map((paragraph, index) => (
      <p key={index} className="whitespace-pre-wrap text-justify">
        {paragraph.split(/\*\*(.*?)\*\*/).map((text, i) =>
          i % 2 === 1 ? (
            <span key={i} className="font-bold block mt-4">{text}</span>
          ) : text
        )}
      </p>
    ));
  };

  return (
    <div className="flex gap-x-3 animate-fadeInDown" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem' }}>
          {Icon ? <Icon className="text-4xl text-orange-500" /> : <div>Loading...</div>}
        </div>
        <div className="absolute inset-0 top-14 flex items-start justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-2xl">{item.title}</h3>
        <span className="text-text text-lg">{item.date}</span>
        <div className="mt-2 text-gray-600 dark:text-neutral-200 text-justify">
          {renderContent(item.content)}
        </div>
        <div className="flex mt-4 space-x-2">
          {item.keywords.split(', ').map((keyword, index) => (
            <span key={index} className="text-xs bg-lightblue text-background rounded-full px-2 py-1">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  // Sort blogs from most recent to oldest
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <PageLayout title="My Blog">
      <div>
        {sortedBlogs.map((blog, idx) => (
          <BlogPostItem key={idx} item={{ ...blog, index: idx }} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Blog;
