import React, { useState} from 'react'
import styles from 'styles/Home.module.css'

import Layout from 'components/Layout'
import ResourceHighlight from 'components/ResourceHighlight'
import Newsletter from 'components/Newsletter'
import ResourceList from 'components/ResourceList'

// Called at build time, and only once
// export async function getStaticProps() {

//   const resData = await fetch("http://localhost:3000/api/resources")
//   const data = await resData.json()

//   return {
//     props: {
//       resources: data,

//     }
//   }
// }

// Called every time the page is visited and executed on the server
// Data is fresh
export async function getServerSideProps() {

  const resData = await fetch("http://localhost:3000/api/resources")
  const data = await resData.json()

  return {
    props: {
      resources: data,

    }
  }
}

const HomePage = ({resources}) => {

  return (
    <Layout>
      <ResourceHighlight
        resources={resources.slice(0,2)}
      />
      <Newsletter />
      <ResourceList 
        resources={resources.slice(2)}
      />
    </Layout>
  )
}

export default HomePage