import {useState, useEffect} from "react";
import Cookies from "js-cookie"
import "./MySchedule.css"

const example_schedule = [
    {date: '2024-07-19', time: "9:00 AM", robot_option: "robot_2"},
        {date: '2024-07-21', time: "10:00 AM", robot_option: "robot_1"},
        {date: "2024-07-23", time: "9:00 AM", robot_option: "robot_3"},
        {date: "2024-08-25", time: "9:00 AM", robot_option: "robot_4"},
        {date: "2024-07-10", time: "9:00 AM", robot_option: "robot_1"},
];
const example_date = ['2024-07-19', '2024-07-21', '2024-07-23', "2024-08-25", "2024-07-10"];
function MySchedule () {
    const [schedule, setSchedule] = useState([]);
    const [dateList, setDateList] = useState([]);

    useEffect(() => {

        const fetchMyBookedTime = async () => {
            const token = Cookies.get("ROBOT_TOKENS")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-booked-timeslots?token=${token}`);
            const data = await response.json()
            if (data.final_result.length > 0) {
                const date = []
                data.final_result.forEach(element => {
                    if (!dateList.includes(element.date)) dateList.push(element.date)
                });
                date.sort((a, b) => {
                    return new Date(a) - new Date(b);
                })
                const newDateList = dateList.filter((day) => {
                    return new Date(day) >= new Date()
                })
                const sortedTimeSchedule = data.final_result.filter((spot1, spot2) => {
                    return new Date(`${spot1.date} ${spot1.time}`) - new Date(`${spot2.date} ${spot2.time}`)
                })

                setDateList(newDateList);
                setSchedule(sortedTimeSchedule);
        }
        fetchMyBookedTime();

        }
    }, [])

    const handleCancel = () => {

    }

    return (
        <div className="schedule-container">
            {dateList.map((element) => 
                <div key={element.date}>
                    <h2 className="date">{element}</h2>
                    <table key={element.date} className="timeslots">
                        <tbody>
                            {schedule.filter((item) => item.date === element).map((item) => 
                                <tr key={item.time+item.date+item.robot_option} >
                                    <td className="time">{item.time}</td>
                                    <td>
                                        <img src={`/pictures/${item.robot_option}.jpg`} alt="gcp"/>
                                    </td>
                                    <td><button onClick={handleCancel}>Cancel</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                    
                
            )}
            <div>asdsadsad</div>
        </div>
    )

}

export default MySchedule;