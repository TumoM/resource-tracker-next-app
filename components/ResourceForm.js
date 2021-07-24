import { useState } from "react"


const DEFAULT_DATA = {
    title: "",
    description: "",
    link: "",
    priority: "2",
    timeToFinish: 60,
    tandc: false
}

const ResourceForm = ({onSubmit, initialData}) => {
    const [form, setForm] = useState(initialData || DEFAULT_DATA);

    const handleFormChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]:value}
            )
    }

    const handleReset = () => {
        setForm(DEFAULT_DATA)
    }

    const submitForm = () => {
        console.log("Calling ResourceForm onSubmit");
        onSubmit(form);
    }

    return(
        <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                    
                        <div className="resource-form mt-5">
                            <h1>Add New Resource</h1>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input 
                                    onChange={handleFormChange} 
                                    name='title' 
                                    value={form.title} className="input" 
                                    type="text" placeholder="Resource Title"

                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea
                                    onChange={handleFormChange} 
                                    name='description' 
                                    value={form.description} 
                                    className="textarea" 
                                    placeholder="Resource Description"></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Link</label>
                                <div className="control">
                                    <input
                                    onChange={handleFormChange} 
                                    name='link' 
                                    value={form.link} 
                                    className="input" 
                                    type="text" 
                                    placeholder="Resource Link(s)"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Priority</label>
                                <div className="control">
                                    <div className="select">
                                    <select 
                                        value={form.priority}
                                        onChange={handleFormChange} 
                                        name='priority'
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Time To Finish</label>
                                <div className="control">
                                    <input
                                    onChange={handleFormChange} 
                                    name='timeToFinish' 
                                    value={form.timeToFinish} 
                                    className="input" 
                                    type="text" placeholder="Resource Estimated Time (Minutes)"/>
                                </div>
                                <p className="help">Time in minutes</p>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="checkbox">
                                    <input  
                                        onChange={handleFormChange} 
                                        name='tandc'
                                        type="checkbox"
                                        value={form.tandc}
                                    />
                                    I agree to the <a href="#">terms and conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button 
                                    type="button"
                                    onClick={submitForm}
                                    className="button is-link">Submit</button>
                                </div>
                                <div className="control">
                                    <button onClick={handleReset} className="button is-link is-light">Cancel</button>
                                </div>
                            </div>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default ResourceForm