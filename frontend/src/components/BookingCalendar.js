import {useState, useEffect} from "react";
import Calendar from "react-calendar";
import "./BookingCalendar.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const default_robotList = ["robot_1", "robot_2", "robot_3", "robot_4", "robot_5", "robot_6"];
const timeList = ["9:00 AM","11:00 AM", "1:00 PM","3:00 PM","5:00 PM","7:00 PM"];


function BookingCalendar () {
    const [date, setDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState('none');
    const [stringDate, setStringDate] = useState('');
    const [time, setTime] = useState('');
    const [robot, setRobot] = useState('');
    const navigate = useNavigate();
    const [robotList, setRobotList] = useState(default_robotList)

    useEffect(() => {
        if (date) {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          setFormatedDate(`${year}-${month}-${day}`);
          setStringDate(date.toLocaleString("default", { weekday: "long" }) + ", " + date.getDate() + " " + date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear());
        }
      }, [date]);

    const handleChangeDate = (date) => {
        setDate(date);
        setTime('');
        setRobot('');
    }

    const handleChangeTime = async (chosen_time) => {
        
        setTime(chosen_time);
        fetchBookedTime(formatedDate, chosen_time);
    }

    const fetchBookedTime = async (chosen_date, chosen_time) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/booked-timeslots?date=${chosen_date}&time=${chosen_time}`);
        const data = await response.json();
        console.log(data);
        
        if (response.ok && data.final_result.length > 0) {
            const empty_spots = [];
            for (let i = 0; i < default_robotList.length; i++) {
                if (!data.final_result.includes(default_robotList[i])){
                    empty_spots.push(default_robotList[i]);
                }
            }

            console.log(empty_spots);
                
            setRobotList(empty_spots);
        } else {
            setRobotList(default_robotList);
        }
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
            setDate("");
            setTime('');
            setRobot('');
            navigate('/booking-calendar')
        }
        
        else {
            console.log(data);
        }
    }


    return (
        <div className="booking-calendar-container">
            <div className="left-frame">
                <h1>Booking appointment</h1>
                <div className="booking-calendar">

                    <Calendar onChange={handleChangeDate} value={date} />
                    <div>
                        NOTE: You are only allowed to book 1 robot per time slot.
                    </div>
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
                                    {timeList.map((chosenTime) => 
                                        <tr key={chosenTime}>
                                            <td><button className={`${time === chosenTime && 'selected'}`} onClick={() => handleChangeTime(chosenTime)}>{chosenTime}</button></td>
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
                                        {robotList.map((robotId) => 
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