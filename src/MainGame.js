import React, { Component } from 'react';
import JsonData from './data/questions2.json'
import Question from './components/QuestionComponent';
import Answer from './components/AnswerComponent';
import { Card, ProgressBar } from 'react-bootstrap';

export default class Game extends Component {
    state = {
        nbTours: 10,
        tourAct: 0,
        questions: [],
        currentQuestion: 0,

        robotIntegrity: 100,
        progColor: "success",
        robotName: "RobotName"
    }

    /**
     * Met a jour la question actuelle
     */
    updateCurrentQuestion = () => {
        let rand = Math.floor(Math.random() * this.state.questions.length);
        this.setState({currentQuestion: rand})
    }

    /**
     * Passe au prochain tour
     */
    nextTour = (valInteg) => {
        if(this.state.tourAct < this.state.nbTours)
        {
            this.setState(prevState => ({
                tourAct: prevState.tourAct+1
            }));
        }
        else
        {
            this.endGame();
        }
        this.updateIntegrity(valInteg);
        this.updateCurrentQuestion();
    }

    /**
     * Fin de la partie avec victoire
     */
    endGame = () => {
        return (<h2>Fin de la partie, vous avez gagné</h2>)
    }

    /**
     * Fin de la partie défaite
     */
    gameOver = () => {
        return (<h2>Fin de la partie : Votre robot s'est autodétruit !</h2>)
    }

    /**
     * Met a jour l'intégrité du robot
     */
    updateIntegrity = (val) => {
        let newVal
        if (this.state.robotIntegrity + val >= 100) {
            newVal = 100;
        } else if (this.state.robotIntegrity + val <= 0) {
            newVal = 0;
        } else {
            newVal = this.state.robotIntegrity + val;
        }
        this.setState({
            robotIntegrity: newVal
        });
        this.updateColorIntegrity(newVal);
    }

    updateColorIntegrity = (val) => {
        let color;
        if (val <= 20){
            color = "danger";
        } else if (val <= 50) {
            color = "warning";
        } else {
            color = "success";
        }
        this.setState({
            progColor: color
        })
    }

    /**
     * Récupere toutes les questiosn dans le fichier JSON et les transforme en composants Questions / Answer
     */
    componentDidMount()
    {
        JsonData.map((a) => {
            //réponses pour une question
            let reponses = a.reponses 
            //tableau de composants Answer
            let repComp = [];
            reponses.map((r) => {
                return repComp.push(<Answer callbackToParent={this.nextTour} text={r.rep} value={r.value}/>)
            })
            let question = <Question text={a.question} answers={repComp}/>
            this.setState((prevState) => ({
                questions: [...prevState.questions, question]
            }))
            return 0;
        })
        this.nextTour(0)
    }

    render()
    {
        let main;

        console.log(this.state.currentQuestion)
        console.log(this.state.tourAct + "/" + this.state.nbTours + " integrite : " + this.state.robotIntegrity)

        if(this.state.tourAct === this.state.nbTours && this.state.robotIntegrity > 0) 
        {
            main = this.endGame()
        }
        else if(this.state.robotIntegrity <= 0)
        {
            main = this.gameOver()
        }
        else
        {
            main = this.state.questions[this.state.currentQuestion];
        }

        console.log(this.state.questions)
        return (
            <>
            <Card style={{ width: '20rem', marginBottom: "1em" }}>
                <Card.Header as="h4">
                    Tour : {this.state.tourAct} / {this.state.nbTours}
                </Card.Header>
                <Card.Body className="robot-infos">
                    <h5 style={{ marginBottom: '1em' }}>{this.state.robotName}</h5>
                    
                    Intégrité du robot :
                    <ProgressBar animated 
                        now={this.state.robotIntegrity} 
                        variant={this.state.progColor} 
                        label={<b>{this.state.robotIntegrity}%</b>} 
                        style={{ marginTop: '1em', height: "2em" }} 
                    />

                </Card.Body>
            </Card>

            {main}
            </>
        )
    }
}