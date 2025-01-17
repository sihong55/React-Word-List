import {useRef, useState} from "react";
import useFetch from "../hooks/useFetch.ts"
import {useNavigate} from "react-router-dom";
import { IDay } from "./DayList.tsx";
import React from "react";
//버튼 여러번 눌러 에러 방지.

export default function CreateWord() {
    const days : IDay[] = useFetch("http://localhost:3001/days");
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e:React.FormEvent) {
        e.preventDefault();
        if (!isLoading && dayRef.current && engRef.current && korRef.current) {
            setIsLoading(true);
            // 이벤트의 기본 동작을 막는 메서드 폼의 기본 동작인 페이지 리로드나 서버로 데이터 전송을 막습니다. 폼 제출 후 페이지가 새로 고침되는
            // 기본 동작을 방지 저장 버튼클릭시점은 rendering 경과가 dom에 반영된 후
            // type script  위에 current는 null이면 실행되지 않는다.
            const day = dayRef.current.value;
            const eng = engRef.current.value;
            const kor = korRef.current.value;

            fetch(`http://localhost:3001/words/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {day,
                    eng,
                    kor, 
                    isDone: false}
                )
            }).then(res => {
                if (res.ok) {
                    alert("자료가 생성되었습니다.");
                    history(`/day/${dayRef.current.value}`);
                    setIsLoading(false);
                }
            })
        }
    }
    // useRef DOM 요소에 접근하기: 특정 HTML 요소에 직접 접근하고 제어 변수 저장하기: 컴포넌트가 리렌더링될 때도 값이 유지되는
    // 변수 ref dom요소가 생성된 후 접근 가능
    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    return <form onSubmit={onSubmit}>
        <div className="input_area">
            <label>Eng</label>
            <input type="text" placeholder="computer" ref={engRef}/>
        </div>
        <div className="input_area">
            <label>kor</label>
            <input type="text" placeholder="컴퓨터" ref={korRef}/>
        </div>
        <div className="input_area">
            <label>Day</label>
            <select ref={dayRef}>
                {
                    days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))
                }
            </select>
        </div>
        <div>
            <button
                style={
                    {
                        opacity: isLoading? 0.3 : 1,
                    }}
            >{isLoading ? "Saving..." : "저장"}</button>
        </div>
    </form>
}