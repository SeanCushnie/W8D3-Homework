import React, {useState, useEffect} from 'react';
import StorySelect from '../components/StorySelect';

const StoryContainer = () => {

    const [stories, setStories] = useState([]);
    const [storyDetails, setStoryDetails] = useState("");
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(data => setStories(data.results))
    }, [])

    const handleSelectChange = (story) => {
        const storyDetailPromises = story.detail.map((detail) => {
            return fetch(detail).then(res=>res.json())
        })
        console.log(storyDetailPromises);

        Promise.all(storyDetailPromises).then((data) => {
            setStoryDetails(data);
        })
        setSelectedStory(story);
    }
    return (
        <>
        <h1> Top Stories:</h1>
        <StorySelect stories = {stories} handleSelectChange = {handleSelectChange}/>
        </>
    );
};

export default StoryContainer;