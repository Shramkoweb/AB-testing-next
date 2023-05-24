import Head from 'next/head'
import type {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {AbTestData, TEST_GROUP_COOKIE_NAME} from '../../middleware';
import Layout from '../../components/Layout';
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const activeTests = Object.entries(AbTestData).filter(([testName, test]) => {
        const testGroup = parseInt(context.req.headers["test_group"] as string, 10);


        const inSegmentRange = test.segment.from <= testGroup && test.segment.to >= testGroup;
        const isURLAllowed = test.URLs.length === 0 ? true : test.URLs.includes(context.resolvedUrl);


        return inSegmentRange && isURLAllowed;
    });


    return {props: {activeTests: activeTests}};
};

export default function Blog({activeTests}) {
    // console.log('render')
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Blog 1</h1>
                {activeTests.map(([name]) => {
                    return <p key={name}>{name}</p>
                })}
                <Link href={'/'}>Home</Link>
            </main>
        </>
    )
}

Blog.getLayout = function getLayout(page) {
    const test = page.props.activeTests.length ? page.props.activeTests[0][0] : []

    return (
        <Layout activeTest={test}>
            {page}
        </Layout>
    )
}