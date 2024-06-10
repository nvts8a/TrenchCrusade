import AddNewEquipment from "./_addNewEquipment";

export default function AssetDetails({
                            warband, updateWarband,
                            equipment,  allFactionEquipment, warbandEquipment, createEquipment, removeEquipment}) {
    return(
        <>
            <div className='row justify-content-center'>
                <div className='col-sm-12 col-md-5 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Pay Chest</span>
                        <input type='number' className='form-control' placeholder='Ducats' aria-label='Ducats' aria-describedby='basic-addon2'
                            id='ducats' value={warband.ducats} onInput={updateWarband}/>
                    </div>
                </div>

                <div className='col-sm-12 col-md-3 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Glory Points</span>
                        <input type='number' className='form-control' placeholder='Glory' aria-label='Glory' aria-describedby='basic-addon2'
                            id='glory' value={warband.glory} onInput={updateWarband}/>
                    </div>
                </div>
            </div>
            <AddNewEquipment 
                warband={warband} warbandEquipment={warbandEquipment}
                equipment={equipment} allFactionEquipment={allFactionEquipment}
                createEquipment={createEquipment} removeEquipment={removeEquipment}/>
        </>
    )
}