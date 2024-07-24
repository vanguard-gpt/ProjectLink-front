import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/home')
            .then(res => {
                console.log(res);
                res && res.data && setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
         <div className="container">
                <h2>홈 화면</h2>
                {data ? <p>{data}</p> : <p>Loading...</p>}
            </div>
        </>
    )
}