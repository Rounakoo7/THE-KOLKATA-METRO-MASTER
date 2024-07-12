import React from 'react'
import { useEffect, useState } from 'react';
function Linesandstations(props) {
    const lines = [
        { id: "1", name: "Blue Line" },
        { id: "2", name: "Green Line" },
        { id: "3", name: "Purple Line" },
        { id: "4", name: "Red Line" },
        { id: "5", name: "Pink Line" },
        { id: "6", name: "Orange Line" },
        { id: "7", name: "Interchange" },
    ];
    const stations = [
		{ id: "1", lineId: "1", name: "Shahid Khudiram"},
		{ id: "2", lineId: "1", name: "Gitanjali"},
		{ id: "3", lineId: "1", name: "Kavi Nazrul"},
		{ id: "4", lineId: "1", name: "Masterda Surya Sen"},
		{ id: "5", lineId: "1", name: "Netaji"},
		{ id: "6", lineId: "1", name: "Mahanayak Uttam Kumar"},
		{ id: "7", lineId: "1", name: "Rabindra Sarobar"},
		{ id: "8", lineId: "1", name: "Kalighat"},
		{ id: "9", lineId: "1", name: "Jatin Das Park"},
		{ id: "10", lineId: "1", name: "Netaji Bhavan"},
	    { id: "11", lineId: "1", name: "Rabindra Sadan"},
		{ id: "12", lineId: "1", name: "Maidan"},
		{ id: "13", lineId: "1", name: "Chandni Chowk"},
		{ id: "14", lineId: "1", name: "Central"},
		{ id: "15", lineId: "1", name: "Mahatma Gandhi Road"},
		{ id: "16", lineId: "1", name: "Girish Park"},
		{ id: "17", lineId: "1", name: "Shobhabazar Sutanuti"},
		{ id: "18", lineId: "1", name: "Shyambazar"},
		{ id: "19", lineId: "1", name: "Belgachhia"},
		{ id: "20", lineId: "1", name: "Dum Dum"},
		{ id: "21", lineId: "1", name: "Dakshineswar"},
        { id: "22", lineId: "2", name: "Howrah Maidan"},
		{ id: "23", lineId: "2", name: "Howrah"},
		{ id: "24", lineId: "2", name: "MahaKaran"},
		{ id: "25", lineId: "2", name: "Sealdah"},
		{ id: "26", lineId: "2", name: "Phoolbagan"},
		{ id: "27", lineId: "2", name: "Salt Lake Stadium"},
		{ id: "28", lineId: "2", name: "Bengal Chemical"},
		{ id: "29", lineId: "2", name: "City Center"},
		{ id: "30", lineId: "2", name: "Cenrtral Park"},
		{ id: "31", lineId: "2", name: "Karunamoyee"},
		{ id: "32", lineId: "2", name: "Keshtopur"},
		{ id: "33", lineId: "2", name: "Dum Dum Park"},
		{ id: "34", lineId: "2", name: "Baguiati"},
		{ id: "35", lineId: "2", name: "Raghunathpur"},
	    { id: "36", lineId: "3", name: "Victoria"},
        { id: "37", lineId: "3", name: "Kidderpore"},
        { id: "38", lineId: "3", name: "Mominpore"},
        { id: "39", lineId: "3", name: "Majerhat"},
        { id: "40", lineId: "3", name: "Taratala"},
        { id: "41", lineId: "3", name: "Behala Bazar"},
        { id: "42", lineId: "3", name: "Behala Chowrasta"},
        { id: "43", lineId: "3", name: "Sakherbazar"},
        { id: "44", lineId: "3", name: "Thakurpur"},
        { id: "45", lineId: "3", name: "Joka"},
        { id: "46", lineId: "3", name: "IIM"},
        { id: "47", lineId: "3", name: "Diamond Park"},
        { id: "48", lineId: "4", name: "Dum Dum Cant"},
        { id: "49", lineId: "4", name: "Jessore Road"},
        { id: "50", lineId: "4", name: "Birati"},
        { id: "51", lineId: "4", name: "Michael Nagar"},
        { id: "52", lineId: "4", name: "New Barrackpur"},
        { id: "53", lineId: "4", name: "Madhyamgram"},
        { id: "54", lineId: "4", name: "Hridaypur"},
        { id: "55", lineId: "4", name: "Barasat"},	
        { id: "56", lineId: "5", name: "Kamarhati"},
        { id: "57", lineId: "5", name: "Agarpara"},
        { id: "58", lineId: "5", name: "Sodepur"},
        { id: "59", lineId: "5", name: "Panihati"},
        { id: "60", lineId: "5", name: "Subash Nagar"},
        { id: "61", lineId: "5", name: "Khardaha"},
        { id: "62", lineId: "5", name: "Tata Gate"},
        { id: "63", lineId: "5", name: "Titagarh"},
        { id: "64", lineId: "5", name: "Talpukur"},
        { id: "65", lineId: "5", name: "Barrackpore"},    
        { id: "66", lineId: "6", name: "Satyajit Ray"},
		{ id: "67", lineId: "6", name: "Kavi Sukanta"},
		{ id: "68", lineId: "6", name: "Jyotindra Nath Nandi"},
		{ id: "69", lineId: "6", name: "Hemanta Mukhapadhyay"},
		{ id: "70", lineId: "6", name: "Vip Bazar"},
		{ id: "71", lineId: "6", name: "Ritwik Ghatak"},
		{ id: "72", lineId: "6", name: "Barun Sengupta"},
		{ id: "73", lineId: "6", name: "Beliaghata"},
		{ id: "74", lineId: "6", name: "Gour Kishor Ghosh"},
		{ id: "75", lineId: "6", name: "Nicco Park"},
		{ id: "76", lineId: "6", name: "Technopolis"},
		{ id: "77", lineId: "6", name: "Bidhan Nagar"},
		{ id: "78", lineId: "6", name: "Sub Cbd 1"},
		{ id: "79", lineId: "6", name: "Cbd 1"},
		{ id: "80", lineId: "6", name: "Kalakhetra"},
		{ id: "81", lineId: "6", name: "New Town"},
		{ id: "82", lineId: "6", name: "Convention Centre"},
		{ id: "83", lineId: "6", name: "Sub Cbd 2"},
		{ id: "84", lineId: "6", name: "Titumir"},
		{ id: "85", lineId: "6", name: "Rabindra Tirtha"},
		{ id: "86", lineId: "7", name: "Kavi Subhash"},
		{ id: "87", lineId: "7", name: "Park Street"},
		{ id: "88", lineId: "7", name: "Esplanade"},
		{ id: "89", lineId: "7", name: "Noapara"},
		{ id: "90", lineId: "7", name: "Baranagar"},
		{ id: "91", lineId: "7", name: "Salt Lake Sector-V"},
		{ id: "92", lineId: "7", name: "Teghoria"},
        { id: "93", lineId: "7", name: "Biman Bandar"},
    ]
    const [line, setLine] = useState([]);
    const [station, setStation] = useState([]);
    useEffect(() => {
        setLine(lines);
    }, [])
    const handleline = (id) => {
        const dt = stations.filter(x => x.lineId === id);
        setStation(dt);
    }
    return (
        <>
        <div className="row g-3">
            <div className="col-6">
                <select id="lines" class="form-select" aria-label="Default select example" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} onChange={(e) => handleline(e.target.value)}>
                    <option selected style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>Line</option>
                    {
                        line &&
                            line !== undefined ?
                            line.map((st, index) => {
                                return (
                                    <option key={index} value={st.id} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>{st.name}</option>
                                )
                            })
                            : "No line"
                    }
                </select>
            </div>
            <div className="col-6">
                <select id="stations" class="form-select" aria-label="Default select example" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>
                    <option selected style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>Station</option>
                    {
                        station &&
                            station !== undefined ?
                            station.sort((a, b) => (a.name > b.name) ? 1 : -1).map((cnst, index) => {
                                return (
                                    <option key={index} value={cnst.id} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>{cnst.name}</option>
                                )
                            })
                            : "No station"
                    }
                </select>
            </div>
            </div>
        </>
    )
}
export default Linesandstations
