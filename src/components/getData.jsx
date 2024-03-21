import './style.css'
import {useState} from "react";
export const GetData = () => {
    const [text,setText] = useState('I\'m looking for a Jumanji (1995) and a romance  movie.')
    const onSubmit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/recommendations/${encodeURIComponent(text)}`)
            .then((response) => response.json())
            .then((data) => {
                // Update your component's state or handle the recommendations data as needed
                console.log(data);
            });
    }


    return(
        <div className={'ask-ai-container'}>
            <form onSubmit={onSubmit}>
                <label htmlFor={'input'} >Write here a genres of a movie or directly a movie and we will give you a recomandation</label>
                <input value={text} onChange={(e)=>{
                    setText(e.target.value)
                }} type={'text'} name={'input'} id={'input'} placeholder={"Type here"} />
                <button type={'submit'} disabled={!text}>Submit</button>
            </form>
        </div>
    )
}