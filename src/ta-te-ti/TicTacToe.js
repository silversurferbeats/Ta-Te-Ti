import React, { useState } from "react";
import swal from 'sweetalert';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TicTacToe.css';

const TicTacToe = () => {

    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    //
    const checkForWinner = (squares) => {
        //Hago la matriz
        let combos = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down: [
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],
            diagnol: [
                [0,4,8],
                [2,4,6],
            ],
        };
        //recorro con un metodo "for in" 
        for(let combo in combos){
            combos[combo].forEach((pattern) => {
                if(
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ){
                    //do nothing
                }else if(
                    squares[pattern[0]] === squares[pattern[1]] && 
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    }
    
    const handleClick = (num) => {
        if(cells[num] !== ''){
            swal('Espacio ocupado..','intente nuevamente', 'error');
            return;
        }
        let squares = [...cells];
        
        
        if(turn === 'x'){
            // const X = ()=> {
            //     return <i class="fa-solid fa-bug"></i>;
            // };
            squares[num] = 'X';
            setTurn('o');
        }else{
            squares[num] = 'O';
            setTurn('x');
        }

        checkForWinner(squares);
        setCells(squares);
    }

    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)} > {cells[num]} </td>
    }


    return (
        <div className="container" >
            <table>
                <h2 className="turnTitle" >Turn: {turn}</h2>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
                <button className="" onClick={() => handleRestart()} >Iniciar</button>
            </table>
            {
            winner && 
            swal({
                title: `"${winner}" es el ganador!`,
                text: 'Felicitaciones',
                type: 'success',
                confirmButtonColor: "#FFF",
                timer: 8000
            })
            .then({
                timer: 8000
            })
            .then(
                //window.location.href = 'http://localhost:3000/'
                window.location.reload(true)
            )
            }
        </div>
    )
}

export default TicTacToe;