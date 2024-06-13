import PageLayout from '../../components/_pageLayout'
import Table from 'react-bootstrap/Table';

export default function Charts() {

    const Chart = ({children, title}) => {
        return(
            <div className='border border-danger bg-danger-subtle text-danger-emphasis fs-7 mt-3'>
                <h4 className='bg-danger font-english-towne p-2' id={title}>{title}</h4>
                <div className='text-start px-2 m-2'>
                    {children}
                </div>
            </div>
        )
    }

    return(
        <PageLayout pageName='Charts'>
            <Chart title='Action Success Chart' key='action-success-chart'>
                <p>When you take an ACTION (including Melee and Ranged Attacks), roll 2D6 and add any +DICE or -DICE from the character's profile, injuries or other sources, pick the two highest (or lowest if any -DICE were applied) and consult the chart below to see if the ACTION succeeded:</p>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className='w-25'><strong>2-6</strong></td>
                            <td><strong>Failure</strong></td>
                        </tr>
                        <tr>
                            <td className='w-25'><strong>7-11</strong></td>
                            <td><strong>Sucess</strong></td>
                        </tr>
                        <tr>
                            <td className='w-25'><strong>12+</strong></td>
                            <td><strong>Critical success: </strong>Some Ranged and Melee Attacks have additional effects if you roll a Critical Success when determining if they hit.</td>
                        </tr>
                    </tbody>
                </Table>
                <p>If you succeed, you take the ACTION as described in the rules. If you fail, you can still move or take any other ACTIONS the model may have access to. If the ACTION is classed as a RISKY ACTION and you fail, the activation of the model is over and your opponent can now activate one of their models!</p>
            </Chart>
            <Chart title='Injury Chart' key='injury-chart'>
                <p>If your attack hits the enemy, it is time to determine the amount of damage the attack has caused. Roll 2D6 (plus any +/-DICE from the model's profile or other sources), pick the two highest (or lowest if any -DICE were applied) and consult the following table:</p>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className='w-25'><strong>1 (or less)</strong></td>
                            <td><strong>No effect</strong></td>
                        </tr>
                        <tr>
                            <td className='w-25'><strong>2-6</strong></td>
                            <td><strong>Minor Hit</strong></td>
                        </tr>
                        <tr>
                            <td className='w-25'><strong>7-8</strong></td>
                            <td><strong>Down</strong></td>
                        </tr>
                        <tr>
                            <td><strong>9+</strong></td>
                            <td><strong>Out of Action</strong></td>
                        </tr>
                    </tbody>
                </Table>
                <h6><strong>No Effect</strong></h6>
                <p>The armour of the target withstands the hit. There is no effect.</p>
                <h6><strong>Minor Hit</strong></h6>
                <p>Add +1 BLOOD MARKER next to the model to represent a wound. Use the dice pips to count the hits inflicted (maximum six per model).</p>
                <p>Whenever the wounded model takes an ACTION, the opponent can decide to spend one or more of the BLOOD MARKERS to add -1 DICE to the roll for each of them (i.e. roll 3D6 and pick the two lowest results if you use one marker).</p>
                <p>When rolling on the <strong>Injury Chart</strong> against this model, the opponent can spend one or more of the BLOOD MARKERS to add +1 DICE to the roll for each pip to make a severe injury more likely. When you attack a wounded model, you can spend one or more of the markers to add +1 DICE to the attack roll for each marker.</p>
                <h6><strong>Warrior Down!</strong></h6>
                <p>A model that has suffered a Down result is in serious trouble! Add +1 BLOOD MARKER next to the model and place the model face down on the battlefield to indicate its status. If the model is already Down, it still suffers the +1 BLOOD MARKER and remains Down.</p>
                <p>Any injury rolls against a Downed model in Melee are made with an additional +1 DICE or reducing the effectiveness of any armour by 1 (attacker's choice), making it far more likely that a Downed warrior is taken out by any incoming Melee attack.</p>
                <p>A Downed warrior adds -1 DICE to any of its ACTIONS until they stand up, making it far less likely to succeed in them.</p>
                <p>During its next Activation a Downed warrior can stand up, but all types of movement it takes (Move, Dash, Charge, Jump etc.) is at half distance, rounding down. A model that is Down cannot move at all during its Activation.</p>
                <h6><strong>Out of Action</strong></h6>
                <p>The warrior suffers a major wound and is out of the game for the rest of the battle - remove the model. Resolve what has happened to the model after the battle as explained in the Serious Injuries section of the rules.</p>
            </Chart>
        </PageLayout>
    )
}