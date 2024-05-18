import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../assets/scss/modal.scss';
import { useAuth } from '../../../context/authContext';

const FaqPart = () => {
    const { idUser } = useAuth();
    const { id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [numberQ, setNumberQ] = useState(1);
    const [question, setQuestion] = useState({});
    const [countdown, setCountdown] = useState(30); // 30 minutes en secondes
    const [timerExpired, setTimerExpired] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState("?");
    const [res, setRes] = useState(0);
    const [score, setScore] = useState(null);

    const fetchQuiz = async () => {
        console.log(question)
        const userid = await idUser();
        try {
            const response = await axios.get(`http://localhost:8800/api/quiz/getQuiz/${id}`);
            setQuiz(response.data);
            const idq = response.data[0].id;
            try {
                const response = await axios.get(`http://localhost:8800/api/repense/fetchFirstFalseResponseQuestion/${idq}/${userid}`);
                if (response.data !== 0) {
                    setQuestion(response.data);
                    console.log(question)
                } else {
                    try {
                        const response = await axios.get(`http://localhost:8800/api/repense/getQuizScore/${idq}/${userid}`);
                        setQuestion(null)
                        setScore(response.data);
                        console.log(question)
                    } catch (error) {
                        console.error("Erreur lors de la récupération du score du quiz :", error);
                    }
                }
                console.log(question)
            } catch (error) {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du quiz :", error);
        }
    };

    useEffect(() => {
        fetchQuiz();
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Effacer l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Vérifier si le compte à rebours est arrivé à zéro
        if (countdown === 0 && !score) {
            setTimerExpired(true);
        }
    }, [countdown, id]);

    const handleResponseClick = (response) => {
        setSelectedResponse(response);
    };

    const saveResponse = async (e) => {
        e.preventDefault();
        const userid = await idUser();
        
        try {
            await axios.post('http://localhost:8800/api/repense/createRepense', {
                resultat: selectedResponse,
                idquestion: question.id,
                idUser: userid
            });
            fetchQuiz();
            setNumberQ(numberQ + 1);
            setSelectedResponse("?")
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la réponse :", error);
        }
    };

    return (
        <div className="content">
            {timerExpired && question && Object.keys(question).length !== 0 ? (
                <div>
                    <p>Temps écoulé!</p>
                    
                </div>
            ): score ? (
                <div className='fl'>
                    {score.scorePercentage > 70 ? (
                        <div className='btn-cer'>
                            <div className='Felicitations'>
                                <h5>Score final : {score.scorePercentage}%</h5>
                                <h4>Correct Responses : {score.correctResponses}</h4>
                                <p>Félicitations! Vous avez réussi le quiz avec un score supérieur à 70%.</p>
                            </div>
                            <button>Cértefication</button>
                        </div>
                    ) : (
                        <div className='btn-rq'>
                            <div className='Desole'>
                                <h5>Score final : <span>{score.scorePercentage}% </span></h5>
                                <h4>Correct Responses : <span>{score.correctResponses}</span></h4>
                                <p>Désolé, vous n'avez pas réussi le quiz. Essayez à nouveau!</p>
                            </div>
                            <button>répeter le quiz</button>
                        </div>
                    )}
                </div>
            ) : question && Object.keys(question).length !== 0 ? (
                <div>
                    <div className='n-t-question-quiz'>
                        <div className='number-question-quiz'>
                            <p>Question : {numberQ}</p>
                        </div>
                        <div className='time-question-quiz'>
                            <div className='chrono-quiz'>{Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}</div>
                        </div>
                    </div>

                    <div className='div-form-question'>
                        <form>
                            <div className='question-'>
                                <p>{question.question}</p>
                            </div>
                            <div className='repense-'>
                                <div className={selectedResponse === question.reponse1 ? 'active' : ''} onClick={() => handleResponseClick(question.reponse1)}>{question.reponse1}</div>
                                <div className={selectedResponse === question.reponse2 ? 'active' : ''} onClick={() => handleResponseClick(question.reponse2)}>{question.reponse2}</div>
                                <div className={selectedResponse === question.reponse3 ? 'active' : ''} onClick={() => handleResponseClick(question.reponse3)}>{question.reponse3}</div>
                                <div className={selectedResponse === question.reponse4 ? 'active' : ''} onClick={() => handleResponseClick(question.reponse4)}>{question.reponse4}</div>
                            </div>
                            <div className='btn-next-question'>
                                <button onClick={saveResponse}>Prochaine question</button>
                            </div>
                        </form>
                    </div>
                </div>
            ):(
                <div>
                    <h5 style={{textAlign:"center",marginTop:"25%"}}>pas de quiz</h5>
                </div>
            )
            }
        </div>
    );
};

export default FaqPart;