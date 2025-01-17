import useFetch from "../hooks/useFetch.ts"
import { useNavigate } from "react-router-dom";

export default function CreateDay() {
    const days = useFetch("http://localhost:3001/days");
    const history = useNavigate();
    function addDay(){                
        fetch(`http://localhost:3001/days/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json', 
            },
            body : JSON.stringify({
                day : days.length + 1
            }),
        })
        .then (res => {
            if(res.ok) {
                alert("날짜가 생성되었습니다.");
                history(`/`);
            }
        })
    }
    return (        
        <div>
            <h3>현재일수 : {days.length} 일</h3>
            <button onClick={addDay}>Day 추가</button>

        </div>
    );

}