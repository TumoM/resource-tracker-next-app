import {useRouter} from "next/router"

import Layout from 'components/Layout'
import ResourceForm from 'components/ResourceForm'



const ResourceCreate = () => {
    const router = useRouter();

    const handleSubmit = async (formData) => {
        // event.preventDefault();
        // debugger
        console.log(formData);
        fetch("http://localhost:3000/api/resources",{
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        .then(data=>{
            console.log("Status:",data.status);
            if (data.status < 200 || data.status >= 300){
                // debugger
                throw new Error(data)
            }
            else{
                console.log("ResData HandleSubmit:",data);
                return router.push("/")
            }
            
        })
        .catch(err=>{
            console.log(err);
            // debugger
            return alert(JSON.stringify(err.message,null,2));
        })
    }
    return (
        <Layout>
        <ResourceForm 
            onSubmit={handleSubmit}
        />
        

            
        </Layout>
    )
}

export default ResourceCreate

