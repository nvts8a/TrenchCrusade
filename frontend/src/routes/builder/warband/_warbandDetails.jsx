import { useDispatch } from "react-redux"
import { updateWarband } from "../../../store/_warbandsActions"

export default function WarbandDetails({warband}) {
    const dispatch = useDispatch()

    return(
        <>
            <div className='row justify-content-center'>
                <div className='col-sm-12 col-md-5 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Warband</span>
                        <input type='text' className='form-control' placeholder='Warband Name' aria-label='Warband Name' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.name} onInput={(event) => dispatch(updateWarband(warband, event))}/>
                    </div>
                </div>
            </div>
        </>
    )
}
