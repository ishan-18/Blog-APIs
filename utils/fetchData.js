const axios = require('axios');
const _ = require('lodash');

const fetch_data = async () => {
    const response = await axios.get(process.env.API_URL, {
        headers: {
            'x-hasura-admin-secret': process.env.API_ADMIN_SECRET
        }
    });

    return response
}

const fetch_and_analyze_blog_data = async () => {
    try {
        const response = await fetch_data()
        const blogs = response.data.blogs;

        const total_blogs = blogs.length;
        const longest_blog_title = _.maxBy(blogs, 'title.length');
        const privacy_titled_blogs = _.filter(blogs, blog => blog && blog.title && blog.title.toLowerCase().includes('privacy'));
        const unique_titles = _.uniqBy(blogs, 'title');

        const statistics = {
            total_blogs,
            longest_blog_title: longest_blog_title ? longest_blog_title.title : null,
            privacy_titled_blogs: privacy_titled_blogs.length,
            unique_titles: unique_titles.map(blog => blog.title)
        };

        return statistics;
    } catch (error) {
        console.error('Error fetching and analyzing data:', error.message);
        throw error;
    }
};

const memoized_search_blogs = _.memoize(async (query) => {
    try {
        const response = await fetch_data();
        const blogs = response.data.blogs;
        return blogs.filter(blog =>
            blog.title.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error('Error searching for blogs:', error.message);
        throw error;
    }
}, (query) => query);

module.exports = { fetch_data, fetch_and_analyze_blog_data, memoized_search_blogs }