//import dummy from "../db/data.json";
import { useParams } from "react-router-dom";
import Word, { IWord } from "./Word.tsx";
import useFetch from "../hooks/useFetch.ts";
import React from "react";

export default function Day() {
    //dummy.words
    //useParams 함수가 반환한 객체의 특정 속성을 구조 분해 할당(destructuring assignment) 한 결과로, 
    // day는 문자열(string)입니다. App.js에서 day/:day로 보냈고 이걸 구조분해할당해서 :day는 {day}에 
    //const wordList = dummy.words.filter(word => word.day === Number(day));
    const {day} = useParams<{day:string;}>();
    const words : IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);

    return (
        <>
            <h2>Day{day}</h2>
            {words.length === 0 && <span>Loading...</span>}
            < table > 
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id} />
                ))}
                </tbody>
            </table>
        </>
    );
}

//word를 props로 내보낸다. 즉, word의 자료구조가 모두 word라는 props로 전달된다.