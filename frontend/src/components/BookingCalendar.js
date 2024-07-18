import {useState, useEffect} from "react";
import Calendar from "react-calendar";
import "./BookingCalendar.css";
import Cookies from "js-cookie";

const default_robotList = ["robot_1", "robot_2", "robot_3", "robot_4", "robot_5", "robot_6"]
const default_timeList = {"9:00 AM": default_robotList, 
                            "11:00 AM": default_robotList, 
                            "1:00 PM" : default_robotList, 
                            "3:00 PM" : default_robotList, 
                            "5:00 PM" : default_robotList, 
                            "7:00 PM" : default_robotList};

const filterTimeList = (dict, filterDict) => {
    const filteredDict = {};

    for (const key in dict) {
        if (filterDict[key]){
            filteredDict[key] = dict[key].filter(value => !filterDict[key].includes(value));

        } else {
            filteredDict[key] = dict[key];
        }
    }
    return filteredDict;
}

function BookingCalendar () {
    const [date, setDate] = useState(null);
    const [formatedDate, setFormatedDate] = useState(null);
    const [stringDate, setStringDate] = useState("");
    const [time, setTime] = useState('');
    const [robot, setRobot] = useState('');

    const [timeList, setTimeList] = useState(default_timeList);

    const handleChange = (date) => {
        setDate(date);
        setStringDate(date.toLocaleString("default", {weekday: "long"}) + ", " + date.getDate() + " " + date.toLocaleString("default", {month: "long"}) + " " + date.getFullYear());
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        setFormatedDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    }

    const handleSubmit = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/book-robot`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: Cookies.get("ROBOT_TOKENS"),
                    date: formatedDate, 
                    time: time, 
                    robot: robot
                })
            })

            const data = await response.json();

            if (data.message === "Booking Success"){
                setDate(new Date());
                setTime('');
                setRobot('');
            }
    }

    useEffect(() => {
        if (stringDate){
            const fetchBookedTime = async () => {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/booked-timeslots?date=${stringDate}`);
                const data = await response.json();

                if (response.ok && Object.keys(data).length > 0) {
                    console.log(data);
                    const empty_spots = filterTimeList(timeList, data.result);

                    console.log(empty_spots);
                        
                    setTimeList(empty_spots);
                }
            }
            fetchBookedTime();

        }
    })

    return (
        <div className="booking-calendar-container">
            <div className="left-frame">
                <h1>Booking appointment</h1>
                <div className="booking-calendar">
                    <Calendar onChange={handleChange} value={date} />

                </div>

                {date && time && robot && 
                
                <div className="confirm-booking">
                    <p>You want to book {robot} on {stringDate} at {time}</p>
                    <button onClick={handleSubmit}>
                        Confirm
                    </button>
                </div>

                }
            </div>
            {date && 
                <div className="right-frame">
                    <h1>{stringDate}</h1>
                    <div className="time-option-container">
                        <div className="time-left">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>TIME</th>
                                    </tr>
                                    {Object.keys(timeList).map((chosenTime) => 
                                        <tr key={chosenTime}>
                                            <td><button className={`${time === chosenTime && 'selected'}`} onClick={() => setTime(chosenTime)}>{chosenTime}</button></td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    
                        {time &&                    
                            <div className='option-right'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>ROBOT OPTIONS</th>
                                        </tr>
                                        {timeList[time].map((robotId) => 
                                            <tr key={robotId}>
                                                <td><button className={`${robot === robotId && 'selected'}`} onClick={() => setRobot(robotId)}><img src={`/pictures/${robotId}.jpg`} alt={`${robotId}`}/>{robotId}</button></td>
                                            </tr>
                                        )}
                                        
                                        
                                    </tbody>
                                </table>
                            </div> 
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default BookingCalendar;