import React, {useState} from 'react';
import './App.css';
import TextBox from './TextBox';
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import axios from 'axios';


function Horoscope() {
    const [sun, setSun] = useState("");
    const [horoscope, setHoroscope] = useState([]);
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");

    const requestHoroscope = () => {
        const toSend = {
            sun: sun,
            moon: moon,
            rising: rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then((response: any) => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"]);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div className="Horoscope">
            <div>
                <TextBox label={"Sun Sign"} change={setSun}/>
            </div>
            <div>
                <TextBox label={"Moon Sign"} change={setMoon}/>
            </div>
            <div>
                <TextBox label={"Rising Sign"} change={setRising}/>
            </div>
            <AwesomeButton type="primary" onPress={requestHoroscope}>Button</AwesomeButton>
            {horoscope == null ? "" : horoscope.map((trait : string) => <p>{trait}</p>)}
        </div>
    );
}

export default Horoscope;