const { AxiosError } = require('axios');
const _ = require('lodash');
const ApiCode = require('../utils/apiCodes');
const createResponse = require('../utils/apiUtils');
const { fetch_and_analyze_blog_data, memoized_search_blogs } = require('../utils/fetchData');

const memoized_fetch_and_analyze = _.memoize(fetch_and_analyze_blog_data, null, 300000);

exports.get_blogs_stats = async (req, res, next) => {
    try {
        const statistics = await memoized_fetch_and_analyze();
        res.status(ApiCode.SUCCESS.statusCode).json(createResponse(statistics, ApiCode.SUCCESS))
    } catch (error) {
        console.error('Error fetching and analyzing data:', error.message);
        if (error.name = 'AxiosError') {
            return res.status(ApiCode.AXIOS_ERROR.statusCode).json(createResponse({}, ApiCode.AXIOS_ERROR))
        }
        return res.status(ApiCode.INTERNAL_SERVER_ERROR.statusCode).json(createResponse({}, ApiCode.INTERNAL_SERVER_ERROR))
    }
}

exports.search_blogs = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(ApiCode.QUERY_PARAM_MISSING.statusCode).json(createResponse({}, ApiCode.QUERY_PARAM_MISSING));
    }

    try {
        const searchResults = await memoized_search_blogs(query)
        res.status(ApiCode.SUCCESS.statusCode).json(createResponse(searchResults, ApiCode.SUCCESS))
    } catch (error) {
        console.error('Error searching for blogs:', error.message);
        if (error.name = 'AxiosError') {
            return res.status(ApiCode.AXIOS_ERROR.statusCode).json(createResponse({}, ApiCode.AXIOS_ERROR))
        }
        return res.status(ApiCode.INTERNAL_SERVER_ERROR.statusCode).json(createResponse({}, ApiCode.INTERNAL_SERVER_ERROR))
    }
}