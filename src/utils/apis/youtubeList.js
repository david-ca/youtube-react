import axios from 'axios';

const KEY='AIzaSyCHr9VBKdYGwPQXlXTOjPCVUkcpRTl3URc';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        type: 'video',
        key: KEY,
    }
});