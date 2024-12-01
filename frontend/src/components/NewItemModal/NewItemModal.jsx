import { useNavigate } from 'react-router'
import './NewItemModal.css'
import { useState } from 'react';
import { cretaeMovieItem, getMovieItemDetailsFromAPI } from '../../services/AppServices';

export default function NewItemModal(){
    const navigate = useNavigate();

    const closeModal = () => {
        navigate('/user-home');
    }

    const [formFields, setFormFields] = useState({name: '', year: '', movieItem: null, searchError: '', nameError: ''});


    const handleFieldChange = (event) => {
        if(event.target.name == "name"){
            setFormFields({...formFields, name: event.target.value});
        }

        if(event.target.name == "year"){
            setFormFields({...formFields, year: event.target.value});
        }
    }

    const searchForItem = () => {
        if(formFields.name == ''){
            setFormFields({...formFields, nameError: 'Name field is required', searchError: '', movieItem: null})
            return;
        } 

        getMovieItemDetailsFromAPI(formFields.name, formFields.year, window.localStorage.getItem('username'), window.localStorage.getItem('password'))
        .then(res => {
            if(JSON.parse(res.data.response).Response == "True"){
            setFormFields({...formFields, movieItem: JSON.parse(res.data.response), nameError: ''})
            } else {
                setFormFields({...formFields, movieItem: null, searchError: JSON.parse(res.data.response).Error, nameError: ''})
            }
        })
        
    }


    const storeMovieItemRecord = () => {
        cretaeMovieItem(window.localStorage.getItem('userId'), window.localStorage.getItem('username'), window.localStorage.getItem('password'), formFields.movieItem)
        .then((res) => {
            if(res.data.status == 200){
                navigate('/user-home');
            }
        })
    }

    return <div className="modal-container">
        <div className="modal">
            <i className="close-icon fa-solid fa-xmark" onClick={closeModal}></i>

                <div className="modal-control">
                <div className="form-field-group">
                    <input className="form-field-input" type="text" name="name" id="name" autoComplete="off" onChange={handleFieldChange} />
                    <label htmlFor="name" className="form-field-label">name</label>
                    <p className="error-msg">{formFields.nameError}</p>
                </div>
    
                <div className="form-field-group">
                    <input className="form-field-input" type="text" name="year" id="year" autoComplete="off"  onChange={handleFieldChange}/>
                    <label htmlFor="year" className="form-field-label">year</label>
                </div>
    
                <div className="form-button-group">
                    <input className="btn-caption" type="button" value="search" onClick={searchForItem}/>
                </div>
    
                <p className="request-error-msg">{formFields.searchError}</p>
                </div>
    
                {
                formFields.movieItem != null ? 
                <div className="movie-item-container">
                    <img width="125px" height="175px" src={formFields.movieItem.Poster} alt='API Image' />
                    <div className="movie-details">
                        <p>Title: {formFields.movieItem.Title}</p>
                        <p>Year: {formFields.movieItem.Year}</p>
                        <input type="button" value="ADD TO LIBRARY" id="add-btn" onClick={storeMovieItemRecord} />
                    </div>
                </div>
                : null
                }





        </div>
    </div>
}