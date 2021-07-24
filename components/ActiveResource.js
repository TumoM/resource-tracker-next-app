
import axios from "axios"
import Link from "next/link"
import moment from "moment";
import {useState, useEffect} from 'react';


const ActiveResource = () => {
    const [resource, setResource] = useState({})
    const [seconds, setSeconds] = useState();

    useEffect(()=>{
        (async function fetchResource() {
            console.log("Getting Active Resource");
            const axiosRes = await axios.get("/api/activeresource");
            const resource = axiosRes.data;
            const timeToFinish = parseInt(resource.timeToFinish, 10);
            const elapsedTime = moment().diff(moment(resource.activationTime), "seconds");
            const updatedTimeToFinish = (timeToFinish * 60) - elapsedTime;
            if (updatedTimeToFinish >= 0) {
                resource.timeToFinish = updatedTimeToFinish;
                setSeconds(updatedTimeToFinish);
            }

            setResource(resource);
            
        })()
    }, [])

    useEffect(()=>{
        // console.log("Seconds:",seconds);
        const interval = setInterval(()=>{
            setSeconds(seconds-1)
        },1000)

        if (seconds < 0) {
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    },[seconds])

    const completeResource = () => {
        alert("Marking Complete")
        axios.patch("/api/resources", {...resource,status:'complete'})
        .then(_ => location.reload())
        .catch(err => alert(err?.response?.data));
    }

    
    const hasResource = resource && resource.id
    return(
        <div className="active-resource">
            <h1 className="resource-name">
                {hasResource ? resource.title : "No Resource Active"}
            </h1>
            <div classnames="time-wrapper">
            { hasResource &&
            ( seconds > 0 ?
                <h2 className="elapsed-time">
                {seconds}
                </h2> :
                <h2 className="elapsed-time">
                <button 
                    className="button is-success"
                    onClick={completeResource}
                >
                    Click and Done!
                </button>
                </h2>
            )
            }
        </div>
        {
            hasResource ?
            <Link href={"/resources/"+resource.id}>
                <a className="button">
                Go to resource
                </a>
            </Link> :
            <Link href="/">
                <a className="button">
                Go to resources
                </a>
            </Link>
        }
                
        </div>
    )
}

export default ActiveResource