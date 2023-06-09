import Head from 'next/head'
import Link from "next/link";
import {users} from "@/data";

const abTests = [{
    name: 'ab-first',
}, {
    name: 'ab-second',
}]

export async function getStaticPaths() {
    const slugs = users.map((user) => ({
        params: {id: user.id.toString()},
    }));

    const paths = [...slugs, ...abTests.flatMap(test => {
        return slugs.map(slug => ({params: {id: `${test.name}-${slug.params.id}`}}))
    })]

    return {paths, fallback: false};
}

export async function getStaticProps({params}) {
    // HARDCODE
    const isItAbTest = params.id.split('-')[0] === 'ab';

    if (isItAbTest) {
        const [ab, name, id] = params.id.split('-');
        const user = users[id - 1];

        return {props: {user, abTestName: `${ab}-${name}`}};
    }

    const user = users[params.id - 1];

    return {props: {user}};
}

export default function Id({user, abTestName}) {
    return (
        <>
            <Head>
                <title>User</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>User page</h1>
                <br/>
                {abTestName && <h2>{abTestName}</h2>}
                <br/>
                <div>
                    <div>
                        <p>{user.id}</p>
                        <p>{user.first_name}</p>
                        <p>{user.last_name}</p>
                        <p>{user.email}</p>
                        <p>{user.gender}</p>
                        <p>{user.ip_address}</p>
                    </div>
                </div>
            </main>
        </>
    )
}
