import React, {useState, useEffect} from 'react';
import StorySelect from '../components/StorySelect';

const StoryContainer = () => {

    const [stories, setStories] = useState([]);
    const [storyDetails, setStoryDetails] = useState("");
    const [selectedStory, setSelectedStory] = useState(null);
    const storyId = () => {
        console.log("here");

      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(data => {
            const selectedList = data.slice(0,20)
            // console.log(selectedList);
            const Promises = selectedList.map((id) => {
              return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res=>res.json())
            })
            // console.log(Promises);
            Promise.all(Promises).then(data=>console.log(data))
        })
    }
    useEffect(() => {
        // fetch("https://hacker-news.firebaseio.com/v0/item/{storyId}.json")
        // .then(res => res.json())
        // .then(data => setStories(data.results))
        storyId();
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
        {/* <StorySelect stories = {stories} handleSelectChange = {handleSelectChange}/> */}
        </>
    );
};

export default StoryContainer;