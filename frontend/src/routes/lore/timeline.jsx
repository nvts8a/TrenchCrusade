import PageLayout from '../../components/_pageLayout'

const timelineItems = {
    "1099": "First Crusade captures Jerusalem. The Knights Templar commit the Act of Ultimate Heresy. The Gate of Hell is opened on Earth and Jerusalem is destroyed in the cataclysm.",
    "1101": "The Year of Three Battles. Heretics, reinforced by the armies of the Third Circle of Hell, conquer most of the Levant.",
    "1102": "The ancient city of Antioch is fortified and becomes the focal point of resistance against the forces of Hell.",
    "1106": "Cobar becomes the First Tyrant of the Sixty-six.",
    "1109": "The Great Sultanate of the Invincible Iron Wall of the Two Horns That Pierce the Sky is formed. In the coming decades it unifies the Islamic factions. The Great Iron Wall of Iskandar re-emerges and is fortified against the Heretics.",
    "1117": "The legendary Seventeen Martyrs travel to the Earthly Domains of Hell to convert the Heretics. Captured, tortured and kept in a perpetual state of agony, they remain trapped within white-hot Brazen Bulls to this day.",
    "1165": "The Old Man in the Mountain and his Hashashins defend the mountain fortress of Alamut. The castle stands to this very day, despite being besieged for hundreds of years.",
    "1215": "The Wars of Triclavianism. The Church is split and fights a fierce internal conflict. Heretic domains extend as the faithful fight against each other. Millions perish by sword and fire.",
    "1306": "The Wars of Triclavianism end.",
    "1346": "Beelzebub unleashes the Black Grail. Tens of millions are infected, becoming metastatic vessels in the worst plague in the history of mankind. The Corpse Wars begin.",
    "1353": "The Corpse Wars end.",
    "1429": "Living Saint Jeanne d'Arc drives the Black Grail from mainland Europe.",
    "1477": "The City of Argos is taken by God and it is no more.",
    "1503": "War Prophet Angelos, guided by St. Elegius, discovers the formula of Orichalcum Steel. Though extremely costly to produce, the metal proves to be effective against all missile weapons and is still used to this day.",
    "1545": "Antioch destroyed utterly by a mysterious infernal weapon.",
    "1573": "Sacred Order of the Dragon halts the heretic advance after the destruction of Byzantium. A million heretics impaled in the hills of Wallachia.",
    "1595": "Walls of New Antioch completed.",
    "1666": "The Year of Six Woes. In a surprise raid, the newly created Heretic fleet captures Gibraltar. The sea fortress becomes the Heretic base of operations against Europe. Forces of Hell gain access to the Atlantic.",
    "1670": "Due to the constant coastal raids by the Heretic Fleet the Crown of England begins the construction of the Fortress of the White Cliffs.",
    "1703": "Against all odds, a small force of Hebrew Knights striking from their secret fortress destroy the Templar stronghold at Acre.",
    "1805": "Heretic fleet under the command of High Captain Ranga defeats the fleet of England in the Battle of the Bloodied Cliffs. Admiral Nelson is slain in combat.",
    "1866": "In the utmost secrecy Heretic scientists, aided by the Demon Marbas, construct the first modern submarines.",
    "1870": "Launched from Gibraltar, the Heretic submarine fleets extract a heavy toll on the merchant navies. Widespread famine ensued.",
    "1872": "Heretic forces storm the city of Rijeka. It is fortified and Heretic conquest is launched against the European mainland.",
    "1894": "The Year of Broken Trinity. The Death Commandos simultaneously assassinate the Supreme Pontiff, the High Prophetess Aelia and the Holy Roman Emperor. The faithful are thrown into turmoil. The Heretic Legions, commanded by Hell's nobles of the Seventh Circle and a huge vanguard of tanks launch a simultaneous lightning offensive in the Levant and Europe.",
    "1899": "Church Space Program commences.",
    "1907": "The construction of the moving fortress of Britannia is completed.",
    "1910": "Battle of Cordoba. A Bloody stalemate. Heretic artillery devastates the ancient city, but the Heretic forces fail to gain access to the heartlands of Hispania.",
    "1914": "The present day. Both sides are preparing for major offensive operations. In the huge swathes of No Man's Land furious skirmishes and raids increase in intensity as the faithful and heretics vie for information, powerful relics and securing strategically important positions."
}

export default function Timeline() {
    const renderItems = () => Object.keys(timelineItems).map((key) => {
        return(
            <div className='accordion-item' key={`timeline-${key}`}>
                <h2 className='accordion-header'>
                    <button className='accordion-button font-english-towne collapsed text-center' type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${key}`} aria-expanded='false' aria-controls={`collapse${key}`}>
                        <h1 className='w-100 text-danger'>{key}</h1>
                    </button>
                </h2>
                <div id={`collapse${key}`} className='accordion-collapse collapse' data-bs-parent='#timeline'>
                    <div className='accordion-body'>
                        {timelineItems[key]}
                    </div>
                </div>
            </div>
        )
    })

    return(
        <PageLayout pageName='A Brief & Incomplete Timeline of the Trench Crusade'>
            <h6 className='font-english-towne'>v1.0 - [biased and likely inaccurate]</h6>
            <div className='row'> 
                <div className='col-4'/>
                <div className='col-4 accordion' id='timeline'>
                    {renderItems()}
                </div>
            </div>
        </PageLayout>
    )
}