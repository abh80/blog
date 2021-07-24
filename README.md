# Blog

A simple blog application [WIP] using postgresql and nodejs.

# Get Started

Clone this repository and run `docker-compose up`. and you should be able to see the blog server running on `http://localhost:3000` 🎉!!

# Making a blog

To make a blog make a post request to `blog/blogs` with the following json:

```json
{
  "author": "author name",
  "title": "blog title",
  "content": "blog content"
}
```

# Getting a blog
To get a blog make a get request to `blog/:id` with correct id returned from posting blog.

> ⚠️ This is a WIP so may not be working as expected