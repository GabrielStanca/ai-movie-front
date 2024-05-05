import React, { useState, useEffect } from "react";
import "./style.css";

const recommendations = [
    { id: 1, name: "Drama", genre: "Drama", text: "Film drama 1"},
    { id: 2, name: "Comedy", genre: "Comedy", text: "Film Comedie 2"},
    { id: 3, name: "Action", genre: "Action", text: "Film Actiune 3"},
    { id: 4, name: "Romance", genre: "Romance", text: "Film Romance 4"},
    { id: 5, name: "Horror", genre: "Horror", text: "Film Horror 5"}
];

const shortcutsButtons = [
    {
        label: "Drama",
        value: "Drama"
    },
    {
        label: "Comedy",
        value: "Comedy"
    },
    {
        label: "Action",
        value: "Action"
    },
    {
        label: "Romance",
        value: "Romance"
    },
    {
        label: "Horror",
        value: "Horror"
    }
]

export const GetData = () => {
    const [text, setText] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const savedChatHistory = localStorage.getItem("chatHistory");
        if (savedChatHistory) {
            setChatHistory(JSON.parse(savedChatHistory));
        }
    }, []);

    const saveChatHistory = (message, reply) => {
        const updatedChatHistory = [...chatHistory, { message, reply }];
        localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));
        setChatHistory(updatedChatHistory);
    };

    const generateRecommendation = (genre,response) => {
        setIsAnimating(true);
        /*if (genre.trim() === "") {
            const message = "I'm just an AI, I'm not capable of mind reading yet! Please provide me with some information.";
            const chars = message.split("");
            let delay = 0;
            chars.forEach((char, index) => {
                setTimeout(() => {
                    saveChatHistory("User", message.substring(0, index + 1));
                    if (index === chars.length - 1) {
                        setIsAnimating(false);
                    }
                }, delay);
                delay += 80;
            });
        } else {
            const matchedRecommendations = recommendations.filter((recommendation) =>
                recommendation.genre === genre
            );
            const recommendationTexts = matchedRecommendations.map(
                (recommendation) => recommendation.name + " - " + recommendation.text
            );
            const recommendation =
                recommendationTexts.length > 0
                    ? recommendationTexts.join(", ")
                    : "No recommendations found. Please try again with more details.";

            const chars = recommendation.split("");
            let delay = 0;
            chars.forEach((char, index) => {
                setTimeout(() => {
                    saveChatHistory(genre, recommendation.substring(0, index + 1));
                    if (index === chars.length - 1) {
                        setIsAnimating(false);
                        setText("");
                    }
                }, delay);
                delay += 80;
            });
        }*/
        if (response?.detail === 'Not Found'){
            const message = "I'm just an AI, I'm not capable of mind reading yet! Please provide me with some information.";
            const chars = message.split("");
            let delay = 0;
            chars.forEach((char, index) => {
                setTimeout(() => {
                    saveChatHistory("User", message.substring(0, index + 1));
                    if (index === chars.length - 1) {
                        setIsAnimating(false);
                    }
                }, delay);
                delay += 80;
            });
        }
        else {
            if (response.recomandareGenuri !== 'No genres found in the text.') {
                const recommendationTexts = response.recomandareGenuri.map(
                    (text) => text
                );
                const recommendation =
                    recommendationTexts.length > 0
                        ? recommendationTexts.join("</br>")
                        : "No recommendations found. Please try again with more details.";
                console.log(recommendation)
                const chars = recommendation.split("");
                let delay = 0;
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        saveChatHistory(text, recommendation.substring(0, index + 1));
                        if (index === recommendation.length - 1) {
                            setIsAnimating(false);
                            setText("");
                        }
                    }, delay);
                    delay += 80;
                });
            }

        }

    };


    const clearChatHistory = () => {
        localStorage.removeItem("chatHistory");
        setChatHistory([]);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/recommendations/${encodeURIComponent(text)}`)
            .then((response) => response.json())
            .then((data) => {
                // Update your component's state or handle the recommendations data as needed
                console.log(data);
                generateRecommendation(text,data);
            });
    }


    return (
        <div className={"dark-purple-gradient"}>
            <div style={{display:"flex", flexDirection: "row"}} className={"main-container"}>
                <div className={"shortcuts-buttons-list"}>
                    {shortcutsButtons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => generateRecommendation(button.value)}
                            className={"custom-button"}
                            disabled={isAnimating}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
                <div className="chat-history-container">
                    {chatHistory.map((entry, index) => (
                        <div key={index} className="chat-entry">
                            <div className="chat-request">
                                {entry.message}
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">
                                        {/* Using dangerouslySetInnerHTML to parse HTML tags in reply */}
                                        <span className="typing-animation" dangerouslySetInnerHTML={{ __html: entry.reply }}></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ask-ai-container">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e)
                        setText("");
                    }}
                >
                    <button
                        onClick={clearChatHistory}
                        type={"button"}
                        className={"clear-button"}
                        disabled={isAnimating}
                    >
                        Clear
                    </button>
                    <div className="input-container">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            type="text"
                            name="input"
                            placeholder="Type here..."
                            style={{
                                border: "none",
                                padding: "10px",
                                width: "80%",
                                backgroundColor: "transparent",
                                margin: "0px"
                            }}
                            className={"custom-input"}
                            disabled={isAnimating}
                        />
                        <button
                            type="submit"
                            style={{backgroundColor: "transparent", margin: "0px", borderRadius: "12px"}}
                            alt={"Submit"}
                            className={"submit-button"}
                            disabled={isAnimating}
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
