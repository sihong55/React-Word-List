import { useState } from "react";
import React from "react";
//({word:w}) props의 word 속성을 추출, 구조분해 w는 별칭

interface IProps {
    word: IWord;    
}

export interface IWord {
    day: string;
    eng: string;
    kor: string;
    isDone: boolean;
    id: number;
}

export default function Word({word: w}: IProps) {
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    function toggleDone() {
        //setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json', 
            },
            body : JSON.stringify({
                ...word,
                isDone : !isDone
            }),
        })
        .then (res => {
            if(res.ok) {
                setIsDone(!isDone);
            }
        })
    }

    function del() {
        if(window.confirm('삭제 하시겠습니까')) {
            fetch(`http://localhost:3001/words/${word.id}`, {
                method : 'DELETE',
            }).then( res => {
                if (res.ok) {
                    setWord({
                        ...word,
                        id: 0}); //재 랜더링이 된다.
                }
            });
        }
    }
    //구조분해 할당으로 word:w에서 word의 id값을 강제로 0로 만들어줬다.
    //따라서, 랜더링(컴포넌트가 RETURN을 반환) 되지 않는다.
    //대신, 해당 컴포넌트와 관련된 DOM이 삭제 됩니다 . <TD></TD>가 날라간다.
    if (word.id === 0) {
        return null;
    }

    return(
        <tr className={isDone ? 'off' : ''}>
            <td>
                <input type="checkbox" checked={isDone}
                        onChange={toggleDone} />
            </td>    
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>
                    뜻 {isShow ? '숨기기':'보기'}</button>
                <button onClick={del} className="btn_del">삭제</button>
            </td>
        </tr>
    );
}