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

    const fetchMyBookedTime = async () => {
        try {
            const token = Cookies.get("ROBOT_TOKENS")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-booked-timeslots?token=${token}`);
            const data = await response.json();

            console.log(data);

            if (data.final_result.length > 0) {

                const sortedTimeSchedule = data.final_result
                .filter((element) => {
                    return new Date(`${element.date} ${element.time}`) >= new Date();
                })
                .sort((spot1, spot2) => {
                    return new Date(`${spot1.date} ${spot1.time}`) - new Date(`${spot2.date} ${spot2.time}`)
                })

                const date = [];

                sortedTimeSchedule.forEach(element => {
                    if (!date.includes( element.date )) {
                        date.push(element.date)
                    }
                });
                date.sort((a, b) => {
                    return new Date(a) - new Date(b);
                })

                const newDateList = date.filter((day) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return new Date(`${day}T00:00:00`) >= today
                })

                setDateList(newDateList);
                setSchedule(sortedTimeSchedule);
            } else {
                setSchedule([]);
                setDateList([]);
            }
        } catch (error) {
            console.error("Error fetching booked time slots:", error);
        }
    }

    useEffect(() => {

        fetchMyBookedTime();

    }, [])

    const handleCancel = async (date, time, robot_option) => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cancel-booked-time?token=${token}&date=${date}&time=${time}&robot_option=${robot_option}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        if (response.ok && data.message === "delete success") {
            fetchMyBookedTime();
        }
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
                                    <td><button onClick={() => handleCancel(item.date, item.time, item.robot_option)}>Cancel</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                    
                
            )}
        </div>
    )

}

export default MySchedule;