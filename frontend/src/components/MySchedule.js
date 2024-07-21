import {useState, useEffect} from "react";
import Cookies from "js-cookie"
function MySchedule () {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        const token = Cookies.get("ROBOT_TOKENS")
        const response = fetch(`${process.env.REACT_APP_BACKEND_URL}/my-booked-timeslots?token=${token}`);
        
        if (response.final_result.length > 0) {
            const dateList = []
            response.final_result.forEach(element => {
                if (!dateList.includes(element.date)) dateList.push(element.date)
            });
            setDate(dateList);
        }
    })

    return (
        <div>
            <h1>My Schedule</h1>
            {dateList.forEach(date => {
                <div>{date}</div>
            })}
        </div>
    )

}

export default MySchedule;