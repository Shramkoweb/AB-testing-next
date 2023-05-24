export default function Layout({children, activeTest}) {
    // console.log(activeTest)
    if (activeTest === 'ab-name-1') {
        return <>
            <nav/>
            <main style={{background: 'red'}}>{children}</main>
            <footer><ul><li><a href="/">home smal</a></li></ul></footer>
        </>
    }

    return (
        <>
            <nav/>
            <main>{children}</main>
        </>
    );
}
