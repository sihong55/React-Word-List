import { useEffect, useState } from "react";
//Custom hook.
export default function useFetch(url:string) {
    const [data, setData] = useState([]);
    //console.log(wordList);
    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
            })
    }, [url]);
    //의존성 배열 : 이 배열에 명시된 값이 변경될 때만 useEffect가 다시 실행됩니다.
    return data;
}