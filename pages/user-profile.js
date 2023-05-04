function UserProfilePage(props){
    return <h1>{props.usename}</h1>
}

export default UserProfilePage

export async function getServerSideProps(context){

    const {params, req, res} = context

    console.log('====================================');
    console.log(params, req, res);
    console.log('====================================');
    return {
        props: {
            usename: 'max'
        }
    }
}