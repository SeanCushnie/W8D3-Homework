import React from 'react'

const StorySelect = ({stories, handleSelectChange}) => {

    const handleChange = (event) => {
        const index = event.target.value;
        handleSelectChange(stories[index]);
    };

    const storyOptions = stories.map((story,index) => {
        return <option>
            key={index} value = {index}
            {story.title}
        </option>
    })
    return (
        <select onchange={handleChange}> {storyOptions} </select>
)
}

export default StorySelect;
