//import dummy from "../db/data.json";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.ts";
//dummy는 data.json의 자료
//days..ok, map다음의 day는 days에 있는 항목 하나하나를 지칭함.
//따라서, 하나하나씩 listitem을 만드는 거야.

export interface IDay {
    id: number,
    day: number
}

export default function DayList() {    

    const days : IDay[] = useFetch("http://localhost:3001/days");
    //상태값이 바뀌엇을때 동작하는 함수를 만들수 있다.
    //랜더링 경과가 다 진행되고 작동한다.
    //days의 각각의 data를 day라고 하고 화면에 리스트업
    //link로 파라메터 전달.
    if (days.length === 0) {
        return <span>Loading...</span>
    }
    return (
        <>
            <ul className="list_day">
                {days.map(day => (
                    <li key={day.id}>
                        <Link to ={`/day/${day.day}`}>Day {day.day}</Link>
                    </li>
                ))}
            </ul> 
        </>   
    )
}
