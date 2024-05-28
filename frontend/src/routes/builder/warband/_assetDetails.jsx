export default function AssetDetails({warband, updateWarband}) {

    return(
        <div className='row'>
            <div className='row'>
                <div className='col'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Pay Chest</span>
                        <input type='number' className='form-control' placeholder='Ducats' aria-label='Ducats' aria-describedby='basic-addon2'
                            id='ducats' value={warband.ducats} onInput={updateWarband}/>
                    </div>
                </div>

                <div className='col'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Glory Points</span>
                        <input type='number' className='form-control' placeholder='Glory' aria-label='Glory' aria-describedby='basic-addon2'
                            id='glory' value={warband.glory} onInput={updateWarband}/>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='input-group mb-3 h-100'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Chronology</span>
                        <textarea type='text' className='form-control' placeholder='Written by a highly unreliable narrator' aria-label='Chronology' aria-describedby='basic-addon2'
                            id='chronology' defaultValue={warband.chronology} onInput={updateWarband}/>
                        
                    </div>
                </div>
                <div key='test' className='col'>
                    <h5 className='font-english-towne'>Armory</h5>
                    <div className=''>Standard Armor</div>
                    <div className=''>Iron Capirote</div>
                    <div className=''>Misericordia</div>
                    <div className=''>Anti-Tank Hammer</div>
                    <div className=''>Martyrdom Pills</div>
                </div>
            </div>
        </div>
    )
}