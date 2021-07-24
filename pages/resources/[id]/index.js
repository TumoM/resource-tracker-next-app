
import Layout from 'components/Layout';
import axios from 'axios';
import moment from 'moment';
// import { useRouter } from "next/router"
import Link from 'next/link';
import ResourceLabel from 'components/ResourceLabel';
const ResourceDetail = ({resource}) => {
    // const router = useRouter();

    // if (router.isFallback) {
    //     return <div>Loading Data!</div>
    // }

    const activateResource = () => {
        alert("activating")
        axios.patch("/api/resources", {...resource,status:'active'})
        .then(_ => location.reload())
        .catch(err => alert(err?.response?.data));
    }

    return (
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                <div className="content is-medium">
                                    <h2 className="subtitle is-4">
                                    {moment(resource?.createdAt).format('LLLL')}
                                    <ResourceLabel
                                        status={resource.status}
                                    />
                                    </h2>
                                    <h1 className="title">{resource?.title}</h1>
                                    <p>{resource?.description}</p>
                                    <p>Time to finish: {resource?.timeToFinish} min</p>
                                    <div className="field is-grouped">
                                        { resource.status === "inactive" &&
                                        <>
                                            <p className="control">
                                            <Link href={`/resources/${resource.id}/edit`}>
                                            <a className="button is-warning">
                                                Edit
                                            </a>
                                            </Link>
                                            </p>
                                            <p className="control">
                                            <button 
                                                onClick={activateResource}
                                                className="button is-success"
                                            >
                                            Activate
                                            </button>
                                            </p>
                                        </>
                                        }
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section>                    
                    </div>
                </div>
            </section>
        </Layout>
    )
}

// export async function getStaticPaths() {
//     const rawData = await fetch("http://localhost:3001/api/resources/")
//     try{
//         const data = await rawData.json();
//         const paths = data.map(resource => {
//             return {
//                 params:{
//                     id:resource.id
//                 }
//             }
//         });

//         return {
//             paths,
//             fallback: true
//         }
        
//     }
//     catch(err){
//         console.log("Error---",err);
//         return {
//             props:{
//                 resource:null
//             }
//         }
//     }
// }

// export async function getStaticProps({params}){
//     const rawData = await fetch("http://localhost:3001/api/resources/"+params.id)
//     try{
//         const data = await rawData.json();
//         return {
//             props:{
//                 resource:data
//             }
//         }
//     }
//     catch(err){
//         console.log("Error---",err);
//         return {
//             props:{
//                 resource:null
//             }
//         }
//     }
// }

export async function getServerSideProps({params}) {

    const rawData = await fetch(`${process.env.API_URL}/resources/${params.id}`);
    try{
        const data = await rawData.json();
        console.log("Got Resource Data in Index",data);
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
export default ResourceDetail;