
import Layout from 'components/Layout';
import ResourceForm from 'components/ResourceForm'
import axios from 'axios'

const ResourceEdit = ({resource}) => {

    const updateResource = (formData) => {
        console.log("Updating Resource");
        console.log(formData);
        console.log("Resource Id",resource.id);
        axios.patch("/api/resources", formData)
        .then(_ => alert("Data has been Updated!"))
        .catch(err => alert(err?.response?.data));
        // fetch("http://localhost:3000/api/resources",{
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "PATCH"
        // })
        // .then(data=>{
        //     console.log("Status:",data.status);
        //     if (data.status < 200 || data.status >= 300){
        //         throw new Error(data)
        //     }
        //     else{
        //         console.log("ResData HandleSubmit:",data);
        //         return router.push("/")
        //     }
            
        // })
        // .catch(err=>{
        //     console.log(err);
        //     return alert(JSON.stringify(err.message,null,2));
        // })
    }
    return(
        <Layout>
            <ResourceForm
                initialData={resource}
                onSubmit={updateResource}
            />
        </Layout>
    )
}

export async function getServerSideProps({params}) {

    const rawData = await fetch(`${process.env.API_URL}resources/${params.id}`);
    try{
        console.log("Getting Resource Data in Edit");
        const data = await rawData.json();
        console.log("Got Resource Data in Edit",data);

        return {
            props:{
                resource:data
            }
        }
    }
    catch(err){
        console.log("Error---",err);
        return {
            props:{
                resource:null
            }
        }
    }
    
}

export default ResourceEdit;