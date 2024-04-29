
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Roster() {
    const params = useParams();
    const [troops, setTroops] = useState([]);

    useEffect(() => {
        axios(`http://localhost:3000/warband/${params.id}/troop/all`)
        .then((response) => {
            setTroops(response.data);
        })
        .catch((err) => {
            console.log(err.message);
        });

        axios(`http://localhost:3000/warband/${params.id}/troop/all`)
        .then((response) => {
            setTroops(response.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    const renderTroops = () => {
        return troops.map((troop) => { 
                return(
                    <div id={`troop-${troop.id}`} key={troop.id}>
                        <div>{troop.name}</div>
                        <div>
                            <span>{troop.troopType.name}</span>
                            <span>{formatDice(troop.troopType.range)}</span>
                            <span>{formatDice(troop.troopType.melee)}</span>
                            <span>{troop.troopType.name}</span>
                        </div>
                    </div>
                );
            }
        )
    }

    const formatDice = (count) => {
        return `${count < 0 ? count : `+${count}`} Dice`;
    }

    return(
        <div className='roster container text-center'>
            <div className='header'>+ Warband Roster Sheet +</div>
            <div className='row'>
                <div className='section-header'>Warband Name</div>
                <div>ROSTER {params.id}</div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='section-header'>Faction</div>
                    <div>Trench Pilgrams</div>
                </div>
                <div className='col'>
                    <div className='section-header'>Variant</div>
                    <div>Procession of the Sacred Affliction</div>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='section-header'>Pay Chest</div>
                    <div>700</div>
                </div>
                <div className='col'>
                    <div className='section-header'>Insignia</div>
                    <div>Trench Pilgrams</div>
                </div>
                <div className='col'>
                    <div className='section-header'>Glory Points</div>
                    <div>0</div>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='section-header'>Warband Chronology</div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className='col'>
                    <div className='section-header'>Armory</div>
                    <div className=''>Stnadard Armor</div>
                    <div className=''>Iron Capirote</div>
                    <div className=''>Misericordia</div>
                    <div className=''>Anti-Tank Hammer</div>
                    <div className=''>Martyrdom Pills</div>
                </div>
            </div>
            
            {renderTroops()}
        </div>
    )
}