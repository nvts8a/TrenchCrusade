import PageLayout from '../../components/_pageLayout'
import { useEffect, useRef, useState } from 'react'

export default function Core() {
    const Header = ({title}) => {
        const componentRef = useRef();
        const [yBottom, setBottom] = useState();
        const [sticky, setSticky] = useState('')


        const getPosition = (componentRef) => {
            if (componentRef && componentRef.current) setBottom(componentRef.current.getBoundingClientRect().y)
        }

        useEffect(() => {
            getPosition(componentRef)
        }, [componentRef])

        useEffect(() => {
            window.addEventListener('resize', getPosition)
          }, [componentRef])

        // on render, set listener
        useEffect(() => {
            const isSticky = () => {
                const scrollTop = window.scrollY;
                const stickyClass = scrollTop >= yBottom ? 'is-sticky' : ''
                setSticky(stickyClass);
            }

            window.addEventListener('scroll', isSticky)
            return () => window.removeEventListener('scroll', isSticky)
        }, [yBottom])
      
        const style = { height: '35px' }
        const classes = `text-danger font-english-towne header-section d-block bg-dark ${sticky}`
      
        return (
          <>
            <div style={style}>
                <h4 id={title} className={classes} ref={componentRef}>{title}</h4>
            </div>
          </>
        )
      }


    const Section = ({children, title}) => {
        return(
            <div className='row rules-section fs-7'>
                <Header title={title} />
                <div className='text-start'>
                    {children}
                </div>
            </div>
        )
    }

    const Concept = ({children, title, sidebar=false}) => {
        return(
            <div className={ sidebar ? 'text-danger text-start fs-7' : '' }>
                <h6 id={title}><strong>{title}</strong></h6>
                {children}
            </div>
        )
    }

    const Action = ({children, title}) => {
        return(
            <p className='px-3'>
                <span>⛨ <strong>{title}: </strong></span>
                {children}
            </p>
        )
    }

    return(
        <PageLayout pageName='Rules'>
            <hr/>
            <Section title='What You Need To Play'>
                <Concept title='Miniatures'>
                    <p>Each player leads a Warband, which typically consists of 10-30 models. While there is no ironclad rule on the scale of models, the heroic 32mm scale is what we use in our games. If you prefer another scale, do not worry - Witchburners will not be dispatched to cleanse you for your lack of scale purity!</p>
                </Concept>
                <Concept title='Tabletop'>
                    <p>You'll also need a gaming surface to play on. We suggest two surface sizes for games: 48” x 48” or 36” x 36”. This allows the game to be played on a typical kitchen table.</p>
                </Concept>
                <Concept title='Scenery'>
                    <p>Scenery is also necessary, and the more of it you have the better! Trench Crusade is a game of position and tactics, so different types of elevation, cover and varied terrain will all enhance your gaming experience.</p>
                </Concept>
                <Concept title='Measuring Tool'>
                    <p>To measure distances, you will need a tape measure or a measuring stick. Trench Crusade uses the Imperial measurement system which means movement is measured in inches.</p>
                </Concept>
                <Concept title='Dice'>
                    <p>Next, you'll require dice. Each player should have a set of 8 six-sided dice (D6), making a total of 16 in play. Ensure both players select dice sets with distinct colours.</p>
                </Concept>
                <Concept title='Blood Marker Dice'>
                    <p>Finally, you need to set aside a few dice of red colour to represent BLOOD MARKERS (explained in the rules below).</p>
                </Concept>
            </Section>
            <Section title='Turn & Activations'>
                <p>Players Activate their models in alternating order. A single Turn consists of both players Activating all their models once.</p>
                <p>For example, the first player will choose a model to Activate, take any ACTIONS available to the model, and then it is time for you to activate one of your models.</p>
                <p>You can then choose any model in your Warband that has not yet been Activated and then Activate that model. This model can now Move, take ACTIONS and use special skills and equipment as you see fit. When your model has finished, your opponent can then Activate one of their models and so on.</p>
                <p>The player with the <strong>lowest</strong> number of models in their force will decide who will start with the first Activation at the beginning of each Turn. If both players have the same number of models, roll a D6 and whoever rolls highest gets to decide.</p>
                <p>When both players have Activated all their models the Turn is over.</p>
                <Concept title='Actions'>
                    <p>Each player leads a Warband, which typically consists of 10-30 models. While there is no ironclad rule on the scale of models, the heroic 32mm scale is what we use in our games. If you prefer another scale, do not worry - Witchburners will not be dispatched to cleanse you for your lack of scale purity!</p>
                    <p>Common ACTIONS that all models can take are listed below. Be sure to consult the profile of each warrior in your warband to see what ACTIONS their abilities allow them to perform in addition to these. Some ACTIONS are classed as RISKY ACTIONS and these are noted as such. RISKY ACTIONS require you to roll on the <strong>Action Success Chart</strong> (see below) to see if you succeed. On a success, the model performs the RISKY ACTION successfully. On a failure, the Activation of the model ends immediately before taking the RISKY ACTION!</p>
                    <Action title='Move'>
                        <span>The model may move its full Movement Speed. Normal Movement requires no roll on the <strong>Action Success Chart</strong>. You cannot Move if you Charge (see below).</span>
                    </Action>
                    <Action title='Charge'>
                        <span>A player can choose to Charge instead of moving during its Activation. Choose a specific enemy model within your model’s line of sight and declare it to be the target. A distance check should be made to see if the target is within 12” inches of your attacking model. If they are within 12”, roll a D6 and add the result to your model’s movement speed. Use this modified movement value to move towards the target by the most direct route. If you get within 1”, the model is now in Melee Combat with the target. You may charge more than one model if you can get within 1” of them.</span>
                        <p>If you don’t reach the target, simply move your model by the amount indicated by the dice roll plus the Movement rate of the model. Charging requires no roll on the Action Success Chart. The maximum charge distance is always 12”, even if the charge move would allow you to travel further. Remember, you cannot get closer than 1” to any enemy model without charging them, so any enemy models between you and your target by the most direct route would negate a charge.</p>
                        <p>If the Charge fails, you may not use any ranged weapons afterwards during this Activation. You can charge an enemy if you cannot see them, but this requires you to succeed in a RISKY ACTION first</p>
                    </Action>
                    <Action title='Dash'>
                        <span>All models, unless otherwise noted, can move a second time up to their full Movement speed if they succeed in a RISKY ACTION. All normal rules for movement apply. This can be done in addition to a normal Move or Charging, at any point of the Activation.</span>
                    </Action>
                    <Action title='Climbing Up'>
                        <span>Models can move normally up ladders, ramps, ropes and other such climbing apparatus, as well as over walls/obstacles lower than their base size using their Movement as standard. Models may also climb up sheer surfaces without hand footholds such as walls that are higher than their base size, but their movement must be sufficient to clear the entire height they are climbing. You must succeed in a RISKY ACTION to climb. If you fail, leave the model at the bottom of the area where it attempted to climb.</span>
                    </Action>
                    <Action title='Jumping over gaps'>
                        <span>A model can jump across gaps of up to half of their Movement characteristic. This is a RISKY ACTION and you roll on the <strong>Action Success Chart</strong> as normal. If you fail, you Fall (see below).</span>
                    </Action>
                    <Action title='Jumping down'>
                        <span>You may jump down from heights of up to 3” voluntarily, with no ill effect or reduction to your Movement. If you do this as part of your charge move, you must succeed in a RISKY ACTION. If you succeed, you gain +1 BONUS DICE to your hit rolls. If you fail, place the model as close to the edge it jumped from as possible, but 1” away from the enemy. The model did not make the charge in this case.</span>
                    </Action>
                    <Action title='Retreat from combat'>
                        <span>A model may move away from Melee combat during their normal Move. However, every enemy that is in Melee combat with the retreating model may immediately use one of their Melee ACTIONS against the retreating model. Resolve the effects of this attack before moving the retreating model.</span>
                    </Action>
                    <Action title='Attack with a Ranged Weapon'>
                        <span>If the model has a ranged weapon and it is not engaged in Melee combat, it may attack with the weapon as detailed in its profile in the rules. Note that you cannot make a Ranged Attack and Charge afterwards, unless the Ranged Weapon has the ASSAULT Keyword.</span>
                    </Action>
                    <Action title='Attack with a Melee Weapon'>
                        <span>If the model is engaged in Melee combat, it may attack as detailed in the Melee Weapon's entry in the rules.</span>
                    </Action>
                    <Action title='Any other ACTIONS'>
                        <span>Many models have other possible ACTIONS they can take during their Activations. Refer to the Warband Lists for details.</span>
                    </Action>
                </Concept>
                <Concept title='Risky Actions'>
                    <p>If you fail a RISKY ACTION, this always ends the activation of the model and your opponent can now activate one of their models!</p>
                </Concept>
            </Section>
            <Section title='+Dice and -Dice'>
                <p>Rules often have modifiers to dice rolls marked as +DICE and -DICE (for example, shooting from elevated positions adds +1 DICE to ranged attacks against enemies below). These are shown in a format of +1 DICE and -1 DICE. Many models have them on their profile for Melee and Ranged attacks, and things like range, cover and so on can apply them to the dice rolls you make on the Action Success Chart or Injury Chart. For each +DICE, add one dice to the dice pool of the 2D6 roll you are about to make. Thus +1 DICE makes the roll a total of 3D6. Then roll all the dice and pick the two highest numbers. If two +DICE are added, roll 4D6 and pick the two highest and so on.</p>
                <p>The -DICE works in reverse. For each -1 DICE, add one dice to the dice pool of the 2D6 roll you are about to make. Thus -1 DICE makes the roll a total of 3D6. Then roll all the dice and pick the two lowest numbers. If -2 DICE are added, roll 4D6 and pick the two lowest and so on.</p>
                <p>Before rolling dice, add any +DICE and -DICE to the dice pool. If the pool contains both +DICE and -DICE, remove pairs of opposite dice until only one type is remaining.</p>
            </Section>
            <Section title='Blood Markers'>
                <p>During a battle your warriors can be wounded due to enemy attacks, the use of supernatural powers, falling from great heights and so on - see the <strong>Injury Chart</strong> for details. This damage is tracked via BLOOD MARKERS. In addition to wounds, they represent exhaustion, concussion, shellshock, physical and mental strain and so on.</p>
                <p>Each time one of your models suffers such damage, place a BLOOD MARKER (red dice) next to the model to track this damage. Use the pip number on each dice to indicate the number of BLOOD MARKERS the model has. Every time this model takes an ACTION (shooting, melee attacks and so on), your opponent can declare that they are spending one or more BLOOD MARKERS it has to add -1 DICE to the dice pool when the roll on the <strong>Action Success Chart</strong> is made. Multiple markers can be applied to any single roll if the target model has multiple BLOOD MARKERS to be converted.</p>
                <p>The BLOOD MARKERS can also be used by your opponent when the model suffers damage. Each marker can be converted into +1 DICE on the <strong>Injury Chart</strong> roll, making a serious injury far more likely, and just like with ACTIONS, multiple markers can be used to influence a single roll on the <strong>Injury Chart</strong>.</p>
                <p>Lastly, BLOOD MARKERS can also be used by your opponent to reduce the effectiveness of the armour the model may be wearing. Before rolling to injure a model that is Down, one BLOOD MARKER can be spent to reduce the effectiveness of any armour by one point (so Heavy Armour would reduce the injury roll by -1 instead of -2 for example), making a serious injury far more likely. Only a single marker can be used in this way by one model per Activation.</p>
            </Section>
            <Section title='Blessing Markers'>
                <p>BLESSING MARKERS are similar to BLOOD MARKERS. Supernatural powers, holy relics and many other sources may grant these to a model, which can then be expended to aid the ACTIONS of the model.</p>
                <p>Every time the model takes an ACTION (shooting, dashing, melee attacks and so on), you can declare that they are spending one or more of any BLESSING MARKERS the model has. You can add +1 DICE to the dice pool when any roll on the <strong>Action Success Chart</strong> is made. Multiple BLESSING MARKERS can be applied to any single roll if the target model has more than one BLESSING MARKER.</p>
            </Section>
            <Section title='Movement'>
                <p>All models in the game can Move when Activated unless otherwise indicated in the rules. Each model can move up to the number of inches indicated in their profile when Activated, though they can move less and not at all if you wish.</p>
                <ul>
                    <li>You cannot move within 1” of opposing models unless you charge them (see Charging).</li>
                    <li>You can move through friendly models as long as your movement allows you to move past them completely.</li>
                    <li>You can never move off the battlefield unless rules specifically state so.</li>
                </ul>
                <p>Movement (including charging) is usually the only action a model can take that does not require you to roll 2D6 to determine whether you are successful or not, unless otherwise noted in the rules.</p>
                <Concept title='Terrain'>
                    <p>There are four types of terrain in Trench Crusade: <strong>Open</strong>, <strong>Difficult</strong>, <strong>Dangerous</strong> and <strong>Impassable</strong>. Most terrain is considered Open (including going up the side of trenches and crossing obstacles up to the base height of the moving model) and the models may move freely through it without penalty. Difficult terrain (such as rock beds, swamps, barbed wire etc.) costs 2” of movement for every 1” the character moves through it. Models may not travel through Impassable terrain.</p>
                </Concept>
                <Concept title='Dangerous Terrain'>
                    <p>Dangerous terrain includes barbed wire, minefields, raging fires, areas covered in poisonous gas and so on. Whenever a model moves into or starts its Activation in Dangerous Terrain, it must take a RISKY ACTION or it sustains an injury. Roll on the <strong>Injury Chart</strong> as standard. Some terrain is both Difficult and Dangerous, such as barbed wire on a minefield.</p>
                </Concept>
                <Concept title='Falling From Height'>
                    <p>If a model in an elevated position, within 1” of any ledge (for example on a rooftop), goes Down due to any reason (such as an enemy action) it must immediately make a roll on the <strong>Action Success Chart</strong>. On a successful roll, the model goes Down where it stood. On a failure, the model falls from the elevated position and lands on the ground directly below the point it was standing before. When a model falls it must roll on the <strong>Injury Chart</strong> if the height was more than 2”. For each full 3” you fall add +1 DICE to the injury roll.</p>
                    <p>A model will also fall if they fail when taking a Jump RISKY ACTION and suffer damage as explained above.</p>
                    <p><strong>Flying models</strong> ignore penalties for difficult terrain, can cross/land on dangerous terrain safely and can move vertically without the need to take Climbing tests.</p>
                </Concept>
            </Section>
            <Section title='Combat'>
                <p>Combat is divided into <strong>Ranged</strong> and <strong>Melee</strong> Combat. A model may fight in Melee Combat or with any ranged weapons it has.</p>
                <Concept title='Ranged Attacks'>
                    <p>To shoot at an enemy, a model must have a ranged weapon and be able to see the target. If the model has multiple ranged weapons, you can shoot one of them per Activation. The only way to check what your model can see is to stoop over the tabletop for a model's eye view for actual line of sight.</p>
                    <p>Models in Melee combat cannot shoot unless the rules of the weapon indicate otherwise. Some indirect fire weapons have rules that allow you to target models even out of sight - these are clearly explained in the profile for such weapons. Models can see all around themselves (i.e. 360°) and they may be turned freely to face any direction before firing.</p>
                    <p>When making a ranged attacks follow these steps:</p>
                    <ol>
                        <li>Choose one Ranged Weapon ACTION, declare a target and check line of sight.</li>
                        <li>Check if the target is in range of the weapon.</li>
                        <li>Roll on the Action Success Chart as standard.</li>
                        <li>If you hit the enemy, roll on the <strong>Injury Chart</strong>.</li>
                        <li>If the weapon can shoot multiple times per Activation, resolve the shots one at a time.</li>
                    </ol>
                </Concept>
                <Concept title='Modifiers'>
                </Concept>
                <Concept title='Melee Combat'>
                    <p><img className='lh-1 float-end' style={{ width: '50%', maxWidth: '150px' }} src='/img/core/combat.png' alt='Trench Crusade Combat' />An activated model can use any of its Melee ACTIONS if it is in contact (i.e. within 1”) with one or more enemies. Select any melee weapon or attack action available to the model - these are clearly indicated in the characteristics of each weapon entry.</p>
                    <ol>
                        <li>Declare which melee action you are taking and what opposing model you are targeting.</li>
                        <li>Roll on the <strong>Action Success Chart</strong> using any melee attacks available to the model. Add any +/- DICE from any source such as BLOOD MARKERS, profile of the warrior making the attack etc.</li>
                        <li>If the result is successful, roll on the <strong>Injury Chart</strong> to determine what happens to the target (unless some Equipment or Special Ability of the model indicates otherwise).</li>
                    </ol>
                    <p>Generally, each model can only attack once in melee, but some can execute multiple attacks due to their natural abilities or special weapons.</p>
                </Concept>
            </Section>
            <Section title='End of Activation'>
                <p>Once you have moved the model and taken all ACTIONS you wish, or have failed with any of your RISKY ACTIONS, the Activation of the model ends and your opponent can now Activate one of their models. Keep Activating models as long as either player has any inactivated models left.</p>
                <p>Once you and your opponent have Activated all of your models once, go to the Morale Phase.</p>
            </Section>
            <Section title='Morale'>
                <p>Your warband may abandon the battle if it suffers too many casualties. At the end of any Turn, when at least half of your warband is Down or Out of Action, roll on the <strong>Action Success Chart.</strong></p>
                <p><img className='lh-1 float-end' style={{ width: '50%', maxWidth: '125px' }} src='/img/core/morale.png' alt='Trench Crusade Morale' />If you fail, your warband flees the battlefield and loses the battle immediately. If both warbands are required to take this test, the smaller warband tests first.</p>
                <Action title='Optional Rule'>
                    <span>A warband that loses a morale check can decide, instead of fleeing, that their warband is Shaken instead. For the following turn, a shaken warband may not use Charge ACTIONS with any model.</span>
                </Action>
                <p>After one turn, the warband recovers to its normal state and is no longer considered Shaken. If it fails a Morale test again (shaken or not), it flees as standard.</p>
            </Section>
            <Section title='End of Turn'>
                <p>Once both players have Activated all the models in their force once, the Turn ends and a new Turn begins. The player with the lowest number of models in their force starts the new Turn and selects a model to activate.</p>
            </Section>
            <hr/>
            <Section title='Sidebars'>
                <Concept title='Pre-measuring' sidebar>
                    <p>Unless the rules specifically tell you otherwise, you are allowed to measure distances to see if you are in range for shooting, charging and so on.</p>
                </Concept>
                <Concept title='Denied Rule' sidebar>
                    <p>A situation may occur where different rules and abilities conflict with each other creating a rules impasse. A rule might require a model to do something, while another rule says it cannot do this. In these situations the prohibition takes precedence. If a model cannot do something, this overrides any rule that says it must do another action.</p>
                </Concept>
                <Concept title='Fractions' sidebar>
                    <p>In all cases where the rules refer to fractions, always round up to the nearest whole number. For example, if your warband has 9 models and the rule calls for something to affect half of the entire force, round 4.5 models up to 5.</p>
                </Concept>
                <Concept title='Going Over the Top' sidebar>
                    <p>All trenches are considered to have fire steps and footholds, and therefore climbing out of them requires no RISKY ACTION test.</p>
                </Concept>
                <Concept title='Model Accuracy' sidebar>
                    <p>When it comes to making sure the models in your game match their stated size, actual equipment and weapons and armour, we recommend the following maxim:</p>
                    <p className='text-center'>"Be strict with yourself but lenient with others."</p>
                </Concept>
                <Concept title='Shooting into Melee' sidebar>
                    <p>If you shoot at any models engaged in melee, roll a D6 for each shot to determine which model is hit: on 1-3 you target one of your own models, on 4-6 you hit the enemy model you were aiming for. Roll to hit as normal once the target has been determined.</p>
                </Concept>
            </Section>
        </PageLayout>
    )
}